const {Router} = require('express')
const router = Router();

router.use('/', (req,res,next)=>{
  res.send('hi');
})

module.exports = router;