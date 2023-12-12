const HASHTAG = '#';
const DOT = '.';

function solve(input) {
    const { namedUniverse, universeCoords } = createMap(expandUniverse(input));
    partOne(universeCoords);
}

function partOne(universeCoords) {
    const coordinates = Object.entries(universeCoords);
    for (let i = 0; i < coordinates.length; i++) {
        const [galaxy, coords] = coordinates[i];
        let x1 = coords.x;
        let y1 = coords.y;

        for (let j = i + 1; j < coordinates.length; j++) {
            const [nextGalaxy, nextCoords] = coordinates[j];
            const x2 = nextCoords.x;
            const y2 = nextCoords.y;

            if (galaxy === '1' && nextGalaxy === '7') {
                let count = 0;
                let coordToMove = 'x';
                while (x1 !== x2 || y2 !== y2) {
                    if (coordToMove === 'x') {
                        if (x1 >= x2) x1--;
                        if (x1 < x2) x1++;
                        coordToMove = 'y';
                    } else if (coordToMove === 'y') {
                        if (y1 >= y2) y1--;
                        if (y1 < y2) y1++;
                        coordToMove = 'x';
                    }
                    count++;
                }
                console.log(`Galaxy ${galaxy} to Galaxy ${nextGalaxy}:`);
                console.log(`Count: ${count}`);
            }
        }
    }
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

solve(`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`);
