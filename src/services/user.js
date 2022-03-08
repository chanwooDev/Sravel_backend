const userModel = require('../models/user.js')
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