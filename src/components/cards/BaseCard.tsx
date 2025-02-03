type CardProps = {
    id: number;
    mark: string;
    number: number;
};

const BaseCard = ({ card }: { card: CardProps }) => {
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
        <div className="w-32 h-40 border border-blue-400 relative">
            <span className="w-6 h-8 absolute top-2 left-2 text-3xl text-center border">{card.number}</span>
            <span className="w-6 absolute top-11 left-2 text-center border">{assignMark(card.mark)}</span>
            <span className="w-6 -scale-100 absolute bottom-11 right-2 text-center border">{assignMark(card.mark)}</span>
            <span className="w-6 h-8 -scale-100 absolute bottom-2 right-2 text-3xl text-center border">{card.number}</span>
        </div>
    );
};

export default BaseCard