import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});


// Socket.IOサーバーを作成し、Node.jsのHTTPサーバとアタッチする
import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("🔴接続成功");

    socket.on("send_message", (data) => {
        console.log(data);
    })

    socket.on("disconnect", () => {
        console.log("接続切れた");
    });
});

const PORT = 5001;

server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});