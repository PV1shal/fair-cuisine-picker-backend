import express from 'express';
import UsersController from './users.controller.js';
import yelpAPI from './yelpAPI.controller.js';
import GroupsController from './groups.controller.js';

const router = express.Router();

router.route('/users').get(UsersController.apiGetAllUsers);
router.route('/users/:id').get(UsersController.apiGetUserById);
router.route('/users/:id').post(UsersController.apiGetUserByIdLogin);
router.route('/users').post(UsersController.apiPostUser);
router.route('/users/:id').put(UsersController.apiUpdateUser);

router.route('/groups').get(GroupsController.apiGetAllGroups);
router.route('/groups').post(GroupsController.apiPostGroup);
router.route('/groups/:id').get(GroupsController.apiGetGroupById);

router.route('/yelpAPI').get(yelpAPI.apiGetYelpAPI);
router.route('/yelpAPI/business/:id').get(yelpAPI.apiGetBusinessAndReviewsById);

export default router;