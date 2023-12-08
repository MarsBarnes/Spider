//Create pool of 104 cards
interface Card {
  val: number;
  visible: boolean;
}

let pool: Card[] = [];

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
let deck: Card[] = [];

function shuffle(pool) {
    while (pool.length) {
        let randomCard: Card = pool[Math.floor(Math.random() * pool.length - 1)];
        deck.push(randomCard);
        pool.splice(randomCard, 1);
    }
    console.log('pool' + pool)
    // console.log('deck' + ...deck)

    
}

shuffle(pool);
