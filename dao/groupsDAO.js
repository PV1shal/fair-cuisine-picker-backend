import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let groups;

export default class GroupsDAO {
    static async injectDB(conn) {
        if (groups) {
            return;
        }
        try {
            groups = await conn.db(process.env.HANGMAN_DB_NAME).collection("groups");
        } catch (e) {
            console.error(`Unable to establish collection handles in groupsDAO: ${e}`);
        }
    }

    static async getAllGroups() {
        try {
            return await groups.find().toArray();
        } catch (error) {
            console.error(`Unable to get groups: ${e}`);
            return { error: e.message };
        }

    }

    static async getGroupsById(id) {
        try {
            return await groups.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error(`Unable to get group: ${e}`);
            return { error: e.message };
        }
    }

    static async addGroup(group) {
        try {
            var groupData = {
                groupName: group.groupName,
                groupDesc: group.groupDesc,
            }
            return await groups.insertOne(groupData);
        } catch (error) {
            console.error(`Unable to add group: ${error}`);
            return { error: error.message };
        }
    }

    static async deleteGroupById(id) {
        try {
            return await groups.deleteOne({ _id: id });
        } catch (error) {
            console.error(`Unable to delete group: ${error}`);
            return { error: error.message };
        }
    }
}