const express = require("express")
const router = express.Router()
const controller = require("../controllers/professorasController")
const authMiddleware = require("../middlewares/auth")

router.get("/", controller.get)
router.use(authMiddleware); // a partir desta linha, para acessar essas rotas é necessário utilizar o token
router.get("/:id", controller.getById)
router.post("/", controller.post)

module.exports = router
