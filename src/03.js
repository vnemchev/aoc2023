function solve(input) {
    const splitInput = input.split('\n');
    const numbersDict = createNumberDict(splitInput);
    const symbolsDict = createSymbolsDict(splitInput);

    console.log(`Part 1: ${partOne(numbersDict, symbolsDict)}`);
    console.log(`Part 2: ${partTwo(numbersDict, symbolsDict)}`);
}

function partOne(numbersDict, symbolsDict) {
    const partNumbers = [];
    numbersDict.forEach(number => {
        const isPartNum = symbolsDict.some(symbol => {
            const inAdjacentRow =
                symbol.row >= number.row - 1 && symbol.row <= number.row + 1;
            const inAdjacentCol =
                symbol.index >= number.startIndex - 1 &&
                symbol.index <= number.endIndex;
            return inAdjacentRow && inAdjacentCol;
        });
        if (isPartNum) partNumbers.push(number.value);
    });

    return partNumbers.reduce((acc, curr) => acc + curr, 0);
}

function partTwo(numbersDict, symbolsDict) {
    const filtered = [];
    symbolsDict
        .filter(symbol => symbol.value === '*')
        .forEach(symbol => {
            const filteredNums = numbersDict.filter(number => {
                const numberL = number.value.toString().length;
                const inAdjacentRow =
                    number.row >= symbol.row - 1 &&
                    number.row <= symbol.row + 1;
                const inAdjacentCol =
                    number.startIndex >= symbol.index - numberL &&
                    number.endIndex <= symbol.index + numberL + 1;
                return inAdjacentRow && inAdjacentCol;
            });
            if (filteredNums.length === 2)
                filtered.push(filteredNums[0].value * filteredNums[1].value);
        });

    return filtered.reduce((acc, curr) => acc + curr, 0);
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
