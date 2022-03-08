const {Router} = require('express')
const join = require('./join')
const login = require('./login')
const logout = require('./logout')
const router = Router();

router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);


module.exports = router;