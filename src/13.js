function solve(input) {
    const mirrors = input.split(/\n\s*\n/);
    mirrors.forEach(mirror => {
        const horizontalScore = examineHorizontal(mirror);
        const verticalScore = examineVertical(mirror);
    });
}

function examineHorizontal(mirrorString) {
    const mirror = mirrorString.split('\n');
    const mirrorL = mirror.length;
    for (let i = 0; i < mirrorL; i++) {
        const row = mirror[i];
        const nextRow = mirror[i + 1];
        if (row !== nextRow) continue;

        const firstHalf = mirror.slice(0, i + 1);
        const secondHalf = mirror.slice(i + 1);
        const hasHorizontalRef = proveHorizontalReflection(
            firstHalf,
            secondHalf,
        );
        if (hasHorizontalRef)
            return getHorizontalScore(firstHalf.length, secondHalf.length);
    }
    return null;
}

function getHorizontalScore(firstHalfL, secondHalfL) {
    return firstHalfL > secondHalfL ? firstHalfL * 100 : secondHalfL * 100;
}

function proveHorizontalReflection(firstHalf, secondHalf) {
    const firstHalfL = firstHalf.length;
    const secondHalfL = secondHalf.length;
    let string1 = '';
    let string2 = '';
    let smallerHalf = firstHalfL;
    if (firstHalfL > secondHalfL) smallerHalf = secondHalfL;
    if (firstHalfL < secondHalfL) smallerHalf = firstHalfL;

    for (let i = 0; i < smallerHalf; i++) {
        string1 += `${firstHalf[smallerHalf - i]}`;
        string2 += `${secondHalf[i]}`;
    }
    return string1 === string2;
}

solve(`#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#

#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`);
