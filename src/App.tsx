import React from "react";
import {
  Card,
  grandArray,
  dealFaceUp,
  deck,
  removeCompletedSets,
  checkForEmptyCols,
  checkForZeros,
} from "./script";

function App() {
  const [_, render] = React.useReducer((x) => x + 1, 0);
  const [Holding, setHolding] = React.useState([] as Card[]);
  let cardSelection: Card[] = [];
  const [prevCol, setPrevCol] = React.useState([] as Card[]);
  //let prevCol: Card[];

  function cardClick(col: Card[], card: Card) {
    //if holding is empty- move cards to holding column
    if (Holding.length === 0) {
      console.log(
        `cards in column: ${JSON.stringify(
          col
        )}, card selected: ${JSON.stringify(card)}`
      );

      //determine if the cardSelection is sequential:
      //select the last occurence of card value in the col and update holding
      const index = col.lastIndexOf(card);
      cardSelection = col.splice(index);
      let isSequential: boolean = true;

      for (let i = 1; i < cardSelection.length; i++) {
        const previous: number = cardSelection[i - 1].val;
        const current: number = cardSelection[i].val;
        if (current + 1 !== previous) {
          isSequential = false;
          break;
        }
      }

      //if card slice is sequential or there is only 1 card in the slice
      if (cardSelection.length === 1 || isSequential === true) {
        setHolding(cardSelection);
        setPrevCol(col);
        cardSelection = [];
      } else {
        col.push(...cardSelection);
        cardSelection = [];
        throw new Error("card selection must be sequential");
      }
    }
    //if holding is full- move cards to new column
    else {
      //if cardSelection can land on new col
      if (Holding[0].val + 1 === col[col.length - 1].val || col.length === 0) {
        col.push(...Holding);
        setHolding([]);
        removeCompletedSets(col);
      } else {
        throw new Error("these cards can't go on this column");
      }
    }
  }

  function deckClick() {
    dealFaceUp(deck);
    //map through all cols in grand array to see if any sets were completed by the dealFaceUp
    //have not tested this function yet
    render();
    grandArray.map((col) => removeCompletedSets(col));
    render();
  }

  function gridStyle(i: number, j: number) {
    return {
      gridColumn: `${i + 1} / ${i + 2}`,
      gridRow: `${j + 1} / ${j + 2}`,
    };
  }

  function holdingClick() {
    console.log("prevCol" + JSON.stringify(prevCol));
    console.log("Holding" + JSON.stringify(Holding));

    //prevCol.push(...Holding);
    Holding.map((card) => prevCol.push(card));
    setHolding([]);
    render();
  }

  function emptyColClick(col: Card[]) {
    console.log("prevCol" + JSON.stringify(col));
    console.log("Holding" + JSON.stringify(Holding));
    // if (Holding.length > 0) {
    //   Holding.map((card) => col.push(card));
    // }
    col.push(...Holding);
    setHolding([]);
    removeCompletedSets(col);
  }

  return (
    <>
      <div className="flex">
        <h1>Spider Solitaire</h1>

        <div className={deck.length === 0 ? "deck hide" : "deck"}>
          <p onClick={() => deckClick()}>Deck</p>
        </div>
      </div>
      <main>
        {/* <div className="flex">
          <div className="hold"></div>
        </div> */}
        <div className="grid">
          <div className="cardDiv sendToBack" style={gridStyle(0, 0)} onClick={() => emptyColClick(grandArray[0])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(1, 0)} onClick={() => emptyColClick(grandArray[1])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(2, 0)} onClick={() => emptyColClick(grandArray[2])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(3, 0)} onClick={() => emptyColClick(grandArray[3])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(4, 0)} onClick={() => emptyColClick(grandArray[4])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(5, 0)} onClick={() => emptyColClick(grandArray[5])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(6, 0)} onClick={() => emptyColClick(grandArray[6])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(7, 0)} onClick={() => emptyColClick(grandArray[7])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(8, 0)} onClick={() => emptyColClick(grandArray[8])}></div>
          <div className="cardDiv sendToBack" style={gridStyle(9, 0)} onClick={() => emptyColClick(grandArray[9])}></div>
          {grandArray.map((col, i) =>
            col.map((card, j) => (
              <div
                key={`${i}${j}`}
                className={`cardDiv`}
                style={gridStyle(i, j)}
              >
                <p
                  className={card.visible ? "" : "red"}
                  onClick={() => cardClick(col, card)}
                >
                  {card.val}
                </p>
              </div>
            ))
          )}
          {Holding.map((card) => (
            <div className={`hold cardDiv`} onClick={() => holdingClick()}>
              <p>{card.val}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
