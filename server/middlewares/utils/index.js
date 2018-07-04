const _ = require('lodash');

let utils = {
    groupJoinData: (rows, includeOptions, options) => {
        let store =  {};

        rows.forEach(row => {
           Object.keys(row).forEach(key => {
               let obj = store[row.id] =  store[row.id] || {};
               let keyParts = key.split('.');
               let isSimpleKey = keyParts.length === 1;

               if (isSimpleKey) {
                    return obj[key] = row[key];
               }
               
               let newKey = keyParts[0]
               obj[newKey] = obj[newKey] || [];

              obj[newKey].push({
                  [keyParts[1]]: row[key]
              })
           })
        })

        return Object.values(store);
        /*
         * Assumptions
         * ID is not necessarily the first field
         * All fields for a level is grouped in the same set (i.e. Panel.id, Task.id, Panel.title is not possible)
         * Parent keys will be seen before any include/child keys
         * Previous set won't necessarily be parent set (one parent could have two children, one child would then be previous set for the other)
         */
    
        /*
         * Author (MH) comment: This code is an unreadable mess, but it's performant.
         * groupJoinData is a performance critical function so we prioritize perf over readability.
         */
        if (!rows.length) {
          return [];
        }
    
        // Generic looping
        let i;
        let length;
        let $i;
        let $length;
        // Row specific looping
        let rowsI;
        let row;
        const rowsLength = rows.length;
        // Key specific looping
        let keys;
        let key;
        let keyI;
        let keyLength;
        let prevKey;
        let values;
        let topValues;
        let topExists;
        const checkExisting = options.checkExisting;
        // If we don't have to deduplicate we can pre-allocate the resulting array
        let itemHash;
        let parentHash;
        let topHash;
        const results = checkExisting ? [] : new Array(rowsLength);
        const resultMap = {};
        const includeMap = {};
        // Result variables for the respective functions
        let $keyPrefix;
        let $keyPrefixString;
        let $prevKeyPrefixString; // eslint-disable-line
        let $prevKeyPrefix;
        let $lastKeyPrefix;
        let $current;
        let $parent;
        // Map each key to an include option
        let previousPiece;
        const buildIncludeMap = piece => {
          if ($current.includeMap.hasOwnProperty(piece)) {
            includeMap[key] = $current = $current.includeMap[piece];
            if (previousPiece) {
              previousPiece = previousPiece+'.'+piece;
            } else {
              previousPiece = piece;
            }
            includeMap[previousPiece] = $current;
          }
        };
        // Calculate the string prefix of a key ('User.Results' for 'User.Results.id')
        const keyPrefixStringMemo = {};
        const keyPrefixString = (key, memo) => {
          if (!memo.hasOwnProperty(key)) {
            memo[key] = key.substr(0, key.lastIndexOf('.'));
          }
          return memo[key];
        };
        // Removes the prefix from a key ('id' for 'User.Results.id')
        const removeKeyPrefixMemo = {};
        const removeKeyPrefix = key => {
          if (!removeKeyPrefixMemo.hasOwnProperty(key)) {
            const index = key.lastIndexOf('.');
            removeKeyPrefixMemo[key] = key.substr(index === -1 ? 0 : index + 1);
          }
          return removeKeyPrefixMemo[key];
        };
        // Calculates the array prefix of a key (['User', 'Results'] for 'User.Results.id')
        const keyPrefixMemo = {};
        const keyPrefix = key => {
          // We use a double memo and keyPrefixString so that different keys with the same prefix will receive the same array instead of differnet arrays with equal values
          if (!keyPrefixMemo.hasOwnProperty(key)) {
            const prefixString = keyPrefixString(key, keyPrefixStringMemo);
            if (!keyPrefixMemo.hasOwnProperty(prefixString)) {
              keyPrefixMemo[prefixString] = prefixString ? prefixString.split('.') : [];
            }
            keyPrefixMemo[key] = keyPrefixMemo[prefixString];
          }
          return keyPrefixMemo[key];
        };
        // Calcuate the last item in the array prefix ('Results' for 'User.Results.id')
        const lastKeyPrefixMemo = {};
        const lastKeyPrefix = key => {
          if (!lastKeyPrefixMemo.hasOwnProperty(key)) {
            const prefix = keyPrefix(key);
            const length = prefix.length;
    
            lastKeyPrefixMemo[key] = !length ? '' : prefix[length - 1];
          }
          return lastKeyPrefixMemo[key];
        };
        const getUniqueKeyAttributes = model => {
          let uniqueKeyAttributes = _.chain(model.uniqueKeys);
          uniqueKeyAttributes = uniqueKeyAttributes
            .result(uniqueKeyAttributes.findKey() + '.fields')
            .map(field => _.findKey(model.attributes, chr => chr.field === field))
            .value();
    
          return uniqueKeyAttributes;
        };
        const stringify = obj => obj instanceof Buffer ? obj.toString('hex') : obj;
        let primaryKeyAttributes;
        let uniqueKeyAttributes;
        let prefix;
    
        for (rowsI = 0; rowsI < rowsLength; rowsI++) {
          row = rows[rowsI];
    
          // Keys are the same for all rows, so only need to compute them on the first row
          if (rowsI === 0) {
            keys = Object.keys(row);
            keyLength = keys.length;
          }
    
          if (checkExisting) {
            topExists = false;
    
            // Compute top level hash key (this is usually just the primary key values)
            $length = includeOptions.model.primaryKeyAttributes.length;
            topHash = '';
            if ($length === 1) {
              topHash = stringify(row[includeOptions.model.primaryKeyAttributes[0]]);
            }
            else if ($length > 1) {
              for ($i = 0; $i < $length; $i++) {
                topHash += stringify(row[includeOptions.model.primaryKeyAttributes[$i]]);
              }
            }
            else if (!_.isEmpty(includeOptions.model.uniqueKeys)) {
              uniqueKeyAttributes = getUniqueKeyAttributes(includeOptions.model);
              for ($i = 0; $i < uniqueKeyAttributes.length; $i++) {
                topHash += row[uniqueKeyAttributes[$i]];
              }
            }
          }
    
          topValues = values = {};
          $prevKeyPrefix = undefined;
          for (keyI = 0; keyI < keyLength; keyI++) {
            key = keys[keyI];
    
            // The string prefix isn't actualy needed
            // We use it so keyPrefix for different keys will resolve to the same array if they have the same prefix
            // TODO: Find a better way?
            $keyPrefixString = keyPrefixString(key, keyPrefixStringMemo);
            $keyPrefix = keyPrefix(key);
    
            // On the first row we compute the includeMap
            if (rowsI === 0 && !includeMap.hasOwnProperty(key)) {
              if (!$keyPrefix.length) {
                includeMap[key] = includeMap[''] = includeOptions;
              } else {
                $current = includeOptions;
                previousPiece = undefined;
                $keyPrefix.forEach(buildIncludeMap);
              }
            }
            // End of key set
            if ($prevKeyPrefix !== undefined && $prevKeyPrefix !== $keyPrefix) {
              if (checkExisting) {
                // Compute hash key for this set instance
                // TODO: Optimize
                length = $prevKeyPrefix.length;
                $parent = null;
                parentHash = null;
    
                if (length) {
                  for (i = 0; i < length; i++) {
                    prefix = $parent ? $parent+'.'+$prevKeyPrefix[i] : $prevKeyPrefix[i];
                    primaryKeyAttributes = includeMap[prefix].model.primaryKeyAttributes;
                    $length = primaryKeyAttributes.length;
                    itemHash = prefix;
                    if ($length === 1) {
                      itemHash += stringify(row[prefix+'.'+primaryKeyAttributes[0]]);
                    }
                    else if ($length > 1) {
                      for ($i = 0; $i < $length; $i++) {
                        itemHash += stringify(row[prefix+'.'+primaryKeyAttributes[$i]]);
                      }
                    }
                    else if (!_.isEmpty(includeMap[prefix].model.uniqueKeys)) {
                      uniqueKeyAttributes = getUniqueKeyAttributes(includeMap[prefix].model);
                      for ($i = 0; $i < uniqueKeyAttributes.length; $i++) {
                        itemHash += row[prefix+'.'+uniqueKeyAttributes[$i]];
                      }
                    }
                    if (!parentHash) {
                      parentHash = topHash;
                    }
    
                    itemHash = parentHash + itemHash;
                    $parent = prefix;
                    if (i < length - 1) {
                      parentHash = itemHash;
                    }
                  }
                } else {
                  itemHash = topHash;
                }
    
                if (itemHash === topHash) {
                  if (!resultMap[itemHash]) {
                    resultMap[itemHash] = values;
                  } else {
                    topExists = true;
                  }
                } else {
                  if (!resultMap[itemHash]) {
                    $parent = resultMap[parentHash];
                    $lastKeyPrefix = lastKeyPrefix(prevKey);
    
                    if (includeMap[prevKey].association.isSingleAssociation) {
                      if ($parent) {
                        $parent[$lastKeyPrefix] = resultMap[itemHash] = values;
                      }
                    } else {
                      if (!$parent[$lastKeyPrefix]) {
                        $parent[$lastKeyPrefix] = [];
                      }
                      $parent[$lastKeyPrefix].push(resultMap[itemHash] = values);
                    }
                  }
                }
    
                // Reset values
                values = {};
              } else {
                // If checkExisting is false it's because there's only 1:1 associations in this query
                // However we still need to map onto the appropriate parent
                // For 1:1 we map forward, initializing the value object on the parent to be filled in the next iterations of the loop
                $current = topValues;
                length = $keyPrefix.length;
                if (length) {
                  for (i = 0; i < length; i++) {
                    if (i === length - 1) {
                      values = $current[$keyPrefix[i]] = {};
                    }
                    $current = $current[$keyPrefix[i]] || {};
                  }
                }
              }
            }
    
            // End of iteration, set value and set prev values (for next iteration)
            values[removeKeyPrefix(key)] = row[key];
            prevKey = key;
            $prevKeyPrefix = $keyPrefix;
            $prevKeyPrefixString = $keyPrefixString;
          }
    
          if (checkExisting) {
            length = $prevKeyPrefix.length;
            $parent = null;
            parentHash = null;
    
            if (length) {
              for (i = 0; i < length; i++) {
                prefix = $parent ? $parent+'.'+$prevKeyPrefix[i] : $prevKeyPrefix[i];
                primaryKeyAttributes = includeMap[prefix].model.primaryKeyAttributes;
                $length = primaryKeyAttributes.length;
                itemHash = prefix;
                if ($length === 1) {
                  itemHash += stringify(row[prefix+'.'+primaryKeyAttributes[0]]);
                }
                else if ($length > 0) {
                  for ($i = 0; $i < $length; $i++) {
                    itemHash += stringify(row[prefix+'.'+primaryKeyAttributes[$i]]);
                  }
                }
                else if (!_.isEmpty(includeMap[prefix].model.uniqueKeys)) {
                  uniqueKeyAttributes = getUniqueKeyAttributes(includeMap[prefix].model);
                  for ($i = 0; $i < uniqueKeyAttributes.length; $i++) {
                    itemHash += row[prefix+'.'+uniqueKeyAttributes[$i]];
                  }
                }
                if (!parentHash) {
                  parentHash = topHash;
                }
    
                itemHash = parentHash + itemHash;
                $parent = prefix;
                if (i < length - 1) {
                  parentHash = itemHash;
                }
              }
            } else {
              itemHash = topHash;
            }
    
            if (itemHash === topHash) {
              if (!resultMap[itemHash]) {
                resultMap[itemHash] = values;
              } else {
                topExists = true;
              }
            } else {
              if (!resultMap[itemHash]) {
                $parent = resultMap[parentHash];
                $lastKeyPrefix = lastKeyPrefix(prevKey);
    
                if (includeMap[prevKey].association.isSingleAssociation) {
                  if ($parent) {
                    $parent[$lastKeyPrefix] = resultMap[itemHash] = values;
                  }
                } else {
                  if (!$parent[$lastKeyPrefix]) {
                    $parent[$lastKeyPrefix] = [];
                  }
                  $parent[$lastKeyPrefix].push(resultMap[itemHash] = values);
                }
              }
            }
            if (!topExists) {
              results.push(topValues);
            }
          } else {
            results[rowsI] = topValues;
          }
        }
    
        return results;
      }
}




module.exports = utils;