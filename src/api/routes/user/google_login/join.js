const {Router} = require('express');
const { join } = require('$/services/user');
const router = Router();
const passport = require('passport');
const passportService = require('$/services/passport');
const userService = require('$/services/user');
const flash = require('connect-flash');

router.get('/', (req, res)=>{
    res.send({result : true, email : req.user});
});

router.post('/process', (req,res,next)=>{
    passport.authenticate('google-join', (err,user,info) => {
        if(err) return next(err);
        if (!user) return res.status(401).json({result:false ,message: info.message});

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).json({result: true, email : user});
        });
    })(req, res, next);
});

router.use((err,req,res,next)=>{
    res.status(400).json({result: false, message : err.message})
})




module.exports = router;