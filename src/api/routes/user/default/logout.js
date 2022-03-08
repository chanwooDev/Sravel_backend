const {Router} = require('express');
const router = Router();


router.get('/', function(req, res){
    req.logout();
    return res.status(200).json({result:true, message : "로그아웃 되었습니다."});
})

router.use((err,req,res,next)=>{
    res.status(400).json({result: false, message : err.message})
})
module.exports = router;