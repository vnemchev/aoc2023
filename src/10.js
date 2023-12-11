function solve(input) {
    const universe = expandUniverse(input);
}

function expandUniverse(input) {
    const universe = input.split('\n').map(r => r.split(''));
    const verticallyExpanded = expandColumns(universe);
    const expandedUniverse = expandRows(verticallyExpanded);
    const result = expandedUniverse.map(r => r.join(''));
    return result.join('\n');
}

function expandColumns(input) {
    const universe = [...input];
    for (let i = 0; i < universe[0].length; i++) {
        for (let j = 0; j < universe.length; j++) {
            const el = universe[j][i];
            if (el !== '.') break;
            if (j !== universe.length - 1) continue;
            for (let k = 0; k < universe.length; k++) {
                const row = universe[k];
                row.splice(i, 0, '.');
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
        const rowHasGalaxy = row.some(e => e !== '.');
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
