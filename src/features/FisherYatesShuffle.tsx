interface Card {
    id: number;
    mark: string;
    number: number;
}

/**
 * Fisher-Yatesアルゴリズムを使用して配列をシャッフルする関数
 * @param array シャッフル対象のカード配列
 * @return シャッフル後のカード配列
 */
export default function FisherYatesShuffle(array: Card[]): Card[] {
    for (let i:number = array.length - 1; i > 0; i--) {
        const j:number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}