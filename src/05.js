function solve(input) {
    const { seeds, almanach } = createSeedsAndAlmanach(input);
}

function createSeedsAndAlmanach(input) {
    const regex = /\d+/g;
    const inputRows = input.split('\n').filter(a => a != '');

    const seeds = inputRows.shift().match(regex).map(Number);
    const almanach = new Map();
    let mapKey = '';

    inputRows.forEach(row => {
        if (isNaN(Number(row[0]))) {
            mapKey = row.split(' ')[0];
            almanach.set(mapKey, []);
        } else {
            const [destRange, srcRange, rangeL] = row.match(regex).map(Number);
            const steps = almanach.get(mapKey);
            steps.push({ destRange, srcRange, rangeL });
            almanach.set(mapKey, steps);
        }
    });
    return { seeds, almanach };
}

solve(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`);
