const Router = require ('express').Router;
const userController = require('../controllers/user-controller')
const Item = require("../models/item-model");
const Settings = require("../models/settings-model");
const router = new Router();

router.post('/register', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

router.get("/settings", async (req, res) => {
    await Settings.findOne({}).then((category) => res.send(category));
  }); 
  router.get("/items&category=:categoryId&sort=:sortType", async (req, res) => {
    if (req.params.categoryId == 0)
      await Item.find({})
        .sort(req.params.sortType)
        .orFail(
          () => new Error(`Category with id: ${req.params.categoryId} not found`)
        )
  
        .then((item) => res.send(item))
        .catch((err) =>
          res.status(404).send({
  
            error: err.message,
          })
        );
    else
      await Item.find({
        category: Number(req.params.categoryId),
      })
        .sort(req.params.sortType)
        .orFail(
          () => new Error(`Category with id: ${req.params.categoryId} not found`)
        )
  
        .then((item) => res.send(item))
        .catch((err) =>
          res.status(404).send({
            
            error: err.message,
          })
        );
  });
  
module.exports = router;