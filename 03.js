function solve(input) {
    const numbers = [];
    input.split('\n').forEach((row, i) => {
        const matches = [...row.matchAll(/\d+/dg)];
        matches.forEach(match => {
            numbers.push({
                value: Number(match[0]),
                row: i,
                startIndex: match.indices[0][0],
                endIndex: match.indices[0][1],
            });
        });
    });
    numbers.forEach(n => console.log(n));
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
