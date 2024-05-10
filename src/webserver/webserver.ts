import { Server } from "socket.io";
import http from 'http';

const server = http.createServer()
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    console.log(socket.id)

    socket.emit('welcome', 'Hello ' + socket.id)

    socket.on('send', data => {
        console.log('Client said: ', data)
        socket.emit('response', data)
    });

    // socket.on('connect', data => {
    //
    // });
    //
    // socket.on('send', data => {
    //     socket.emit('receive', data)
    // });
    //
    // socket.on('receive', data => {
    //     socket.emit('send', data)
    // });
    //
    // socket.on('disconnect', () => {
    //     socket.emit('goodbye', 'Goodbye ' + socket.id)
    // });
});

// io.on('disconnect', client => {
//     console.log('!!! DISCONNECT')
//     client.emit('goodbye', 'Goodbye ' + client.id)
// });
//
// io.on('send', client => {
//     console.log('!!! SEND')
//     client.emit('send', 'Message Sent')
// });
//
// io.on('receive', client => {
//     console.log('!!! RECEIVE')
//     client.emit('receive', 'Message Received')
// });

server.listen(4017, () => {
    console.log('*** Server listens on port ' + 4017)
})