const database = require('../../DB').connect();


// TODO: Pagination

class Message {
    createMessage (params) {
        let sql = `insert into Messages (message, uuid) values(?, ?); `;
        return database.query(sql, [params.message, params.uuid]).then(([row]) => {
            return {messageId: row.insertId};
        });
    }

    addMessageToUser (params) {
        let sql = `insert into UsersMessages (messageId, userId) values(?, ?)`;
        return database.query(sql, [params.messageId, params.userId]);
    }

    addMessageToConversation (params) {
        let sql = `insert into ConversationsMessages (messageId, conversationId) values(?, ?)`;
        return database.query(sql, [params.messageId, params.conversationId]);
    }

    getMessageById (params) {
        let sql = `
        SELECT
            Messages.id, Messages.createdAt, Messages.message, Messages.status, Messages.updatedAt, Messages.uuid,
            Users.id as 'author.id', Users.firstName as 'author.firstName', Users.lastName as 'author.lastName',
            ConversationsMessages.conversationId
        from Messages 
            inner join UsersMessages on UsersMessages.messageId = Messages.id
            inner join Users on UsersMessages.userId = Users.id
            inner join ConversationsMessages on ConversationsMessages.messageId = Messages.id
        where Messages.id=?`;
        return database.query(sql, [params.messageId]);
    }

    getListMessagesForConversation (params, pagination) {
        let {conversationId, userId} = params;
        let sql = `
        SELECT 
            Messages.id, Messages.createdAt, Messages.message, Messages.status, Messages.updatedAt, Messages.uuid,
            Users.id as 'author.id', Users.firstName as 'author.firstName', Users.lastName as 'author.lastName'
        FROM Conversations
            inner join UsersConversations on Conversations.id = UsersConversations.conversationId and UsersConversations.userId = ?
            inner join ConversationsMessages on Conversations.id = ConversationsMessages.conversationId
            inner join Messages on Messages.id = ConversationsMessages.messageId
            inner join UsersMessages on UsersMessages.messageId = Messages.id
            inner join Users on UsersMessages.userId = Users.id
        where Conversations.id = ? 
        order by Messages.createdAt DESC
        limit 0, 10
        `;

        return database.query(sql, [userId, conversationId]);
    }

}



module.exports = new Message;