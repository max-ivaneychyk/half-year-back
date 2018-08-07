const database = require('../../DB').connect();


// TODO: Pagination

class Conversation {
    getListMyConversations (params, pagination) {
        let {userId} = params;
        let sql = `
        SELECT 
        Conversations.id, 
        u.id as 'users[0].id', u.firstName as 'users[0].firstName',  u.lastName as 'users[0].lastName',
        Online.isOnline as 'users[0].isOnline',
            (
			  SELECT Photos.url 
			  FROM Avatars, Photos 
			  WHERE ownerId=u.id AND Avatars.photoId=Photos.id 
			  ORDER BY Avatars.createdAt DESC 
			  LIMIT 1
			) AS 'users[0].avatarUrl'
			
            from Users
            inner join UsersConversations ON UsersConversations.userId = Users.id AND UsersConversations.userId = ?
            inner join Conversations ON  UsersConversations.conversationId = Conversations.id
            inner join UsersConversations as uc ON uc.conversationId = Conversations.id
            inner join Users as u ON uc.userId = u.id
            inner join Online ON u.id = Online.userId
            limit 10
        `;

        return database.query(sql, [userId])
    }

    getConversationByFriendId (params) {
        let {userId, friendId} = params;
        let sql = `
            SELECT UsersConversations.conversationId as 'id'
              from Users
              inner join UsersConversations ON UsersConversations.userId = Users.id AND UsersConversations.userId = ? 
              inner join UsersConversations as uc ON UsersConversations.conversationId = uc.conversationId AND uc.userId = ? 
              limit 1
        `;

        return database.query(sql, [userId, friendId]).then(([rows]) => {
            if (rows.length) {
                return rows;
            }

            return this.createConversation(params);
        });
    }

    createConversation (params) {
        let sql = `
            INSERT INTO Conversations (createdAt) VALUES (DEFAULT);
        `;

        return database.query(sql, [])
            .then(rows => {
                params.conversationId = rows[0].insertId;
                return this.addUsersToConversation(params)
            })
            .then(() => {
                return [{id: params.conversationId}]
            });
    }

    addUsersToConversation (params) {
        let {userId, friendId, conversationId} = params;
        let sql = `
            INSERT INTO UsersConversations (conversationId, userId) VALUES (?, ?), (?, ?);
        `;

        return database.query(sql, [conversationId, userId, conversationId, friendId]);
    }

    deleteConversation (params) {

    }

    getUsersIdListFromConversation(params) {
        let {conversationId} = params;
        let sql = `
            select userId from UsersConversations where conversationId = ?
        `;
        return database.query(sql, [conversationId]);
    }

    readConversation (params) {
        let {conversationId, userId} = params;
        let sql = `
        update Messages
            inner join UsersMessages
                on Messages.id = UsersMessages.messageId
                and UsersMessages.userId != ?
            inner join ConversationsMessages 
				on Messages.id = ConversationsMessages.messageId 
                and Messages.status = 0
                and  ConversationsMessages.conversationId = ?
            inner join UsersConversations 
				on UsersConversations.userId = ? 
                and UsersConversations.conversationId = ConversationsMessages.conversationId
         set  Messages.status = 1 
         where id > 0
        `;

        return database.query(sql, [userId, conversationId, userId]);
    }

}



module.exports = new Conversation;