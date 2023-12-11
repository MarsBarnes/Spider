import { grandArray } from "./script";

function App() {

// this is an alternate way to write the  nested map function
  // const divs = [];
  // for (let i = 0; i < grandArray.length; i++) {
  //   const col = grandArray[i];
  //   const row = [];
  //   for (let j = 0; j < col.length; j++) {
  //     const card = col[j];
  //     row.push(
  //       <div key={`${i}${j}`} className={`row${j} col${i}`}>
  //         <p>{card.val}</p>
  //       </div>
  //     );
  //   }
  //   divs.push(row);
  // }

  return (
    <>
      <h1>Spider Solitaire</h1>
      <main>
        <div className="flex"><div className="hold"></div></div>
        {/* <h1>{answer}</h1> */}
        <div className="grid">
          {/* {divs} */}

          {grandArray.map((col, i) =>
            col.map((card, j) => (
              <div key={`${i}${j}`} className={`row${j} col${i}`}>
                <p className={card.visible ? "" : "red"}>{card.val}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default App;
