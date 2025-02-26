import { cardType, gameObjType } from "../type";


/**
 * Hit（カードを1枚引く）時の処理を行う関数
 * - 山札からカードを1枚引き、手札に加える
 * - Hitしたら、手番が終了する
 *
 * @param {string} playerId Hitを行ったプレイヤーのsocket.id
 * @param {gameObjType} gameObj ゲームデータ
 * @returns {gameObjType} 更新したゲームデータ
 */
export default function hit(playerId: string, gameObj: gameObjType): gameObjType {
    // 手札にカードを追加
    const drawnCard: cardType = gameObj.deck[0];
    const updatedHands: Record<string, cardType[]> = {
        ...gameObj.hands,
        [playerId]: [...gameObj.hands[playerId], drawnCard],
    };

    const updatedDeck: cardType[] = gameObj.deck.slice(1);

    const updatedTurnEnds: Record<string, boolean> = {
        ...gameObj.turnEnds,
        [playerId]: true,
    };

    return {
        ...gameObj,
        deck: updatedDeck,
        hands: updatedHands,
        turnEnds: updatedTurnEnds,
    };
}