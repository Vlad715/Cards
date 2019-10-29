let container = document.querySelector('.container'); 
let btnRefresh = document.querySelector('.btn');

let spade = 'spade.png';
let club = 'club.png';
let diamond = 'diamond.png';
let heart = "heart.png";
let question = "question.png";

let arrField = [
    [spade, spade, club, diamond, club, club],
    [spade, spade, club, diamond, diamond, diamond],
    [spade, club, club, diamond, diamond, diamond],
    [spade, club, club, club, club, diamond],
    [heart, club, club, club, heart, heart],
    [heart, heart, club, club, diamond, club],
    [heart, heart, heart, spade, spade, club]
];

function makeObjCard(list) {

    newArr = list.map( (item) => {
         return (item.map( (el) => {
                return {
                    suit: el,
                    show: true
                };        
        }));       
    });

    return newArr;
}
makeObjCard(arrField);


function clearList() {
    container.innerHTML = '';   
}

function generateList(arr) {
    clearList();

    for ( let i = 0; i < arr.length; i++) {

        for ( let j = 0; j < arr[i].length; j++) {

            let div = document.createElement('div');
             if ( arr[i][j].show === true ) { div.className = "card" } else { div.className ="card selected"};

            div.insertAdjacentHTML('beforeend', `<img class="img" src=${ arr[i][j].suit || question }>`);

            container.appendChild(div);
        }       
    }  
}
generateList(newArr);

console.log(newArr);


btnRefresh.addEventListener('click', function (e) {
    generateList(newArr);
});


$('div').click(function(){
    return makeCoordinate($(this).index());
});


function makeCoordinate(num) {

    let x = Math.floor(num / 6);

    let y = Math.floor(num % 6);

    return findSuit(newArr, x, y);
}


function findSuit(arrOrig, rowCount, colCount) {

    let arrMod = JSON.parse(JSON.stringify(arrOrig));

    function getNeighbor(row, col) {

        let colMinus =  col === 0 ?  0 : col - 1;
        if ( arrMod[row][colMinus].suit === arrOrig[row][col].suit) { arrMod[row][colMinus].suit = null; getNeighbor(row, colMinus)};

        let colPlus = col === arrOrig.length ? arrOrig.length : col + 1;
        if ( arrMod[row][colPlus].suit === arrOrig[row][col].suit) { arrMod[row][colPlus].suit = null; getNeighbor(row, colPlus)};

        let rowMinus = row === 0 ? 0 : row - 1;
        if ( arrMod[rowMinus][col].suit === arrOrig[row][col].suit) { arrMod[rowMinus][col].suit = null; getNeighbor(rowMinus, col)};

        let rowPlus = row === arrOrig[1].length ? arrOrig[1].length : row + 1;
        if ( arrMod[rowPlus][col].suit === arrOrig[row][col].suit) { arrMod[rowPlus][col].suit = null; getNeighbor(rowPlus, col) };

        arrMod[row][col].suit = null;
    }

    getNeighbor(rowCount, colCount);

    return generateList(arrMod);
}








