import React from "react";
import {
  Card,
  grandArray,
  dealFaceUp,
  deck,
  removeCompletedSets,
  loseOrContinue,
} from "./script";

function App() {
  const [_, render] = React.useReducer((x) => x + 1, 0);
  const [Holding, setHolding] = React.useState([] as Card[]);
  let cardSelection: Card[] = [];
  const [prevCol, setPrevCol] = React.useState([] as Card[]);
  const emptyCol = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [coords, setCoords] = React.useState({
    x: 0,
    y: 0
  });

  function cardClick(col: Card[], card: Card) {
    //if card is not visible, exit
    if (card.visible === false) {
      throw new Error("can not select face down cards");
    }

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
        if (prevCol[prevCol.length - 1]) {
          prevCol[prevCol.length - 1].visible = true;
        }
        loseOrContinue();
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
    loseOrContinue();
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
    //prevCol.push(...Holding); Why does this not work, but the map function does?
    Holding.map((card) => prevCol.push(card));
    setHolding([]);
    render();
  }

  function emptyColClick(col: Card[]) {
    col.push(...Holding);
    if (prevCol[prevCol.length - 1]) {
      prevCol[prevCol.length - 1].visible = true;
    }
    setHolding([]);
    removeCompletedSets(col);
    loseOrContinue();
  }

  const handleMouseMove: React.MouseEventHandler<HTMLElement> = (e) => {
    // console.log(e.clientX, e.clientY);
    setCoords({ x: e.clientX, y: e.clientY});
  };

  return (
    <div className="screenSize" onMouseMove={handleMouseMove}>
      <div className="topBar">
        <h1>Spider Solitaire</h1>

        <div className={deck.length === 0 ? "deck hide" : "deck"}>
          <img
            src={`/0.svg`}
            alt={`deck`}
            className="card"
            onClick={() => deckClick()}
          />
        </div>
      </div>
      <main className="center">
        <div className="grid">
          {emptyCol.map((num) => (
            <div style={gridStyle(num, 0)} className="cardDiv">
              <img
                src={`/empty.svg`}
                alt={`empty`}
                className="card"
                onClick={() => emptyColClick(grandArray[num])}
              />
            </div>
          ))}

          {grandArray.map((col, i) =>
            col.map((card, j) => (
              <div
                key={`${i}${j}`}
                className={`cardDiv`}
                style={gridStyle(i, j)}
              >
                <img
                  // src={`/${card.val}.svg`}
                  src={card.visible ? `/${card.val}.svg` : `/0.svg`}
                  alt={`${card.val}`}
                  className="card"
                  onClick={() => cardClick(col, card)}
                />
              </div>
            ))
          )}
          {Holding.map((card) => (
            <div className={`hold cardDiv`} onClick={() => holdingClick()}>
              <img
                src={card.visible ? `/${card.val}.svg` : `/0.svg`}
                alt={`${card.val}`}
                className="card"
              />
            </div>
          ))}
        </div>
      </main>
      <div
        className="mousePointer"
        style={{ left: coords.x, top: coords.y }}
      ></div>
    </div>
  );
}

export default App;
