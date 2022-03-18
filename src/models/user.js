let db = require('./mysql');

module.exports = {
    findByEmail : async (email) => new Promise( async (resolve, reject) => {
        let sql = "select * from user where email = ?"
        let result = await db.query(sql,[email]);
        if (result.length > 0){
            return resolve(result[0]);
        }
        else if(result.length == 0)
            return resolve(false);
        return reject(new Error('database error.'));
    }),
    findDefaultByEmail : async (email) => new Promise( async (resolve, reject) => {
      let sql = "select * from user_default where email = ?"
      let result = await db.query(sql,[email]);
      if (result.length > 0)
          return resolve(result[0]);
      else if(result.length == 0)
          return resolve(false);
      return reject(new Error('database error.'));
  }),
    findByNickname : async (email) => new Promise( async (resolve, reject) => {
      let sql = "select * from user where nickname = ?"
      let result = await db.query(sql,[email]);
      if (result.length > 0)
          return resolve(result[0]);
      else if(result.length == 0)
          return resolve(false);
      return reject(new Error('database error.'));
  }),
    insert : async(userDTO) => {
        try {
            let sql = "INSERT INTO user SET ?"
            set = {
                email : userDTO.email,
                name : userDTO.name,
                nickname : userDTO.nickname,
                sex : userDTO.sex,
                year : userDTO.year,
                month : userDTO.month,
                day : userDTO.day,
                condition_personal_information : userDTO.condition_personal_information,
                condition_use : userDTO.condition_use,
                condition_marketing : userDTO.condition_marketing,
                user_type : userDTO.user_type
            }
            let result = await db.query(sql,set);
            if (result && result.affectedRows > 0)
                return true;
            else
                throw Error('fail to insert')
        } catch(e){
            console.log(e);
            return false;
        }
    },
    insert_default : async(userDTO) => {
      try {
          let sql = "INSERT INTO user_default SET ?"
          set = {
              email : userDTO.email,
              password : userDTO.password,
              password_salt : userDTO.password_salt,
          }
          let result = await db.query(sql,set);
          if (result && result.affectedRows > 0)
              return true;
          else
              throw Error('fail to insert')
      } catch(e){
          console.log(e);
          return false;
      }
  },

}

