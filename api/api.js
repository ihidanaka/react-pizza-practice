const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');


router.get('/users', async (req, res) => {
    
    await User.find({})
        .then(user => res.send(user))
});
//'/items&category=:categoryId&sort=:sort'
router.get('/items&category=:categoryId', async (req, res) => {
    
        if(req.params.categoryId == 0) await Item.find({}).orFail(
            () => new Error(`Category with id: ${req.params.categoryId} not found`) 
          )
    .then(item => res.send(item)).catch((err) => res.status(404).send({ error: err.message })); else 
    await Item.find({category: Number(req.params.categoryId)}).orFail(
        () => new Error(`Category with id: ${req.params.categoryId} not found`) 
      )
        .then(item => res.send(item)).catch((err) => res.status(404).send({ error: err.message }))
    
});


router.post('/users', async (req, res) => {
    await User.create(req.body)
        .then((user) => res.send(user)).catch((err) => res.status(404).send({ error: err.message }))

});
router.put('/users/:id', async (req, res) => {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(async () => {
            await User.findOne({ _id: req.params.id })
                .then(user => res.send(
                    [
                        user['token'] ? user['token'] : { token: 'Key not found' },
                        user['name'] ? user['name'] : { name: 'Key not found' }
                    ]
                )).catch((err) => res.status(404).send({ error: err.message }))
        }
        )
});
router.delete('/users/:id',async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
        .then(user => res.send(user))
});
module.exports = router;