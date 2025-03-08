import { gameObjType } from "../type";


/**
 * Stand（カード追加は終了）時の処理を行う関数
 * - 自分の手番を終了する
 *
 * @param {string} playerId Standを宣言したプレイヤーのsocket.id
 * @param {gameObjType} gameObj ゲームデータ
 * @returns {gameObjType} 更新したゲームデータ
 */
export default function endTurn(playerId: string, gameObj: gameObjType): gameObjType {
    return {
        ...gameObj,
        hands: { ...gameObj["hands"] }, // shallow copyを防ぐ
        turnEnds: {
            ...gameObj["turnEnds"],
            [playerId]: true,
        },
    };
}