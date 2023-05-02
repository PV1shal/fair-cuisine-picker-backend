import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return;
        }
        try {
            users = await conn.db(process.env.HANGMAN_DB_NAME).collection("users");
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async getAllUsers() {
        try {
            return await users.find().toArray();
        } catch (error) {
            console.error(`Unable to get users: ${e}`);
            return { error: e.message };
        }
    }

    static async getUserById(id, password) {
        try {
            return await users.findOne({ _id: id, password: password });
        } catch (error) {
            console.error(`Unable to get user: ${e}`);
            return { error: e.message };
        }
    }

    static async addUser(user) {
        try {
            const userData = {
                username: user.username,
                password: user.password,
            };
            const result = await users.insertOne({ _id: userData.username, password: userData.password });
            return { message: "Added New User successfully", insertedId: result.insertedId };
        } catch (error) {
            console.error(`Unable to add/update user: ${error}`);
            return { error: error.message };
        }
    }
}