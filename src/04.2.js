function solve(input) {
    const currentCards = createDeck(input.split('\n'));
    let gameDeck = [...currentCards];

    for (let i = 0; i < gameDeck.length; i++) {
        const currCard = gameDeck[i];
        if (currCard.validNumsL === 0) continue;
        const index = currentCards.indexOf(currCard);
        const copiedCards = currentCards.slice(
            index + 1,
            index + 1 + currCard.validNumsL,
        );
        const replacementCards = [currCard, ...copiedCards];
        gameDeck.splice(i, 1, ...replacementCards);
    }
    return gameDeck.length;
}

function createDeck(initialCards) {
    const currentCards = [];
    const regex = /\d+/g;

    initialCards.forEach(row => {
        const [cardInfo, cards] = row.split(': ');
        const [winningNumsStr, ownNumsStr] = cards.split(' | ');
        const winningNums = winningNumsStr.match(regex).map(Number);
        const ownNums = ownNumsStr.match(regex).map(Number);
        const validNums = ownNums.filter(num => winningNums.includes(num));

        currentCards.push({
            number: Number(cardInfo.split(' ')[1]),
            winningNums,
            ownNums,
            validNums,
            validNumsL: validNums.length,
        });
    });
    return currentCards;
}
