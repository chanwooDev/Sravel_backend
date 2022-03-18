const {Router} = require('express');
const router = Router();
const passport = require('passport');
const flash = require('connect-flash');
const userModel = require('$/models/user');
const userService = require('$/services/user')

router.get('/', (req, res)=>{
    res.send('hi');
});

router.post('/process', (req,res,next)=>{
    passport.authenticate('google-login', (err,user,info) => {
        if(err) return next(err);
        if (!user) return res.status(200).json({result:false , message: info.message});
        userService.googleLogin(user, function(err) {
            if(err.message == "email"){
                res.status(200).json({result:false, message:"join"});
            }else if (err) { 
                res.status(401);
                return next(err);
            }
        });
        return res.status(200).json({result:true, email: user.email});
    })(req, res, next);
});

router.post('/check', async (req,res,next)=>{
    let user = req.body.user;
    if (!user) return res.status(200).json({result:false ,message: "로그인 되어 있지 않습니다."});
    let result = await userModel.findByEmail(user);
    if(result==false){
        return res.status(200).json({
            result : false,
        })
    }
    return res.status(200).json({
      result:true
      ,email: result.email
      ,nickname: result.nickname});
});

router.use((err,req,res,next)=>{
    res.status(400).json({result: false, message : err.message})
})

module.exports = router;