//Create pool of 104 cards
interface Card {
  val: number;
  visible: boolean;
}

const pool: Card[] = [];

for (let i = 1; i < 14; i++) {
  pool.push({ val: i, visible: false });
  pool.push({ val: i, visible: false });
  pool.push({ val: i, visible: false });
  pool.push({ val: i, visible: false });
  pool.push({ val: i, visible: false });
  pool.push({ val: i, visible: false });
  pool.push({ val: i, visible: false });
  pool.push({ val: i, visible: false });
}

// console.log(pool);
// console.log(pool.length);

//shuffle deck
const deck: Card[] = [];

function shuffle(pool: Card[]) {
  while (pool.length > 0) {
    const randomIndex = Math.floor(Math.random() * (pool.length - 1));
    const randomCard = pool[randomIndex];
    deck.push(randomCard);
    pool.splice(randomIndex, 1);
  }

  // console.log('deck' + JSON.stringify([deck]))
}

shuffle(pool);

//deal 44 cards into 10 arrays- 1 for each column
const col1: Card[] = [];
const col2: Card[] = [];
const col3: Card[] = [];
const col4: Card[] = [];
const col5: Card[] = [];
const col6: Card[] = [];
const col7: Card[] = [];
const col8: Card[] = [];
const col9: Card[] = [];
const col10: Card[] = [];

//put all col arrays into 1 grand array

const grandArray: Card[][] = [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10 ]


//deal 44 cards facedown
function dealFaceDown(deck: Card[]) {
  let j: number = 0
  for (let i = 0; i < 44; i++) {
    grandArray[j].push(deck[0])
    j = (j + 1) % 10;
    deck.shift()
  }
}

dealFaceDown(deck);
// console.log(grandArray)

//deal 10 cards faceup
function dealFaceUp(deck: Card[]): Card[] {
  let j: number = 0;
  for (let i = 0; i < 10; i++) {
    deck[0].visible = true;
    grandArray[j].push(deck[0])
    j = (j + 1) % 10;
    deck.shift()
    console.log(deck[0]);
  }
  return deck
}
dealFaceUp(deck);
console.log(grandArray);

let completedSets = 0;
//look for 1-13 in array and remove from column
function removeCompletedSets(col: Card[]): Card[]{
  if (col.length > 12 && col[col.length - 1].val === 1) {
    let j: number = 0;
    for (let i = col.length - 1; i >= 0; i--){
      j++;
      
      if (col[i].val !== j) {
        return col;
      }
      if (j === 13) {
        completedSets++
        col.splice(i);
        return col
      }
    }
  }
}

function isEndGame(): 'win' | 'lose' | 'continue' {
  //win condition
  if (completedSets === 8) {
    console.log('you win')
    return 'win';
  } 
  //loose conditions
  if (deck.length === 0) {
    //TODO: Write loose conditions
    //0. check that no cols are empty
    for (col of grandArray) {
      if (col.length === 0) {
        return 'continue';
      }
    }

    //1. get longest movable section from each col
    

    //2. for each column, check if the top of the col's movable section could be connected to the bottom of any other col's movable section

    console.log('you lose')
    return 'lose';
  }
}

if (isEndGame() === '') {

}

export { grandArray };
export { Card };
export { dealFaceUp };
export { deck };
export { removeCompletedSets };