import { matchDigits } from './util.mjs';

function solve(input) {
    const splitInput = input.split('\n');
    const winsForAllRaces = partOne(createRaces(splitInput));
    const winsForRace = partTwo(createRace(splitInput));
    console.log(`Part 1: ${winsForAllRaces}`);
    console.log(`Part 2: ${winsForRace}`);
}

function partOne(races) {
    const wins = [];
    races.forEach(race => wins.push(getPossibleWins(race)));
    return wins.reduce((acc, curr) => acc * curr);
}

function partTwo(race) {
    return getPossibleWins(race);
}

function createRace(rows) {
    const race = { time: 0, bestDistance: 0 };
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const number = Number(matchDigits(rows[i]).join(''));
        row[0] === 'T' ? (race.time = number) : (race.bestDistance = number);
    }
    return race;
}

function createRaces(rows) {
    const races = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const digits = matchDigits(row).map(Number);
        digits.forEach((d, i) => {
            row[0] === 'T'
                ? (races[i] = { time: d })
                : (races[i] = { ...races[i], bestDistance: d });
        });
    }
    return races;
}

function getPossibleWins(race) {
    let possibleWins = 0;
    for (let i = 0; i < race.time; i++) {
        let timeLeft = race.time - i;
        const speedInMs = i;
        const distanceMoved = timeLeft * speedInMs;
        if (distanceMoved > race.bestDistance) possibleWins++;
    }
    return possibleWins;
}