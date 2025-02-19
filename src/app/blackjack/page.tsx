"use client";
import { useMemo } from 'react';
import BaseCard from '@/components/cards/BaseCard';
import Button from '@/components/Button';
import useBlackJack from '@/hooks/useBlackJack';
// import OpenCurtainEffect from '@/components/oneTimeEffect/openingEffect/OpenCurtainEffect';
import './index.css'

export default function Home() {
    /**
     * BlackJacKのビジネスロジック
     *
     * @returns {Card[]} cardsInHand 手札（カード配列）
     * @returns {number} totalScore 手札のカードの合計点数
     * @returns {void} handleDrawCard カードを引くボタンのイベントハンドラ
     */
    const { cardsInHand, totalScore, handleDrawCard, oppCardsInHand } = useBlackJack();

    const currentResult = useMemo(() => {
        return (totalScore > 21 ? "Burst" :
                totalScore === 21 ? "BlackJack" :
                "under21");
    }, [totalScore]);

    return(
        <div>
            {/* <OpenCurtainEffect /> */}
            <div className="me-16 mt-16">
                <h4 className="text-right text-3xl font-bold">
                    <span className="p-4 border-black border-4">合計点数：
                        <span> {totalScore}</span>
                    </span>
                </h4>
            </div>

            <div className="flex justify-center gap-10 mx-40 my-40">
                {oppCardsInHand.map((card, index) => (
                    <BaseCard
                        key={card.id}
                        card={card}
                        // 新たに引いたカードのみアニメションを追加
                        className={index === cardsInHand.length - 1 && cardsInHand.length >= 3 ? "border-red-700 animation-slide-card" : ""}
                    />
                ))}
            </div>

            <div className="flex justify-center gap-10 mx-40 my-40">
                {cardsInHand.map((card, index) => (
                    <BaseCard
                        key={card.id}
                        card={card}
                        // 新たに引いたカードのみアニメションを追加
                        className={index === cardsInHand.length - 1 && cardsInHand.length >= 3 ? "border-red-700 animation-slide-card" : ""}
                    />
                ))}
            </div>

            <div className="flex justify-center gap-10 mx-40 my-40">
                <Button
                    onClick={handleDrawCard}
                    disabled={currentResult !== "under21"}
                    className=''
                    text="１枚引く"
                />
                <Button
                    onClick={handleDrawCard}
                    className=''
                    text="勝負！！"
                />
            </div>

            {/* BlackJack時とバースト時のエフェクト */}
            {currentResult !== "under21" && (
                <div
                    // todo このCSSのコメントを書く
                    className={`
                        h-screen w-screen inset-0
                        fixed flex items-center justify-center
                        text-9xl font-black ${currentResult === "Burst" ? "text-neutral-950" : "text-red-600"}
                        opacity-0 animation-overlay
                    `}
                >{currentResult}</div>
            )}
        </div>
    );
}
