import express from 'express';
import { createServer } from 'node:http';
import { v4 as uuidv4 } from "uuid";
import cards from './cards';
import { cardType, gameObjType } from './type';
import fisherYatesShuffle from './features/fisherYatesShuffle';
import hit from "./blackjack/hit"

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});


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


io.on("connection", (socket) => {
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
            const roomId = uuidv4();
            console.log("一番目：", [...cards]);
            const initialDeck: cardType[] = fisherYatesShuffle([...cards]);
            console.log("二番目：", initialDeck);
            const [player1, player2] = waitingPlayers.splice(0, 2);
            const hands: Record<string, cardType[]> = {
                [player1]: initialDeck.slice(0, 2),
                [player2]: initialDeck.slice(2, 4),
            };
            const deck: cardType[] = initialDeck.slice(4);

            games[roomId] = {
                turn: 0,
                deck,
                players: [player1, player2],
                hands,
                turnEnds: {
                    [player1]: true,
                    [player2]: true,
                },
            };

            io.to(player1).emit("start_game", roomId);
            io.to(player2).emit("start_game", roomId);
            console.log("JG",roomId);
            console.log("確認：", games[roomId])
        }
    });

    socket.on("join_room", (roomId) =>{
        if (!games[roomId]) {
            console.error(`❌ Error: roomId ${roomId} does not exist in games.`);
            return;
        }
        console.log("JR",roomId);
        const [player1, player2] = games[roomId]["players"];
        io.to(player1).emit("give_first_hands", games[roomId]["hands"][player1], games[roomId]["hands"][player2]);
        io.to(player2).emit("give_first_hands", games[roomId]["hands"][player2], games[roomId]["hands"][player1]);
    });

    socket.on("hit", (playerId: string, roomId: string) => {
        games[roomId] = hit(playerId, games[roomId]);
        console.log(games[roomId]);
        const [player1, player2] = games[roomId]["players"];
        io.to(player1).emit("give_hand", games[roomId]["hands"][player1], games[roomId]["hands"][player2]);
        io.to(player2).emit("give_hand", games[roomId]["hands"][player2], games[roomId]["hands"][player1]);
    });

    socket.on("disconnect", () => {
        console.log("接続切れた");
    });
});



const PORT = 5001;

server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});



