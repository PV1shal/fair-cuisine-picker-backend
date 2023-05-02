import GroupsDAO from "../dao/groupsDAO.js";

export default class GroupsController {
    static async apiGetAllGroups(req, res, next) {
        try {
            const response = await GroupsDAO.getAllGroups();
            var { error } = response;
            if (error) {
                res.status(400).json({ error: "Unable to get all Groups" });
            } else {
                res.json({ Groups: response });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async apiPostGroup(req, res, next) {
        try {
            const response = await GroupsDAO.addGroup(req.body.groupDetails);
            console.log(response);
            var { error } = response;
            if (error) {
                console.log(response.error);
                res.status(400).json({ error: "Unable to add Group" });
            } else {
                res.json({
                    status: "Successfully added Group",
                    _id: response.insertedId
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static async apiGetGroupById(req, res, next) {
        try {
            const id = req.params.id || {};
            const response = await GroupsDAO.getGroupsById(id);
            var { error } = response;
            if (error) {
                res.status(400).json({ error: "Unable to get Group" });
            } else {
                res.json({ group: response });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}