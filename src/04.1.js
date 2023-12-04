function solve(input) {
    const regex = /\d+/g;
    let sum = 0;
    input.split('\n').forEach(row => {
        const [_, cards] = row.split(': ');
        const [winningCardsStr, ownCardsStr] = cards.split(' | ');
        const winningCards = winningCardsStr.match(regex).map(Number);
        const ownCards = ownCardsStr.match(regex).map(Number);
        const validCardsCount = ownCards.filter(card =>
            winningCards.includes(card),
        ).length;
        if (validCardsCount > 0 && validCardsCount <= 1) sum += 1;
        else if (validCardsCount > 1) sum += calcPoints(validCardsCount);
    });
    return sum;
}

function calcPoints(count) {
    let current = 1;
    let sum = 0;
    for (let i = 0; i < count; i++) {
        if (i !== 0) current *= 2;
        sum += current;
    }
    return current;
}
