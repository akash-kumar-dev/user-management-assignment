const express = require('express');
const router = express.Router();
const { fetchUsers, getUsers, updateUser } = require('../controllers/userController');

router.post('/fetch', fetchUsers);

router.get('/', getUsers);

router.put('/:uuid', updateUser);

module.exports = router;
