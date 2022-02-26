const mysql = require('mysql2/promise');
const DB_key = require(__dirname+'/../config').DB_key;
let pool;

pool = mysql.createPool(DB_key);

pool.getConnection(function(err, conn){  
    if ( err ) 
        throw err;
    else{
        console.log('Database connected successfully');
        conn.release();
    }
});

module.exports = {
    getPool : ()=>{return pool},

    query : async (sql, set) => {
        const connection = await pool.getConnection(async conn => conn);
        
        try {
            await connection.beginTransaction();
            [result, fields] = await connection.query(sql,set);
            await connection.commit();
            connection.release();
            return result;
        } catch (err){
            await connection.rollback();
            connection.release();
            console.log('mysql : ' , err)
            throw err;
        } 
    },
}