const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy
const userService = require('$/services/user')

passport.serializeUser(function(user, done){
    //console.log('passport session save : ', user.email)
    done(null, user.email)
});

passport.deserializeUser(function(email, done){
    //console.log('passport session getdata : ', email)
    done(null, email); //user라는 객체에 담아 request로 전달한다
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
    }, async (req, email, password, done)=>{
        userDTO = req.body;
        try{
            result = await userService.join(userDTO);
            if(result.result == false) 
                throw result;
            return done(null, {email : userDTO.email});
        }catch(e){
            return done(null, false, {message : e.message});
        }
    }
));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
    }, async (req, email, password, done)=>{
        userDTO = req.body;
        try{
            result = await userService.login(userDTO);
            if(result.result == false) 
                throw result;
            return done(null, {email : userDTO.email});            
        }catch(e){
            return done(null, false, {message : e.message});
        }
    }
));