function solve(input) {
    const starterDeck = createDeck(input.split('\n'));
    let gameDeck = [...starterDeck];

    for (let i = 0; i < gameDeck.length; i++) {
        const currCard = gameDeck[i];
        if (currCard.validNumsL === 0) continue;
        const startIndex = starterDeck.indexOf(currCard) + 1;
        const copiedCards = starterDeck.slice(
            startIndex,
            startIndex + currCard.validNumsL,
        );
        const replacementCards = [currCard, ...copiedCards];
        gameDeck.splice(i, 1, ...replacementCards);
    }
    return gameDeck.length;
}

function createDeck(initialCards) {
    const deck = [];
    const regex = /\d+/g;

    initialCards.forEach(row => {
        const [_, cards] = row.split(': ');
        const [winningNumsStr, ownNumsStr] = cards.split(' | ');
        const winningNums = winningNumsStr.match(regex).map(Number);
        const ownNums = ownNumsStr.match(regex).map(Number);
        const validNums = ownNums.filter(num => winningNums.includes(num));
        deck.push({ validNumsL: validNums.length });
    });
    return deck;
}
