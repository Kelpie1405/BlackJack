import BaseCard from '@/components/cards/BaseCard';

type CardProps = {
    id: number;
    mark: string;
    number: number;
};

const ClickedCard = ({ card, isSelected, onClick }: { card: CardProps; isSelected: boolean; onClick: () => void; }) => {
    return (
        <div
            onClick={onClick}
            className={`duration-500 ${isSelected ? "scale-125 -translate-y-1/2" : ""}`}
        >
            <BaseCard card={card} />
        </div>
    );
};

export default ClickedCard;