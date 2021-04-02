const router = require('express').Router();
const { createScope, updateScope, getScopes } = require('../controllers/scope.controller');
const { authentication, authorization } = require('../middlewares');

//scopes to perform action on scopes are -> SCOPE.CREATE, SCOPE.UPDATE, SCOPE.READ, SCOPE.DELETE

router.post('/', authentication, authorization(['SCOPE.CREATE']), createScope);
router.put('/', authentication, authorization(['SCOPE.UPDATE']), updateScope);
router.get('/', authentication, authorization(['SCOPE.READ']), getScopes);
router.get('/:id', authentication, authorization(['SCOPE.READ']), getScopes);

module.exports = router;