let diamond = 'diamond';
let club = 'club';
let heart = 'heart';
let spade = 'spade';

let arrField = [
    [spade, spade, club, diamond, club, club],
    [spade, spade, club, diamond, diamond, diamond],
    [spade, club, club, diamond, diamond, diamond],
    [spade, club, club, club, club, diamond],
    [heart, club, club, club, heart, heart],
    [heart, heart, club, club, diamond, club],
    [heart, heart, heart, spade, spade, club]
];

function findSuit(arrOrig, rowCount, colCount) {

    let arrMod = JSON.parse(JSON.stringify(arrOrig));

    function getNeighbor(row, col) {

        let colMinus =  col === 0 ?  0 : col - 1;
        if ( arrMod[row][colMinus] === arrOrig[row][col]) { arrMod[row][colMinus] = null; getNeighbor(row, colMinus)};

        let colPlus = col === arrOrig.length ? arrOrig.length : col + 1;
        if ( arrMod[row][colPlus] === arrOrig[row][col]) { arrMod[row][colPlus] = null; getNeighbor(row, colPlus)};

        let rowMinus = row === 0 ? 0 : row - 1;
        if ( arrMod[rowMinus][col] === arrOrig[row][col]) { arrMod[rowMinus][col] = null; getNeighbor(rowMinus, col)};

        let rowPlus = row === arrOrig[1].length ? arrOrig[1].length : row + 1;
        if ( arrMod[rowPlus][col] === arrOrig[row][col]) { arrMod[rowPlus][col] = null; getNeighbor(rowPlus, col) };

        arrMod[row][col] = null;
    }

    getNeighbor(rowCount, colCount);

    return arrMod;
}

console.log(findSuit(arrField, 3, 5 ));

