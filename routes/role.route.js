const router = require('express').Router();
const { createRole, updateRole, getRoles } = require('../controllers/role.controller');
const { authentication, authorization } = require('../middlewares');

//scopes to perform actions on roles are -> ROLE.CREATE, ROLE.UPDATE, ROLE.READ, ROLE.DELETE

router.post('/', authentication, authorization(['ROLE.CREATE']), createRole);
router.put('/', authentication, authorization(['ROLE.UPDATE']), updateRole);
router.get('/', authentication, authorization(['ROLE.READ']), getRoles);
router.get('/:id', authentication, authorization(['ROLE.READ']), getRoles);

module.exports = router;