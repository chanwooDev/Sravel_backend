const userModel = require('../models/user.js')
const crypto = require('crypto');

const createSalt = () =>
            new Promise((resolve, reject) => {
                crypto.randomBytes(64, (err, buf) => {
                    if (err) reject(err);
                    resolve(buf.toString('base64'));
                });
            });

const createHashedPassword = (plainPassword) =>
new Promise(async (resolve, reject) => {
    const salt = await createSalt();

    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve({ password: key.toString('base64'), salt });
    });
});

const makePasswordHashed = (email, password) =>
    new Promise(async (resolve, reject) => {
        const result = await userModel.findDefaultByEmail(email)
        const salt = result.password_salt;
        crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });

module.exports = {
    
    join: async (userDTO)=>{
        try{
            if (!userDTO.email) throw Error('enter your email');
            if (!userDTO.password) throw Error('enter your password');
            if (!userDTO.nickname) throw Error('enter your nickname');
            if (!userDTO.sex) throw Error('enter your gender');
            if (!userDTO.year) throw Error('enter your year');
            if (!userDTO.month) throw Error('enter your month');
            if (!userDTO.day) throw Error('enter your day');
            if (!userDTO.condition_personal_information) throw Error('enter your condition1');
            if (!userDTO.condition_use) throw Error('enter your condition2');
            if (userDTO.user_type != "default") throw Error('enter your user_type');
            
            
            let result = await userModel.findByEmail(userDTO.email).catch((err)=>{throw err;});
            if(result) throw Error('이미 가입한 계정이 존재합니다.');
            
            hashed = await createHashedPassword(userDTO.password);
            userDTO.password = hashed.password;
            userDTO.password_salt = hashed.salt;
            result = await userModel.insert(userDTO);
            if(!result) throw Error('데이터 베이스 오류입니다. 관리자에게 문의하세요.');
            result = await userModel.insert_default(userDTO);
            if(!result) throw Error('데이터 베이스 오류입니다. 관리자에게 문의하세요.');
            return {result : true, email: userDTO.email};
        }catch(e){
            console.log('userService Join error: ',e)
            return {result : false, message: e.message};
        }
    },
    login : async (userDTO) => {
        try{
            if (!userDTO.email) throw new Error('enter your email')
            if (!userDTO.password) throw new Error('enter your password')
            let result= await userModel.findDefaultByEmail(userDTO.email);
            if(!result) throw new Error('email');
            let rightPassword = result.password;
            console.log(await makePasswordHashed(userDTO.email, userDTO.password));
            console.log(rightPassword);
            if (rightPassword == await makePasswordHashed(userDTO.email, userDTO.password)){
                return {result: true}
            }
            else throw new Error('password');
        }catch(e){
            console.log('userService Login error: ',e)
            return {result : false, message: e.message};
        }     
    },
    googleJoin: async (userDTO)=>{
        try{
            if (!userDTO.email) throw Error('enter your email');
            if (!userDTO.nickname) throw Error('enter your nickname');
            if (!userDTO.sex) throw Error('enter your gender');
            if (!userDTO.year) throw Error('enter your year');
            if (!userDTO.month) throw Error('enter your month');
            if (!userDTO.day) throw Error('enter your day');
            if (!userDTO.condition_personal_information) throw Error('enter your condition1');
            if (!userDTO.condition_use) throw Error('enter your condition2');
            if (userDTO.user_type != "google") throw Error('enter your user_type');
            
            let result = await userModel.findByEmail(userDTO.email).catch((err)=>{throw err;});
            if(result) throw Error('이미 가입한 계정이 존재합니다.');
            
            result = await userModel.insert(userDTO);
            if(!result) throw Error('데이터 베이스 오류입니다. 관리자에게 문의하세요.');
            return {result : true, email: userDTO.email};
        }catch(e){
            console.log('userService Join error: ',e)
            return {result : false, message: e.message};
        }
    },
    googleLogin : async (userDTO) => {
        try{
            if (!userDTO.email) throw new Error('Problem has occurred. Try again.')
            let result= await userModel.findByEmail(userDTO.email);
            if(!result) throw new Error('email');
            return true;
        }catch(e){
            console.log('userService Login error: ',e)
            return {result : false, message: e.message};
        }     
    },
    checkEmail : async (userDTO) => {
      try{
        let email = userDTO.email;
        let result = await userModel.findByEmail(email);
        if (result) return {result: false,message:"중복된 이메일 존재"}
        return {result: true}
      }catch(e){
          console.log('userService error: ',e)
          return {result : false, message: e.message};
      }     
    },
    checkNickname : async (userDTO) => {
      try{
        let nickname = userDTO.nickname;
        let result = await userModel.findByNickname(nickname);
        if (result) return {result: false,message:"중복된 닉네임 존재"}
        return {result: true}
      }catch(e){
        console.log('userService error: ',e)
        return {result : false, message: e.message};
      }     
    }
}