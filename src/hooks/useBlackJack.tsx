import { useState, useMemo } from 'react';
import Cards from '@/components/cards/Cards';
import FisherYatesShuffle from '@/features/FisherYatesShuffle';

interface Card {
    id: number;
    mark: string;
    number: number;
}


export default function useBlackJack() {
    /**
     * 初回レンダリング時のみカードをシャッフル
     * ⇒ シャッフル後のカード配列はStateで管理
     */
    const [shuffledCardsArray] = useState<Card[]>(() => FisherYatesShuffle([...Cards]));

    /**
     * 手札を管理するState（最初は2枚をセット）
     */
    const [cardsInHand, setCardsInHand] = useState<Card[]>(() => shuffledCardsArray.slice(0, 2));

    /**
     * 手札の合計値を計算する（手札が変化したときに実行）
     */
    const totalScore = useMemo(() => {
        return cardsInHand.reduce((sum, card) => sum + card.number, 0);
    },[cardsInHand]);

    /**
     * 手札を追加するボタンのイベントハンドラ
     */
    const handleDrawCard = () => {
        setCardsInHand((prevCardsInHand) => [
            ...prevCardsInHand,
            shuffledCardsArray[prevCardsInHand.length]
        ]);
        console.log(cardsInHand);
    };

    return {cardsInHand, totalScore, handleDrawCard};
};