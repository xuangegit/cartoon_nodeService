var mysql = require('../mysql/query')

var fncallback = function(qerr,vals,fields,res){
    console.log('vals',vals);
    res.json({
        data:vals
    })
}

var getUser = (req,res)=>{
    console.log('req',req.query)
    var queryStr =`select * from user where phone='${req.query.phone}' and password='${req.query.password}'`;
    // mysql.query(queryStr,res,fncallback) //查询数据库user表 ,回调的方式
    mysql.queryPromise(queryStr).then(d=>{ //同步
         console.log('查询的数据',d)
         if(d.length!==0)
            res.json({
                code:1,
                msg: '查询成功',
                data:d[0]
            })
         else {
             res.json({
                 code: 0,
                 msg: '用户名或密码错误',
             })
         }   
    })
    
}
var addUser = (req,res)=>{
    console.log('registParams',req.query)
    var sqlStr = `CREATE TABLE IF NOT EXISTS user(
        id int(11) NOT NULL AUTO_INCREMENT,
        userName varchar(100) DEFAULT NULL,
        phone varchar(100) DEFAULT NULL,
        password varchar(255) DEFAULT NULL,
        PRIMARY KEY (id)
      ) `
    mysql.queryPromise(sqlStr).then(d=>{
        console.log('user表创建成功',d)
        mysql.pool.getConnection(function(err,connenct){
            if(err) 
                throw err
            else {
                connenct.query('INSERT INTO user SET ?',{...req.query},function(error,result){
                    if(error) 
                        throw error
                    else {
                        console.log('数据插入成功',console.log(result))
                        res.json({code: 1,msg: '注册成功'})
                        connenct.release() //释放数据库
                    }    
                })
            }    
        })
    })
    
}
var upload = (req,res)=>{
    console.log('req.file',req.file)
    res.json({
        code:1,
        msg:'图片上传成功',
        data:{
            path:req.file.filename
        }
    })
}
var getList = (req,res)=>{
    console.log('list--Params',req.query)
    mysql.queryPromise('select * from information_schema.TABLES  where TABLE_NAME = "cartoonList" ').then(d=>{
        console.log('列表数据',d)
        res.json({
            code: 1,
            data: d
        })
    })
}
var addList = (req,res)=>{
    // console.log('addParams',req.query)
    console.log('body',req.body)
    mysql.queryPromise(`select * from  cartoonList where name = ${req.body.name}`).then(d=>{
        if(d.length!==0){
            res.json({
                code: 2,
                msg: '名称已存在'
            })
        } else {
            mysql.pool.getConnection(function(err,connenct){
                if(err) 
                    throw err
                else {
                    connenct.query('INSERT INTO cartoonList SET ?',{...req.body},function(error,result){
                        if(error) 
                            throw error
                        else {
                            console.log('动漫数据插入成功',console.log(result))
                            res.json({code: 1,msg: '添加成功'})
                            connenct.release() //释放数据库
                        }    
                    })
                }    
            })
        }
    })
    
}
module.exports = {
    getUser,
    addUser,
    upload,
    getList,
    addList
}