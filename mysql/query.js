/*node.js中mysql连接池的使用

如果不想程序在查询数据时卡死或等待过长时间，一般不推荐在node中开启一个连接后全部查询都用这个链接并且不关闭

Node.js mysql连接池模块
*/
var mysql=require("mysql");
var pool = mysql.createPool({
    host: '49.232.159.65',
    user: 'root',
    password: '123456',
    database: 'cartoon',
    port: 3306
});

var query=function(sql,res,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields,res);
            });
        }
    });
};
var queryPromise = (sql)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,connenct)=>{
        if(err)
            reject(err)
        else {
            connenct.query(sql,(error,result,fields)=>{
                if(error) 
                    reject(error)
                else {
                    resolve(result)
                    // connenct.release()
                }    
            })
            // pool.releaseConnection(connenct); //释放连接，或者下面这种方式
            connenct.release() //释放链接
        }   
    })
  })
}  

module.exports={
    queryPromise,
    query,
    pool
};
