"use client";
import BaseCard from '@/components/cards/BaseCard';
import useBlackJack from '@/hooks/useBlackJack';

export default function Home() {
    // const { shuffledCardsArray, numberOfCardsInHand, handleDrawCard } = useBlackJack();
    const { cardsInHand, handleDrawCard } = useBlackJack();

    return(
        <div>
            <div className="flex justify-center gap-10 mx-40 my-40">
                {/* {shuffledCardsArray.slice(0, numberOfCardsInHand).map((card) => (
                    <BaseCard
                        key={card.id}
                        card={card}
                    />
                ))} */}
                {cardsInHand.map((card, index) => (
                    <BaseCard
                        key={card.id}
                        card={card}
                        // 新たに引いたカードのみアニメションを追加
                        className={index === cardsInHand.length - 1 && cardsInHand.length >= 3 ? "border-red-700" : ""}
                    />
                ))}
            </div>

            <div className="flex justify-center gap-10 mx-40 my-40">
                {/* ! 後々ボタンはコンポーネント化 */}
                <button onClick={handleDrawCard} className="">一枚引く</button>
                <button>勝負！！</button>
            </div>
        </div>
    );
}
