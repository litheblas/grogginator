import {useState} from 'react';
import './App.css';

function App() {
  document.title = "Grogginator";
  
  const size = [4, 4, 4, 4, 6, 6, 6, 6, 8, 8, 10, 12];
  const color = ["röd", "gul", "grön", "blå", "svart", "rosa", "färglös"];
  const taste = ["god", "fruktig", "mjuk", "besk", "söt", "äcklig"];
  const adjective = ["skön", "trevlig", "busig", "spännande", "dansk", "heterogen", "homogen"];
  const thing = ["golvfest", "krock", "stövel", "emulsion", "käftsmäll", "dansk", "fegis"];
  const skit = ["god", "äcklig", "nasty", "vatten", "trevlig", "juice"];
  const text = ["våga dö", "inget tjaffs", "fisk", "billig"];

  const functions = [colorTaste, thingAdjective, skitDrink, textDrink, nobodyRemeber];

  const [drinkOrder, setDrinkOrder] = useState("");

  function getOrder(...array) {
    let order = "";
    array.forEach(array => {
      if (typeof array === 'string') {
        order += array;
      } else {
        order += array[Math.floor(Math.random() * array.length)];
      }
    })
    return order;
  }

  function callModel() {
    const model = functions[Math.floor(Math.random() * functions.length)];
    model();
  }

  function colorTaste() {
    const drink = getOrder("En ", size, " ", color, " och ", taste);
    setDrinkOrder(drink + "!");
  }

  function thingAdjective() {
    const drink = getOrder("En ", size, " ", adjective, " ", thing);
    setDrinkOrder(drink + "!");
  }

  function skitDrink() {
    const drink = getOrder("En ", size, " skit", skit);
    setDrinkOrder(drink + "!");
  }

  function textDrink() {
    const drink = getOrder("En ", size," ", text);
    setDrinkOrder(drink + "!");
  }

  function nobodyRemeber() {
    const drink = getOrder("En ", size, " ingen minns en ", thing);
    setDrinkOrder(drink + "!");
  }

  return (
    <div className="container">
      <div className="top">
        {drinkOrder}
      </div>
      <div className="bottom">
        <button onClick={() => callModel()}>Generera drink!</button>
      </div>
    </div>
  );
}

export default App;
