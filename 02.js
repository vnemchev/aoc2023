const bag = {
    red: 12,
    green: 13,
    blue: 14,
};

const solve = input => {
    const possibleGames = [];
    let powerSum = 0;
    input.split('\n').forEach(row => {
        let validGame = true;
        const [game, rest] = row.split(': ');
        const gameId = Number(game.split(' ')[1]);
        const moves = rest.split('; ');
        const movesL = moves.length;
        const fewestPossible = { red: 0, green: 0, blue: 0 };

        for (let i = 0; i < movesL; i++) {
            const move = moves[i];
            const cubes = move.split(', ');
            const cubesL = cubes.length;
            const currentBag = { ...bag };

            for (let j = 0; j < cubesL; j++) {
                const cube = cubes[j];
                const [countString, color] = cube.split(' ');
                const count = Number(countString);
                currentBag[color] -= count;
                if (fewestPossible[color] < count)
                    fewestPossible[color] = count;
            }
            if (Object.values(currentBag).some(v => v < 0)) validGame = false;
        }
        if (validGame) possibleGames.push(gameId);
        powerSum += Object.values(fewestPossible).reduce(
            (acc, curr) => acc * curr,
        );
    });

    return {
        possibleSum: possibleGames.reduce((acc, curr) => acc + curr, 0),
        powerSum,
    };
};
