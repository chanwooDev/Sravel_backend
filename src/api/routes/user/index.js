const {Router} = require('express')
const router = Router();
const defaultJs = require('./default');
const googleJs = require('./google_login')

router.use(defaultJs);
router.use('/google',googleJs);

module.exports = router;