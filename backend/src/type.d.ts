export interface cardType {
    id: number;
    mark: 'clover' | 'diamond' | 'heart' | 'spade';
    number: number;
}

export interface gameObjType {
    deck: cardType[];
    players: string[]; // todo: プレイヤー数は2人だから配列の要素も2つに制限できる型を探したい
    hands: Record<string, cardType[]>;
    turnEnds: Record<string, boolean>;
}