type CardProps = {
    id: number;
    mark: string;
    number: number;
};

// ? 後々あるカードは光らせたいなどが起きるからclassNamePropsを追加した
const BaseCard = ({ card, className = "" }: { card: CardProps, className: string }) => {
    // ? switch文ではなく、マークのオブジェクトを作成した方が実行速度は速そう
    const assignMark = (markName: string) => {
        switch (markName) {
            case 'clover':
                return '♧';
            case 'diamond':
                return '♢';
            case 'heart':
                return '♡';
            case 'spade':
                return '♤';
        }
    };

    // ToDo: 数字とマークのボーダーラインを消す
    return (
        <div className={`w-48 h-64 border border-blue-400 relative ${className}`}>
            <span className="h-12 w-10 absolute top-2 left-2 text-center text-5xl border">{card.number}</span>
            <span className="h-8 w-10 absolute top-14 left-2 text-center text-2xl border">{assignMark(card.mark)}</span>
            <span className="h-8 w-10 absolute bottom-14 right-2 -scale-100 text-center text-2xl border">{assignMark(card.mark)}</span>
            <span className="h-12 w-10 absolute bottom-2 right-2 -scale-100 text-center text-5xl border">{card.number}</span>
        </div>
    );
};

export default BaseCard