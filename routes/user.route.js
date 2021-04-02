const router = require('express').Router();
const { createUser, getUsers, getToken, removeToken } = require('../controllers/user.controller');
const { authentication, authorization } = require('../middlewares');

//Scopes for Admin user are -> USER.READ, USER.CREATE, USER.UPDATE, USER.DELETE
//Scopes for user are -> MYPROFILE.READ, MYPROFILE.UPDATE, MYPROFILE.DELETE

router.post('/signup', createUser);
router.post('/login', getToken);
router.get('/', authentication, authorization(['USER.READ']), getUsers);
router.post('/logout', authentication, authorization(['MYPROFILE.UPDATE']), removeToken);
router.get('/me', authentication, authorization(['MYPROFILE.READ']), getUsers);
// router.post('/password-change',authorization(['MYPROFILE.UPDATE']), updatePassword);

module.exports = router;