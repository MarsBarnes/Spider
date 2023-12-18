import { useDrag } from "react-dnd";
import React from "react";
import { Card, removeCompletedSets, loseOrContinue } from "./script";
import { useDrop } from "react-dnd";

type CardImageProps = {
  i: number;
  j: number;
  card: Card;
  col: Card[];
};

function CardImage({ i, j, card, col }: CardImageProps) {
  const [Holding, setHolding] = React.useState([] as Card[]);
  let cardSelection: Card[] = [];
  const [prevCol, setPrevCol] = React.useState([] as Card[]);

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

  function gridStyle(i: number, j: number) {
    return {
      gridColumn: `${i + 1} / ${i + 2}`,
      gridRow: `${j + 1} / ${j + 2}`,
    };
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: card,
    canDrag: () => false,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop<Card>(() => ({
    accept: "image",
    drop: (item) => addCardToGrandArray(item),
    canDrop: (item) => {
      console.log(item.val, card.val);
      return item.val === card.val - 1;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addCardToGrandArray = (droppedCard: Card) => {
    console.log(droppedCard);
    col.push(droppedCard);
    removeCompletedSets(col);
  };

  return (
    <div
      ref={drop}
      key={`${i}${j}`}
      className={`cardDiv`}
      style={gridStyle(i, j)}
    >
      <img
        ref={drag}
        // src={`/${card.val}.svg`}
        src={card.visible ? `/${card.val}.svg` : `/public/0.svg`}
        alt={`${card.val}`}
        className="card"
        onClick={() => cardClick(col, card)}
        style={{ border: isDragging ? "5px solid pink" : "0px" }}
      />
    </div>
  );
}

export { CardImage };
