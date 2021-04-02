//this file is to setup the initial mongodb db... Scope, Roles and an Admin User
//run this file once to get all scopes and roles created.

(async function () {
    require('dotenv').config();

    const { Scope, Role, User } = require("./models")

    let scopes = [
        {
            "scope": "USER.READ",
            "description": "Allows to read all users"
        },
        {
            "scope": "USER.CREATE",
            "description": "Allows to create users"
        },
        {
            "scope": "USER.UPDATE",
            "description": "Allows to update users data"
        },
        {
            "scope": "USER.DELETE",
            "description": "Allows to delete users"
        },
        {
            "scope": "MYPROFILE.READ",
            "description": "Allows to read own profile"
        },
        {
            "scope": "MYPROFILE.UPDATE",
            "description": "Allows to update own profile"
        },
        {
            "scope": "MYPROFILE.DELETE",
            "description": "Allows to delete own profile"
        },
        {
            "scope": "ROLE.CREATE",
            "description": "Allows to create new role"
        },
        {
            "scope": "ROLE.UPDATE",
            "description": "Allows to update role"
        },
        {
            "scope": "ROLE.READ",
            "description": "Allows to read all role"
        },
        {
            "scope": "ROLE.DELETE",
            "description": "Allows to delete roles"
        },
        {
            "scope": "SCOPE.CREATE",
            "description": "Allows to create new scopes"
        },
        {
            "scope": "SCOPE.READ",
            "description": "Allows to read all scopes"
        },
        {
            "scope": "SCOPE.DELETE",
            "description": "Allows to delete all scopes"
        },
        {
            "scope": "SCOPE.UPDATE",
            "description": "Allows to update scopes"
        }
    ];
    
    let createdScopes = await Scope.insertMany(scopes);

    let defaultAdminRoleScopes = ["USER.READ", "USER.CREATE", "USER.UPDATE", "USER.DELETE", "ROLE.CREATE", "ROLE.UPDATE", "ROLE.READ", "ROLE.DELETE", "SCOPE.CREATE", "SCOPE.READ", "SCOPE.DELETE", "SCOPE.UPDATE"];

    let defaultAdminRoleScopesId = createdScopes.filter(createdScope => defaultAdminRoleScopes.includes(createdScope.scope)).map(item => item._id);

    let defaultBasicUserScopes = ["MYPROFILE.READ", "MYPROFILE.UPDATE", "MYPROFILE.DELETE"]

    let defaultBasicUserScopesId = createdScopes.filter(createdScope => defaultBasicUserScopes.includes(createdScope.scope)).map(item => item._id);

    let createdRoles = await Role.insertMany([{
        role: 'admin',
        scopes: defaultAdminRoleScopesId
    }, {
        role: 'user-basic',
        scopes: defaultBasicUserScopesId
    }]);

    let firstuser = await User.create({
        firstname: "firstname",
        lastname: "lastname",
        email: "test@abc.com",
        password: "qwe12345",
        roles: createdRoles.map(role => role._id)
    })

    let allUsers = await User.find().select('+hashed_password').populate([{ path: 'roles', populate: 'scopes' }, 'scopes']);

    // console.log(JSON.stringify(allUsers))
    console.log(allUsers)

})();