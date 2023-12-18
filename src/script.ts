//Create pool of 104 cards
interface Card {
  val: number;
  visible: boolean;
  id: number;
}

const pool: Card[] = [];

for (let i = 1; i < 14; i++) {
  pool.push({ val: i, visible: false, id: i + 0 });
  pool.push({ val: i, visible: false, id: i+1 });
  pool.push({ val: i, visible: false, id: i+2 });
  pool.push({ val: i, visible: false, id: i+3 });
  pool.push({ val: i, visible: false, id: i+4 });
  pool.push({ val: i, visible: false, id: i+5 });
  pool.push({ val: i, visible: false, id: i+6 });
  pool.push({ val: i, visible: false, id: i+7 });
}

console.log(pool);
console.log(pool.length);

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

const grandArray: Card[][] = [
  col1,
  col2,
  col3,
  col4,
  col5,
  col6,
  col7,
  col8,
  col9,
  col10,
];

//deal 44 cards facedown
function dealFaceDown(deck: Card[]) {
  let j: number = 0;
  for (let i = 0; i < 44; i++) {
    grandArray[j].push(deck[0]);
    j = (j + 1) % 10;
    deck.shift();
  }
}

dealFaceDown(deck);
// console.log(grandArray)

//deal 10 cards faceup
function dealFaceUp(deck: Card[]): Card[] {
  let j: number = 0;
  for (let i = 0; i < 10; i++) {
    deck[0].visible = true;
    grandArray[j].push(deck[0]);
    j = (j + 1) % 10;
    deck.shift();
    // console.log(deck[0]);
  }

  return deck;
}
dealFaceUp(deck);
// console.log(grandArray);

let completedSets = 0;
//look for 1-13 in array and remove from column
function removeCompletedSets(col: Card[]): Card[] {
  if (col.length > 12 && col[col.length - 1].val === 1) {
    let j: number = 0;
    for (let i = col.length - 1; i >= 0; i--) {
      j++;

      if (col[i].val !== j) {
        return col;
      }
      if (j === 13) {
        completedSets++;
        col.splice(i);
        if (col.length) {
          col[col.length - 1].visible = true;
        }
        //check for win
        if (completedSets === 8) {
          window.alert("you win");
        }
        return col;
      }
    }
  }
}

export function loseOrContinue(): "lose" | "continue" {
  //loose conditions
  if (deck.length === 0) {
    //0. check that no cols are empty
    for (const col of grandArray) {
      if (col.length === 0) {
        return "continue";
      }
      let largestNumberInSequence = 100;
      //1. get largestNumberInSequence in the movable section from each col
      for (let card = col.length - 1; card >= 0; card--) {
        const currentCard = col[card];
        largestNumberInSequence = currentCard.val;
        const nextCard = col[card - 1];
        if (nextCard && nextCard.visible === true) {
          if (currentCard.val + 1 === nextCard.val) {
            largestNumberInSequence = nextCard.val;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      console.log(largestNumberInSequence);
      //2. for each column, check the last value in each column array to see if it is one more that the largestNumberInSequence (aka could be connected)
      for (const array of grandArray) {
        if (array[array.length - 1].val === largestNumberInSequence + 1) {
          return "continue";
        }
      }
    }
    window.alert("you lose");
    return "lose";
  }
  return "continue";
}
window.loseOrContinue = loseOrContinue;

export { grandArray };
export { Card };
export { dealFaceUp };
export { deck };
export { removeCompletedSets };
