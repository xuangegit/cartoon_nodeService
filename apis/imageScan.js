// var uuidV1 = require('uuid/dist/v1.js');
var greenNodejs = require('./green-nodejs-invoker.js');

const accessKeyId = 'LTAI4GGnbadhfx45yDiPv8zD';
const accessKeySecret = 'vjB1RJS4iMuVgpYJoGpYqj5IkGNEEd';
const greenVersion = '2017-01-12';
var hostname = 'green.cn-shanghai.aliyuncs.com';
var path = '/green/image/scan';

var clientInfo = {
	// "ip":"49.232.159.65",
	ip: '172.0.0.1'
};


// 请求体,根据需要调用相应的算法
var requestBody = JSON.stringify({  
    // bizType:'Green',
    scenes:['porn'],
    tasks:[{
    	'dataId':(new Date()).getTime(),
    	'url':'https://img03.sogoucdn.com/net/a/04/link?url=https%3A%2F%2Fi04piccdn.sogoucdn.com%2F271a2b482546cd24&appid=122'
    }]
}); 

var bizCfg = {
	'accessKeyId' : accessKeyId,
	'accessKeySecret' : accessKeySecret,
	'path' : path,
	'clientInfo' : clientInfo,
	'requestBody' : requestBody,
	'hostname' : hostname,
	'greenVersion' : greenVersion
}


// greenNodejs(bizCfg, execute);


// 业务代码，根据不同算法的返回结果采取相应的业务流程
// function execute(chunk){
// 	console.log('BODY: ' + chunk);
// }

function imageScan(execute){
	greenNodejs(bizCfg, execute);
} 

module.exports =  imageScan
