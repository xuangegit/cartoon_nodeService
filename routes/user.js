var express = require('express');
var fs = require('fs')
var router = express.Router();
var multer = require('multer')
var uploadFolder ='public/uploads'
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};
createFolder(uploadFolder)
// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        console.log('req.file',req.file)
        console.log('file',file)
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now()+ file.originalname) ;  
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })
// var upload = multer({dest:'public/uploads'})
var user = require('../controller/user')
router.get('/login',user.getUser)
router.get('/regist',user.addUser);
router.post('/upload',upload.single('file'),user.upload); 
router.get('/getList',user.getList)
router.post('/addList',user.addList)
module.exports = router