const HASHTAG = '#';
const DOT = '.';

function solve(input) {
    const { universeCoords } = createMap(expandUniverse(input));
    console.log(`Part 1: ${partOne(universeCoords)}`);
}

function partOne(universeCoords) {
    const coordinates = Object.values(universeCoords);
    const distances = [];
    for (let i = 0; i < coordinates.length; i++) {
        const coords = coordinates[i];
        for (let j = i + 1; j < coordinates.length; j++) {
            const nextCoords = coordinates[j];
            const distance =
                Math.abs(coords.x - nextCoords.x) +
                Math.abs(coords.y - nextCoords.y);
            distances.push(distance);
        }
    }
    return distances.reduce((acc, curr) => acc + curr, 0);
}

function createMap(universe) {
    let galaxyNumber = 0;
    const namedUniverse = [];
    const universeCoords = {};
    universe.forEach((row, i) => {
        while (row.some(e => e === HASHTAG)) {
            row.splice(row.indexOf(HASHTAG), 1, ++galaxyNumber);
            universeCoords[galaxyNumber] = {};
            universeCoords[galaxyNumber].x = row.indexOf(galaxyNumber);
            universeCoords[galaxyNumber].y = i;
        }
        namedUniverse.push(row);
    });
    return { namedUniverse, universeCoords };
}

function expandUniverse(input) {
    const universe = input.split('\n').map(row => row.split(''));
    const verticallyExpanded = expandColumns(universe);
    return expandRows(verticallyExpanded);
}

function expandColumns(input) {
    const universe = [...input];
    for (let i = 0; i < universe[0].length; i++) {
        for (let j = 0; j < universe.length; j++) {
            const el = universe[j][i];
            if (el !== DOT) break;
            if (j !== universe.length - 1) continue;
            for (let k = 0; k < universe.length; k++) {
                const row = universe[k];
                row.splice(i, 0, DOT);
            }
            i++;
        }
    }
    return universe;
}

function expandRows(input) {
    const universe = [...input];
    for (let i = 0; i < universe.length; i++) {
        const row = universe[i];
        const rowHasGalaxy = row.some(e => e !== DOT);
        if (rowHasGalaxy) continue;
        universe.splice(i, 0, row);
        i++;
    }
    return universe;
}
