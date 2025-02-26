import { cardType } from "../type"

/**
 * Fisher-Yatesアルゴリズムを使用して配列をシャッフルする関数
 * @param {cardType[]} array シャッフル対象のカード配列
 * @return {cardType[]} シャッフル後のカード配列
 */
export default function fisherYatesShuffle(array: cardType[]): cardType[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}