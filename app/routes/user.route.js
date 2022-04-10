module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new User Data
    router.post("/", users.create);
    // Retrieve all User Data
    router.get("/", users.findAll);
    // Retrieve a single User Data with id
    router.get("/:id", users.findOne);
    // Retrieve a single User Data with AccountNumber
    router.get("/accountnum/:accountNumber", users.findAccountNum);
    // Retrieve a single User Data with IdentityNumber
    router.get("/identitynum/:identityNumber", users.findIdentityNum);
    // Update a User Data with id
    router.put("/:id", users.update);
    // Delete a User Data with id
    router.delete("/:id", users.delete);
    // Create a new User Data
    router.delete("/", users.deleteAll);
    app.use('/api/users', router);
};