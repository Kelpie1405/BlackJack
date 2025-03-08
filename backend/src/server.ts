import express from 'express';
import { createServer } from 'node:http';
import { v4 as uuidv4 } from "uuid";
import cards from './cards';
import { cardType, gameObjType } from './type';
import fisherYatesShuffle from './features/fisherYatesShuffle';
import hit from "./blackjack/hit"
import endTurn from './blackjack/endTurn';

const app = express();
const server = createServer(app);

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });


// Socket.IOサーバーを作成し、Node.jsのHTTPサーバとアタッチする
import { Server } from "socket.io";
const io = new Server(server, {
    // todo:corsとoriginについてのコメントを書く
    cors: {
        origin: "*",
    }
});



// 参加ボタンを押した人のsocket.idを格納する配列
const waitingPlayers: string[] = [];

//! 何かコメントを書く
const games: Record<string, gameObjType> = {};


io.on("connection", (socket: any) => {
    console.log("🔴接続成功：", socket.id);

    /**
     * 「参加」ボタンを押下した時の挙動
     * 1. 待機列に並ぶ
     * 2. 待機人数が2人になったら、ゲーム開始
     */
    socket.on("join_game", () => {
        console.log(`✋ ${socket.id}が参加を表明`);

        if (!waitingPlayers.includes(socket.id)) {
            waitingPlayers.push(socket.id);

             // 待機人数を通知する
            io.emit("update_waiting_players", waitingPlayers.length);
        }


        if (waitingPlayers.length === 2) {
            const roomId: string = uuidv4();
            const initialDeck: cardType[] = fisherYatesShuffle([...cards]);
            const [player1, player2] = waitingPlayers.splice(0, 2);
            const hands: Record<string, cardType[]> = {
                [player1]: initialDeck.slice(0, 2),
                [player2]: initialDeck.slice(2, 4),
            };
            const deck: cardType[] = initialDeck.slice(4);

            games[roomId] = {
                deck,
                players: [player1, player2],
                hands,
                turnEnds: {
                    [player1]: false,
                    [player2]: false,
                },
            };

            io.emit("start_game", roomId);
        }
    });

    socket.on("join_room", (roomId: string) =>{
        if (!games[roomId]) {
            console.error(`❌ Error: roomId ${roomId} does not exist in games.`);
            return;
        }

        const [player1, player2] = games[roomId]["players"];
        io.to(player1).emit("give_hands", games[roomId]["hands"][player1], games[roomId]["hands"][player2]);
        io.to(player2).emit("give_hands", games[roomId]["hands"][player2], games[roomId]["hands"][player1]);
    });

    socket.on("hit", (roomId: string, playerId: string) => {
        games[roomId] = hit(playerId, games[roomId]);

        const [player1, player2] = games[roomId]["players"];
        io.to(player1).emit("give_hands", games[roomId]["hands"][player1], games[roomId]["hands"][player2]);
        io.to(player2).emit("give_hands", games[roomId]["hands"][player2], games[roomId]["hands"][player1]);
    });

    socket.on("stand", (roomId: string, playerId: string) => {
        games[roomId] = endTurn(playerId, games[roomId]);

        const [player1, player2] = games[roomId]["players"];
        if (games[roomId]["turnEnds"][player1] === true && games[roomId]["turnEnds"][player2] === true) {
            io.to(player1).to(player2).emit("finish_game");
        } else {
            if (playerId === player1) {
                io.to(player2).emit("is_stand_declared");
            } else {
                io.to(player1).emit("is_stand_declared");
            }
        }
    });

    socket.on("disconnect", () => {
        console.log("接続切れた");
    });
});



const PORT = 5001;

server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});



