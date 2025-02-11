"use client";
import React, { useMemo, useState } from 'react';
import Cards from '@/components/cards/Cards';
import ClickedCard from '@/components/cards/ClickedCard';
import FisherYatesShuffle from '@/features/FisherYatesShuffle';

// ! リロード時にカードが2回変化する
export default function Home() {
    /**
     * 初回レンダリング時のみ、カードをシャッフルする
     */
    const shuffledCards = useMemo(() => FisherYatesShuffle(Cards), []);

    /**
     * クリックしたカードを拡大または縮小
     */
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const handleCardClick = (id: number) => {
        setSelectedCardId((prevId) => (prevId === id ? null : id));
    };

    const [numberOfExchanges, setNumberOfExchanges] = useState<number>(0);

    const exchangeCard = (numberOfExchanges: number) => {

    };

    return(
        <div>
            <div className="flex justify-center gap-10 mx-40 my-40">
                {shuffledCards.slice(0,2).map((card) => (
                    <ClickedCard
                        key={card.id}
                        card={card}
                        isSelected={selectedCardId === card.id}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>

            <div className="">
                <button onClick={exchangeCard} className="">交換</button>
            </div>
        </div>
    );
}
