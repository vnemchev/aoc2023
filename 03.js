function solve(input) {
    const splitInput = input.split('\n');
    const numbersDict = createNumberDict(splitInput);
    const symbolsDict = createSymbolsDict(splitInput);
}

function createNumberDict(input) {
    const numbers = [];
    input.forEach((row, i) => {
        const matches = [...row.matchAll(/\d+/dg)];
        if (matches.length) {
            matches.forEach(match => {
                numbers.push({
                    value: Number(match[0]),
                    row: i,
                    startIndex: match.indices[0][0],
                    endIndex: match.indices[0][1],
                });
            });
        }
    });
    return numbers;
}

function createSymbolsDict(input) {
    const symbols = [];
    input.forEach((row, i) => {
        const matches = [...row.matchAll(/[^\d|.|\s]/dg)];
        if (matches.length) {
            matches.forEach(match => {
                symbols.push({
                    value: match[0],
                    row: i,
                    index: match.index,
                });
            });
        }
    });
    return symbols;
}

solve(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`);
