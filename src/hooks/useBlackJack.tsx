import { useState } from 'react';
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
     * 手札の枚数を管理するState
     */
    // const [numberOfCardsInHand, setNumberOfCardsInHand] = useState<number>(2);

    /**
     * 手札を管理するState
     */
    const [cardsInHand, setCardsInHand] = useState<Card[]>(() => shuffledCardsArray.slice(0, 2));


    // const handleDrawCard = () => {
    //     setNumberOfCardsInHand((prevNumber) => prevNumber + 1);
    // };

    const handleDrawCard = () => {
        setCardsInHand((prevCardsInHand) => shuffledCardsArray.slice(0, prevCardsInHand.length + 1));
    };

    const calculateCardTotals = () => {

    };

    // return {shuffledCardsArray, numberOfCardsInHand, handleDrawCard};
    return {cardsInHand, handleDrawCard};
};