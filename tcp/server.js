//  tcp.js

const PORT = 18001;
const HOST = '127.0.0.1';

//导入核心模块
var net = require('net');

//监听函数
var clientHandler = function (socket) {
    console.log('someone connected');

    //服务器端收到客户端发送的数据
    socket.on('data', function dataHandler(data) {
        console.log(socket.remoteAddress, socket.remotePort, 'send', data.toString())

        //服务器端向客户端发送数据
        socket.write('server received \n')
    });

    //链接断开
    socket.on('close', function () {
        console.log(socket.remoteAddress, socket.remotePort, 'connect close')
    })

}

//创建服务器
var app = net.createServer(clientHandler);

app.listen(PORT, HOST);

console.log('TCP server running on tcp://', HOST, ':', PORT);