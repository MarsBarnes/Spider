//Create pool of 104 cards
let pool = [];

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
let deck = [];

function shuffle(pool) {
    while (pool.length > 0) {
      let randomIndex = Math.floor(Math.random() * (pool.length - 1))
      let randomCard = pool[randomIndex];
      deck.push(randomCard);
      pool.splice(randomIndex, 1);
  }
    // console.log('deck' + JSON.stringify([deck]))

}

shuffle(pool);

//deal 44 cards into 10 arrays
let col1 = []
let col2 = [];
let col3 = [];
let col4 = [];
let col5 = [];
let col6 = [];
let col7 = [];
let col8 = [];
let col9 = [];
let col10 = [];


function dealFaceDown(deck) {
    for (let i = 0; i < 44; i += 10){
        console.log(i)
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

dealFaceDown(deck)
