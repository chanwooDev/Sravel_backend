const {Router} = require('express')
const router = Router();
const defaultJs = require('./default');


router.use(defaultJs);

module.exports = router;