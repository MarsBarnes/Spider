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

//deal 44 cards into 10 arrays
const col1 = [];
const col2 = [];
const col3 = [];
const col4 = [];
const col5 = [];
const col6 = [];
const col7 = [];
const col8 = [];
const col9 = [];
const col10 = [];

function dealFaceDown(deck: Card[]) {
  for (let i = 0; i < 44; i += 10) {
    console.log(i);
    col1.push(deck[i]);
    col2.push(deck[i + 1]);
    col3.push(deck[i + 2]);
    col4.push(deck[i + 3]);
    col5.push(deck[i + 4]);
    col6.push(deck[i + 5]);
    col7.push(deck[i + 6]);
    col8.push(deck[i + 7]);
    col9.push(deck[i + 8]);
    col10.push(deck[i + 9]);

    //pop from deck
  }
}

dealFaceDown(deck);
