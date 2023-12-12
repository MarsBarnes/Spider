import React from "react";
import {
  Card,
  grandArray,
  dealFaceUp,
  deck,
  removeCompletedSets,
} from "./script";

function App() {
  const [_, render] = React.useReducer((x) => x + 1, 0);
  const [Holding, setHolding] = React.useState([] as Card[]);

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
      const cardSelection = col.splice(index);
      let isSequential: boolean = true;

      for (let i = 1; i < cardSelection.length; i++) {
        const previous: number = cardSelection[i-1].val;
        const current: number = cardSelection[i].val;
        if (current + 1 !== previous) {
          isSequential = false;
          break;
        }
      }

      //if card slice is sequential or there is only 1 card in the slice
      if (cardSelection.length === 1 || isSequential === true) {
        setHolding(cardSelection);
      }
      else {
        throw new Error("card selection must be sequential");
      }
    }
    //if holding is full- move cards to new column
    else {
      //if cardSelection can land on new col
      if (Holding[0].val + 1 === col[col.length - 1].val) {
        col.push(...Holding);
        setHolding([]);
        removeCompletedSets(col)

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
          {grandArray.map((col, i) =>
            col.map((card, j) => (
              <div key={`${i}${j}`} className={`cardDiv`} style={gridStyle(i, j)}>
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
            <div className={`hold cardDiv`}>
              <p>{card.val}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
