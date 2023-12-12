const HASHTAG = '#';
const DOT = '.';

function solve(input) {
    const universe = nameGalaxies(expandUniverse(input));
    // nameGalaxies(universe);
    console.log(universe);
}

function nameGalaxies(universe) {
    let galaxyNumber = 1;
    const namedUniverse = [];
    universe.forEach(row => {
        while (row.some(e => e === HASHTAG)) {
            row.splice(row.indexOf(HASHTAG), 1, galaxyNumber++);
        }
        namedUniverse.push(row);
    });
    return namedUniverse;
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
