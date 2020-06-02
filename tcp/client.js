var net = require('net');

const HOST = '127.0.0.1';

const PORT = 18001;


var tcpClient = net.Socket();

tcpClient.connect(PORT, HOST, function () {
    console.log('connect success');
    tcpClient.write('this is tcp client by Node.js');
});

//接受服务器端的数据
tcpClient.on('data', function (data) {
    console.log('receive: ', data.toString())
})