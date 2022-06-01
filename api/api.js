const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');


router.get('/users', (req, res) => {
    User.find({})
        .then(user => res.send(user))
});

router.get('/items?category=:categoryId', (req, res) => {
    console.log(req.params.categoryId)
    Item.find({category: Number(req.params.categoryId)})
        .then(item => res.send(item))
});


router.post('/users', (req, res) => {
    User.create(req.body)
        .then((user) => res.send(user))

});
router.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            User.findOne({ _id: req.params.id })
                .then(user => res.send(
                    [
                        user['token'] ? user['token'] : { token: 'Key not found' },
                        user['name'] ? user['name'] : { name: 'Key not found' }
                    ]
                ))
        }
        )
});
router.delete('/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(user => res.send(user))
});
module.exports = router;