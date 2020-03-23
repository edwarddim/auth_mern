const User = require("../controllers/user.controller")
const {authenticate} = require("../config/jwt.config")

module.exports = app => {
    app.post("/api/user", User.register)
    app.post("/api/login", User.login)
    // PLUG IN OUR "AUTHENTICATE" FUNCTION ON ROUTES THAT REQUIRE USERS
    // TO BE LOGGED IN
    app.get("/api/users", authenticate, User.getAll)
    app.get("/api/logout", User.logout)
}