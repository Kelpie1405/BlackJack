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
     * My手札を管理するState（最初は2枚をセット）
     */
    const [cardsInHand, setCardsInHand] = useState<Card[]>(() => shuffledCardsArray.slice(0, 2));

    /**
     * My手札の合計値を計算する（My手札が変化したときに実行）
     */
    const totalScore = useMemo(() => {
        return cardsInHand.reduce((sum, card) => sum + card.number, 0);
    },[cardsInHand]);

    /**
     * My手札を追加するボタンのイベントハンドラ
     */
    const handleDrawCard = () => {
        setCardsInHand((prevCardsInHand) => [
            ...prevCardsInHand,
            shuffledCardsArray[prevCardsInHand.length]
        ]);
        console.log(cardsInHand);
    };

    /**
     * 対戦相手の手札を管理するState（最初は2枚をセット）
     */
    const [oppCardsInHand, setOppCardsInHand] = useState<Card[]>(() => shuffledCardsArray.slice(shuffledCardsArray.length - 2, shuffledCardsArray.length));

    return {cardsInHand, totalScore, handleDrawCard, oppCardsInHand};
};