const solve = input => {
    const digitDict = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };
    const digitRegex = /\d/g;
    const stringRegex = /one|two|three|four|five|six|seven|eight|nine/g;

    let result = 0;
    input.split('\n').forEach(element => {
        let matches = [];
        let calibrationValue = '';
        while ((m = stringRegex.exec(element)) !== null) {
            matches.push(m);
            stringRegex.lastIndex = m.index + 1;
        }
        const digitMatches = [...element.matchAll(digitRegex)];
        matches = [...matches, ...digitMatches]
            .map(e => {
                const returnValue = {
                    digit: '',
                    index: 0,
                };
                if (digitDict.hasOwnProperty(e[0]))
                    returnValue.digit = digitDict[e[0]];
                else returnValue.digit = e[0];
                returnValue.index = e.index;
                return returnValue;
            })
            .sort((a, b) => a.index - b.index);

        calibrationValue = matches[0].digit + matches[matches.length - 1].digit;
        result += Number(calibrationValue);
    });
    return result;
};
