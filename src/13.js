function solve(input) {
    const mirrors = input.split(/\n\s*\n/);
    let result = 0;
    mirrors.forEach(mirror => {
        const splitMirror = mirror.split('\n');
        const horizontalScore = examineHorizontal(splitMirror) || 0;
        const verticalScore = examineVertical(splitMirror) || 0;
        result += horizontalScore + verticalScore;
    });
    console.log(result);
}

function examineVertical(mirror) {
    const mirrorW = mirror[0].length;
    const rotatedMirror = [];
    for (let i = 0; i < mirrorW; i++) {
        rotatedMirror.push(mirror.map(row => row[i]).join(''));
    }
    return examineMirror(rotatedMirror, 'vertical');
}

function examineHorizontal(mirror) {
    return examineMirror(mirror, 'horizontal');
}

function examineMirror(mirror, reflectionType) {
    const mirrorL = mirror.length;
    for (let i = 0; i < mirrorL; i++) {
        const row = mirror[i];
        const nextRow = mirror[i + 1];
        if (row !== nextRow) continue;

        const firstHalf = mirror.slice(0, i + 1);
        const secondHalf = mirror.slice(i + 1);
        const hasReflection = proveReflection(firstHalf, secondHalf);
        if (!hasReflection) continue;

        return reflectionType === 'horizontal'
            ? getScore(firstHalf.length, secondHalf.length) * 100
            : getScore(firstHalf.length, secondHalf.length);
    }
    return null;
}

function proveReflection(firstHalf, secondHalf) {
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

function getScore(firstHalfL, secondHalfL) {
    return firstHalfL > secondHalfL ? firstHalfL : secondHalfL;
}

solve(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`);

solve(`##.#.##
#.##...
.######
##....#
#.##.#.
.#.####
.#.####
#.##.#.
##....#
.######
#.##..#
##.#.##
..###..
..###..
##.#.##
#.##..#
.######

###....
##..###
.####..
.#.....
####.##
.....##
#..####
.#...##
#...###
.###...
.#..###
####.##
....###
....###
###..##

...##.##.##....
.##.######.##..
.##.#....#.##..
###.######.####
#.##......##.##
..###.##.###...
#####....######
####..##..#####
.###.#....###..
#####....######
..#........#...

####....##.
##.#....##.
#..#.###.##
.###...#.##
..###..#.#.
#.#..#.#.#.
.##..######
###..#....#
##.###..###
..##.#.##..
.#.##.#.#.#
.##.##.#.#.
.##.##.#.#.
.#.##.#.#.#
..##.#.##..

##...###..#.###
##...###..#.##.
##...###..#.##.
##...###..#.###
...###..###..#.
#.###.##....#.#
.#.#.#...#.#..#

###.#.##.#.##
..##.####.##.
##...#..#...#
.....#..#....
####.####.#.#
..#.#.##.#.#.
#####....####
..####..####.
..##########.
##..##..##..#
...#......#..
...#.####.#..
######..#####
###.######.##
##..##..##..#

#.##.#...
..##...##
##..##.##
##..##...
..###.#..
#.##.#...
#.##.#.##
#.##.#...
#.##.#...
..##..#..
#.##.##..
######.##
#....####
.......##
######.##
.####..##
#.##.####

.####....#..##.##
..########..####.
.#..##..#..####..
#.#..#..###...###
..#...##.#..#.##.
###.#.##.###..##.
....###.#..####.#
....###.#..####.#
###.#.##.###..##.
..#...##.#..#.##.
#.#..#..###...###
.#..##..#..####..
..########..#.##.
.####....#..##.##
.####....#..##.##

...#..#...#.#.#
...#..##...#..#
####.###.#...##
..#..##.#.#....
##.#.#...#.#.#.
.....###..#.#..
..#.#.#.....##.
..#.#.#.....##.
.....###..#.#..
##.#.#...#.#.#.
..#..##.#.#....
####.#.#.#...##
...#..##...#..#
...#..#...#.#.#
######.....####

.####.#
##..##.
###.###
......#
......#
#....##
#....##

...##...##.#.#.
...##...##.#.#.
##....##.#.#.#.
#..##......#.##
...##...#######
########....#.#
.##..##......##
#......#..#...#
#..##..##.#.###

.##.###...#
.##.###..##
.##.##.###.
#..##..##..
#..#..#.#..
#..#..#####
....##.####
....#..####
####.......
#..#.##.#..
#####.##.##

..#.#.#.##....#..
.#...###.##.#..#.
.#...###.##.#..#.
..#.#.#.##....#..
##..#.#..#..#.#.#
.#.#..#.#.##.....
.......###.......
####..#...#.##.##
.#.#.#...........
.#...#...........
####..#...#.##.##

##..###.#....
#....###....#
..##....#....
.####...##..#
.#..#.#.#..#.
.####...#...#
#.##.#.#...##
..##.....##..
########..#.#
#....########
.####....##..
#.##.#..####.
#.##.#.#####.

#.#..##.###
#.#..###...
.#.#.##.#..
.####...###
####..##...
...##...#..
##.#.###...
#..##..##..
#..#.##..##
.######.###
..#####.###

#.#.####.#.#.###.
#.#.####.#.#.###.
#.###..###.##.##.
#.#.####.#.##..#.
############.##.#
.#.######.#.#....
...#....#...#.###
#..##..##..#..#..
.##......##..###.
...##..##...##..#
..#..##..#...###.
.....##......####
..###..#.#..###.#
#.#.#..#.#.#.##..
.###....###..#.##
##.#.##.#.###..##
.#........#..#.##

#..####..####
###.##.######
####..#######
#...##...#..#
###....###..#
#........#..#
###.##.###..#
..#....#.....
............#
#..####..#..#
.##....##....
##.#..#.#####
###.##.######
....##.......
###....######
##......##..#
...#..#......

.###.#..##..##..#
#..#######..#####
.#.##.##.#..#.##.
..........##.....
..........##.....
##...###.####.###
#.#.##..######..#
##.#######..#####
#.....##..##..##.
#....############
.#.#.#..######..#
#.##.####.##.####
###.#####.##.####
.#..#.##.####.##.
#..##.##.#..#.##.
.#####..#....#..#
#.##.#..######..#

####.##.##.##.#
..#............
#####..####..##
.###....##....#
..###..####..##
#...#..#..#..#.
.#...##....##..
.#.#.##.##.##.#
#..............
#..#....##....#
....#..#..#..#.
.#.############
.##############
....##########.
...#.##.##.##.#

...........#...
.#.##.#..#..###
########..#####
..........#.###
#......#...#.##
#.####.####..##
.#....#......##
.#....#.#.#.###
...##.......#..
#.####.##....##
#......##.#....
###..#####..#..
#........##.#..

##########.#.##.#
#.##.#...##..#..#
##..###.#..###.#.
##..###.#..###.#.
#.##.#...##..#..#
##########.#.##.#
########.....##..
#.##.##.##....##.
........##..#...#
#....#.##..#...#.
#.######...##.#..

....#..
#..###.
..###.#
..##..#
#..###.
....#..
####...
...##..
..#.###
##...#.
#.#..#.
#.#..#.
##...#.

.###.##.###.#..
.....##.....###
##.######.##...
#..######..##..
#.#.#..#.#.##..
.##......##..##
...######....##
.##.#..#.##.###
.##.#.##.##..##
###......######
#....##....####
....#..#.......
..#......#..#..

#..#######.
#..########
.#.#..##.##
.#.##...#.#
.#.##...#.#
.#.#..##.##
#..########
#..#######.
..#.##.##..

.##....##.###.#
..##..##....#..
..##..##.......
.##....##.###.#
##......###.###
#.#....#.##.##.
#.#....#.#.#.##
#.######.##....
..#.##.#..#.##.
...####...#.##.
.#.####.#..#..#
###....###.##..
##..##..##.##..

####.##..####
####.##..####
..#.#######.#
.#.##.#.##...
.###...##.#..
.##.###.####.
.##..#.#....#
.##..#.#....#
.##.###.####.
.###...##.#..
.#.##.#..#...
..#.#######.#
####.##..####

####..#.##....#
####..#.##.....
#..##.###.##.##
......#...##.#.
....#.##.##....
####.#.#.##.#..
#..#..#####..##
............#.#
#..#..##.#...#.

####.##.####..#
.##..##..##..#.
#..#....#..#...
.##......##...#
.####..####....
.....##.....#.#
#..#....#..#...
####.##.#######
....####....#.#

##..#.....###..#.
....#.##.##...###
#..####.##...#.##
##.##..###...#.#.
##.#.####.##.....
#.####.###.#.##..
##.#..###.#..##..
###.#.#.#.#.#.#..
###.#.#.#...#.#..
....#..#.#.#..##.
..#.#.###.#.#..#.
..#.#.###.#.#..#.
....#..#.#.#..##.
###.#.#.#...#.#..
###.#.#.#.#.#.#..

.#.##..##.#..
.##########..
..##.##.##...
#...#..#.....
...##..##....
.#.######.#..
#...#..#...##
#.#......#.##
.###.##.###..
.#.#.##.#.#..
#..######..##
#.#..##..#.##
.#.######.#..
#....##....##
.#..#..#..#..
#.#.#..#.#.##
.##########..

....###.....####.
##.####..#.#..#.#
####.##..#.##...#
...#....#...##..#
...#...#....##..#
####.#.#..##.####
....#.###.#......
##.##...####...##
##.##...####...##
....#.###.#......
####.#.#..##.###.
...#...#....##..#
...#....#...##..#

..#.##..#
..#.##..#
#######..
#..#.##..
#.#....##
#..#...#.
###.#.#..
#.#.#..##
#.#.#..##
###.#.#..
#..#...#.
#.#....##
#..#.##..
#######..
..#.##.##

....#.##.####
#.##.#...#...
..####..#..##
##...#...#.##
#.####..##.##
###..######..
.##..######..

#..####.#.#
#..####.#.#
#...#.#.#.#
.##.#.##..#
#..##..####
##..##.##..
####..##.#.
#.##..##.#.
##..##.##..

##.#..#.###.#..
##..#.######.#.
###..#.##.#....
##.####.#.####.
..#.####.#.#..#
...#.#.##.###..
###....#.#.#..#
..#.###.##..##.
...#.###.###...
############.#.
###########..#.

.##....
.#.#...
#..####
#..####
.#.#...
.##....
...#..#

.#.##.#..##..#.
..####....#..##
#......#....#.#
.######.#..#.##
.........#####.
..####..#......
..####..#......
.........#####.
.######.#..#.##
#......#....#.#
..####....#..##
.#.##.#..##..#.
.#.#..#.##..#..
.#.##.#...####.
.#.##.#.#...#..

...#.#..#
##..#....
###......
###......
##..#....
...#.#..#
#...##..#
..##....#
..#.##..#
#.....##.
#....####

...###..###
#..##..####
##.##.....#
..#..###..#
.#.##.###..
#...###.###
....#.#.##.
#...#......
#...#......
....#.#.##.
#...###.###
.#.##.###..
..#..###..#
##.##.....#
#..##..####
...###..###
....##..###

..##.#.#..#..#.##
..#.#..##.#.###..
..#.#..##.#.###..
..##.#.#..#..#.##
#..##.##..#.##.##
.#####.#..###...#
...#.....##.####.
..#....#..##..#..
.#..##.#..###.##.
....#.####.####.#
...#.###..#..#..#
.##.#.#..###...##
..#.#.#..###...##

.###.###...
##..#...##.
.##.#.....#
...#...#...
##.#...#.#.
##.#...#.#.
...#...#...
.##.#...#.#
##..#...##.
.###.###...
#.##.##.##.
#.##.##.##.
.###.###...

.#.##......
.#.##......
..##.##..##
....##.##.#
...###.##.#
##.##..##..
.##.##....#
##.#..#..#.
.#..#.....#

#..#.##..#..#..
#..#....#..##..
.##.#.#####.##.
####.#.##......
.##.##..##.....
#..#.###.###...
.##.........#..
#####..#.#.....
.##.#.#........
.....#..#....##
####.###..###..
#..#.##..#.##..
.##.###...#####

#..#.#.##..#..#
.##.#.###.....#
.##.#..##.#...#
########.#..##.
####.#.#####.##
....##...#.##..
....#.##.###.#.
..........#.#..
..........#.#..
....#.##.##..#.
....##...#.##..

..#####.####...#.
......#.#.###.##.
.##.#...#..#..###
.##.#...#..#..###
......#.#.###.##.
..#####.####...#.
#.####....#.#..#.
####.##..#.###.#.
..#..##.#..###..#
##....###.##.#.##
.##....###.##..#.
.##....###.##..#.
##....###.##.#.#.

..#.####.##......
....####.##......
.#.###.###.#....#
#.###..##########
....###.##.######
#......#.#.######
##...#..#..#.##.#

....#...##..#.#..
#..#....#....#..#
.#..##..#..#.#...
..#.#..#..#.##.##
.##...##.##..##..
.##...##.##..##..
..#.#..#..#.##.##
.#..##..#..#.#...
#..#....#....#..#
....#...##..#.#..
....##...#....###
.#..#.#.#..##..##
#...##..###....##
#...##..###....##
.#..#.#....##..##

..#..#.#..##.#..#
#.#.###..##.#.##.
..##..####..#####
.#.##..#...#.####
###.#.#..##.#####
###.#...#.###.##.
###.#.###..#..##.
#..#....#.##..#..
..###....#..##..#
#.#####.##.#.####
#.##.#...#..##..#
##.....###...#..#
#...##....#...##.
.###.#..#.#######
.###.#..#.#######

.##.#..
###....
#.#....
...#..#
#..####
###....
###....
#..####
...#..#

##.....#..#..
....##.####.#
....#.#.##.#.
.#.#.#......#
#....##....##
##..##.#..#.#
#.#.#..###...
####.##.##.##
####.##.##.##

......###....
...##.####.##
..#..######..
##..##....##.
###.#.#..#.#.
......#..#...
###..##..##..
##.##......##
.....######..
..####.##.###
.......##....
...#.#....#.#
..###......##
###.##....##.
##..#.####.#.
###.#..##..#.
...##.#..#.##

..#.##.#....#
..######....#
#..#..#..##..
....##.......
#..####..##..
..#....#....#
##.####.####.
#.#.##.#.##.#
#..#..#......
#.#....#.##.#
#..####..##..
##......####.
.##....##..##

#...#.#
#...#.#
####.#.
..##..#
.######
....#..
.##..#.
....#..
....#..
.##..##
....#..
.######
..##..#
####.#.
#...#.#

..##...#..##...##
.......#.#.##.#.#
......#..###.#.#.
......#####.#..##
##..##.#####..###
##..###.#.###.#.#
.......#.#.##..##
..##...#.#.#.##.#
##..##..#..##.#.#
##..####.##.#.###
##..###.#.#.##..#
.......#..#.##.#.
..##...##.#.#.###
##..##.######.#..
.#..#.##.##..##..
..##......##.#.##
..##..#..#.....#.

.#....####.
..#.#.####.
.#####....#
##...######
##.....##..
.#..#..##..
..##.#....#
#...###..##
#...###..##
..##.#....#
##..#..##..
##.....##..
##...######

.##.##..#
##...####
#...#..##
##....#..
....#..##
...#.####
...#.####
....#..##
##....#..

#.##..##.##..#.#.
#........##.#....
###....######..##
...####...#..###.
##......##....#..
..#.##.#...##.###
#........#.####..
#.#....#.#.#..##.
#.#....#.#.#..##.
#........#.####..
..#.##.#....#.###

......#..#.##..##
......#..#.##..##
#.#.##.....###.##
#..###....##.#..#
..#.##..###....#.
.#.#.#..##....##.
#.#....#.##...#.#
.##..###.#.#.##.#
.##..###.#.#.##.#
#.#....#.##...#.#
.#.#.#..##....##.
..#.##.####....#.
#..###....##.#..#
#.#.##.....###.##
......#..#.##..##

.#.###....###.###
....##.#.###....#
##....#.#.#.##...
##....#.#.#.##...
....##.#.###....#
.#.###....###.###
..#..#.#...##.#..
.#.#..#...####.##
#..#...#.###...##
.##.#.#.#..#..#.#
.##.#.#.#..#..#.#
#..#...#.###...##
...#..#...####.##
..#..#.#...##.#..
.#.###....###.###
....##.#.###....#
##....#.#.#.##...

##..##..####.
.#..#.#.####.
.####.#.#..#.
###.###.#..#.
##..##...##..
######..####.
......#.#..#.
.#..#........
##..##.######
######.##..##
.####..#....#

##...#..#...#
###.##..##.##
##..#####...#
..#........#.
..#.#.##.#.#.
##.#.####.#.#
......##.....
..#.##..##.#.
##.#.####.#.#
..###.##.###.
###...##...##
..#..#..#..#.
..#.#....#.#.
######..#####
.....#..#....
..#.#.##.#.#.
##...####...#

.##.##..#....#..#
.....####.##.####
.#...###......###
.#...............
.#...############
#.#......####....
.#.###..#....#..#
.#.#.#..#....#..#
#...#.##......##.
#.#.#.##.#..#.##.
..#...##..##..##.

.##...#.#
####...#.
#..#..#..
######.##
.....#.#.
....#..##
#..######
.#..##...
....##...
.....###.
.##...###
.##.#.###
.##.#.###

.#.##.######.##
.#.##.######.##
#..##.#.##.#.##
##..#.######.#.
.###..#....#..#
...#.#.######.#
..##.#.####.#.#

.##...##...
.##.#..#...
#....#.##..
.###..#.###
....#......
#.#.#...###
..####.#...
..####.#...
#.#.#...###
....#......
.###..#.###
#....#.##..
.##.#..#...
.#....##...
.##.#..##..

#.#.#..#.#.###..#
#####..##########
.#.#.##.#.#.#####
.#.#.##.#.#.##..#
###.#..#.########
.##..##..##.#....
###.####.########
.######.###..#..#
...#.##.#....####
#...#..#...###..#
###......###..##.
###.#..#.####....
..###..###..##..#
####....####..##.
#.##....##.###..#

.#...#....#...#.#
#.###......###.##
..#.##....##.#..#
..#.##....##.#..#
...#.##..##.#....
####.#....#.#####
###.#..##..#.####
..##...##...##..#
##..########..###
##..########..###
..##...##...##...
###.#..##..#.####
####.#....#.#####

..#.####.##.###
###..#.#....#.#
###..#.#....#.#
..#.####.##.###
##....##.##.##.
#.#.#.##.##.##.
##....#.####.#.
##......#..#..#
##..##.#....#.#
#..#...######..
###.#####..####

#......##.#.#..#.
#......#..#..##..
#......#..#.#..#.
#..##.###...#..#.
#......#.###.##.#
...##...####....#
.#.##.#.##..#..#.
..#..#..#....##..
...##....########
...##....#.#.##.#
###..#####.#.##.#

..#..####....
..####.#.#...
...##..#.#.#.
..#.#####...#
..#..###..#.#
....###...#.#
....###..##.#
..#..###..#.#
..#.#####...#
...##..#.#.#.
..####.#.#...
..#..####....
..#.#.#.##...
###.....###..
##.###...#..#

#.....#.#..#..#..
...#..#.##...#..#
.####.#.###..#.##
.####.#.###..#.##
...#..#.##...#..#
#.....#.#..#..#..
.##......#.#...#.
..#.#.##.....#...
.#...#.####.#..#.
.####.#.######.##
#..#.#...##...#.#
#..#.#...##...#.#
.####.#.######.##
.#...#.####.#..#.
..#.#.##.....#...
.##......#.#...#.
#.....#.#..##.#..

..#.#.#
..#.#.#
....##.
.##..#.
#..#.#.
....#.#
....#..
.....#.
....##.

.........#.
.#....#....
##....##.#.
#......##.#
.######...#
#.......###
.######..##
#..##..###.
#.#..#.#...
#.#..#.#...
#..##..###.

###..#.###.
##.##...#..
.#.#..###..
.#.###.####
.#.###.####
.#.#..###..
##.##...#..
###..#..##.
.####.#..#.
.##...###..
#...#.#.#.#
#...#.#.#.#
.##...###..

.#.#.#.....
...###.....
....#.#####
##..#......
.###..#####
##.....####
.###.#.####
.#.#..#....
.######....
....##.####
..##.#.....
#.###.#####
.##..##....
.#..##..##.
#.#...#....

..#.##.#..#
#.#....#.##
#.##..##.#.
#.##..##.#.
#.#....#.##
..#.##.#..#
..#....#...
..#######.#
.#.#..#.#.#

####..####..#
..##..#####.#
##..##....##.
..##..####..#
....#.#..#.#.
...#.######.#
...#..#..#..#

.###.####.###
.....####....
.###..##..###
...#......#..
.####.##.####
###..#..#..##
....#....#...
.###..##..###
#...######...
#...#.##.#...
..##.#..#.##.
...#.####.#..
.##.######.##
...#.####.#..
#....#..#....
.###.####.###
#...######...

###.####.#..#..
..##...##.#.#.#
##.#..###.##.##
..#.##.##.###.#
..###..###.##.#
......##..##.##
#####..#.##..#.
#####...#......
###....#.###.#.
.....#.##.#####
##..#.#.##...#.
........####.#.
........####.#.
##..#...##...#.
.....#.##.#####

..........####.
...##....#....#
.........##..##
#......##.####.
#...#..##..##..
.#....#...####.
........#######
#.####.###....#
##.##.###.####.
#......#.#....#
#......#.#.##.#

#######.##....#
##.#.##########
##..##.#..#..#.
###....#.#.##.#
######.#..#..#.
..###.##.##..##
##.##.#..#....#
##.#.##........
#..#..##.#....#
#.###..#..#..#.
#.#.#.###.####.
#.#.#####.####.
#.###..#..#..#.

##.###...#.##..#.
#.#....##.###.#..
.#.....#.###..#..
.#.....#.###..#..
#.#....##.###.##.
##.###...#.##..#.
..#.###...#..#.##
#.#.#.##.######..
#.#.#.##.######..
..#.###...#..#.##
##.###...#.##..#.
#.#....##.###.##.
.#.....#.###..#..

#.#.##..##.#.##..
##.#.####.#.##.##
.####....####.###
.#.###..###.#..##
.#.#......#.#..##
..#.#.##.#.#.....
.#...#..#...#.#..
.#######.####.###
#..#.#..#.#..####
.##.##..##.##....
..#........#..###
#..##....##..####
#.#..#..#..#.#...
..##.####.##.....
#####....#####...
##.########.##...
#.##......##.####

......###..##
#####.######.
.##...##.#.#.
########.##..
....#..#.....
.......###.#.
.##.##.###.#.
#..####..##.#
#..####..##.#
.##.##.###.#.
.......###.#.
....#..#.....
########.##..
.##...##...#.
#####.######.
......###..##
#########....

####...####
.###.#.....
.###.#.....
####...####
.####.##..#
.#..#######
#####...#.#
#.####.##..
#.#...#.##.
#.#####....
...###.#.##
#.#.#.#...#
##.#####.##
#...##.####
#...#..####

#..#..####..#
#######..####
.##..######..
#...#..##..#.
####.##..##.#
...###.##.###
##..##.##.##.
.#...##..##..
#.....####...
###...####...
.....#....#..
....########.
#.#.#..##..#.
#....#....#..
#.#..#....#..

.###.####..
.########..
.###..###.#
##########.
.###..###..
.###..###..
##########.
.###..###.#
.########..
.###.####..
#...##...##

#.#.###.#
#.#.###.#
###.#.###
...###...
..#..##.#
..#...#.#
#.#...#.#
..#..##.#
...###...

..##.#...
..##.#...
...##...#
..#..##..
.#.##.#..
#...##...
##..####.
#.###.#..
#.###.#..
#...####.
#...##...
.#.##.#..
..#..##..
...##...#
..##.#...

###..##...#.#####
.#.##.#..#.#.....
#.#####.#.####.##
.#.#..#.#.###.###
##.##.##....#...#
##.##.##....#...#
.#.#..#.#.###.###
#.#####.#.#######
.#.##.#..#.#.....
###..##...#.#####
...#......#.##..#
..#.##....#...###
......###..#.....
..#.##.#.#.....#.
..#.##.#.#.....#.

###.###.#
###.#....
##.#.###.
###.##.##
..#..#..#
######..#
##.###..#

.....#.########
..#.###..##.#.#
##..#...##..##.
##....#.#.#.#..
#####.####...##
#...#.#.#.##.##
#...#.#.#.##.##
#####.####...##
##....#.#.#.#..
##..#...##..##.
..#.#.#..##.#.#
.....#.########
.#....##...####
##.###..#..##.#
##.###..#..##.#

#########.#..####
...##...#..#.#.#.
##....##......#..
.........##..###.
#..##..###.#.##..
#..##..#.#.#.##..
.........##..###.
##....##......#..
...##...#..#.#.#.
#########.#..####
..####..#.#######

...####...##.
.##....##....
.########.##.
##.#..#.#####
####..#######
####..#.##..#
..#.##.#.....
##..##..##..#
#.##..##.#..#
##..##..##..#
#.######.#..#
.###..###....
#..#..#..#..#
....##....##.
#.######.#..#

.#.#...
#......
.#..#.#
..#..#.
..###..
#.#####
#...###
#...###
#.#####
..###..
..#....
.#..#.#
#......
.#.#...
#.#..#.
#.#..#.
.#.#...

####..##.....#.
....###.###....
#######.##.#...
.##..#..###.###
.##.##..####..#
.##.#..####.###
####.#..##.##..
.##.####.#.#.#.
....#.##.##..##
....#.##.##..##
.##.####.#.#.#.
####.#..#####..
.##.#..####.###

..####.....
##....####.
..#..#....#
#.####.##..
#.####.##..
#.####.#.##
.#....#...#
#......#.##
#.####.##..
..####..##.
..#..#..#.#
.#.##.#.##.
.#.##.#.##.
..#..#..###
..####..##.

#......##..
.#.##.#..##
.#....#..##
.#....#.#..
####.###.##
.######....
###..######
..####..#..
..#..#..#..
##....##...
##....##...
########.##
##....##...

##..###.####.
..##..#.#..#.
#########.#..
######.##..#.
######.....#.
######..#..#.
..##......#.#
##..####...#.
##########.#.
##..##.####..
..##...###...
......##.#.##
......###.###
#######.#####
######...#.##
#.##.###.##..
..##..###.#..

#..#.##.###
.##..##.#.#
.....#..#.#
#..##....#.
....#####..
.##.#......
....#..#...
.##.##....#
#..##.###.#
.......#.##
....#..#.##
#..##.###.#
.##.##....#`);