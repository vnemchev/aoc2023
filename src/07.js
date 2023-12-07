solve(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
23456 566`);

function solve(input) {
    const a = [1, 2, 3];
    console.log(a.indexOf(2));
    console.log(a.lastIndexOf(2));
    input.split('\n').forEach(row => {
        const [hand, bidStr] = row.split(' ');
        const bid = Number(bidStr);
        const handType = getHandType(hand.split(''));
        console.log(handType);
        console.log('--------------------');
    });
}

function getHandType(cardsInput) {
    const cards = cardsInput.filter(
        card => cardsInput.indexOf(card) !== cardsInput.lastIndexOf(card),
    );
    const cardsL = cards.length;
    if (cardsL === 0) return 'High card';
    if (cardsL === 2) return 'One pair';
    if (cardsL === 3) return 'Three of a kind';
    if (cardsL === 4)
        return new Set(cards).size === 1 ? 'Four of a kind' : 'Two pair';
    if (cardsL === 5)
        return new Set(cards).size === 1 ? 'Five of a kind' : 'Full house';
}

function getCardPoints(card) {
    const cardPoints = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'T',
        'J',
        'Q',
        'K',
        'A',
    ];
    return cardPoints.indexOf(card);
}
