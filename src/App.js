import { useState } from 'react';
import './App.css';

function App() {
  document.title = "Grogginator";

  const size = [4, 4, 4, 4, 4, 6, 6, 6, 6, 8, 8, 8, 10, 10, 12];
  const color = ["röd", "gul", "grön", "blå", "svart", "rosa", "färglös"];
  const taste = ["god", "fruktig", "mjuk", "besk", "söt", "äcklig", "frisk", "tropisk", "apelsin"];
  const adjective = ["skön", "trevlig", "busig", "spännande", "dansk", "heterogen", "homogen", "apelsinig"];
  const thing = ["golvfest", "emulsion", "käftsmäll", "dansk", "fegis", "sommar", "kökkenmödding"];
  const skit = ["god", "äcklig", "nasty", "vatten", "trevlig", "juice", " på dig"];
  const text = ["våga dö", "inget tjaffs", "fisk", "billig", "hondra prrocent", "swedish tequila",
    "baren bestämmer", "du har blivit barstoppad! Ställ dig sist i kön"];

  const color_taste = color.length * taste.length;
  const thing_adjective = adjective.length * thing.length;
  const skit_drink = skit.length;
  const test_drink = text.length;
  const nobody_remeber = thing.length;
  const one_thing = thing.length;

  const total_comb = 5 * (color_taste + thing_adjective + skit_drink + test_drink + nobody_remeber + one_thing);

  const [drinkOrder, setDrinkOrder] = useState("");
  const [probability, setProbability] = useState(0);
  const [rarity, setRarity] = useState("");
  let sizeprob = 0;


  function getOrder(...array) {
    let order = "";
    array.forEach(array => {
      if (typeof array === 'string') {
        order += array;
      } else {
        order += array[Math.floor(Math.random() * array.length)];
      }
    })

    const drinkSizeProb = getSizeAndProb();
    sizeprob = drinkSizeProb[1];

    return `En ${drinkSizeProb[0]}:a ` + order;
  }

  function getSizeAndProb() {
    const drinksize = size[Math.floor(Math.random() * size.length)];

    // calculate size prob
    if (drinksize === 4)
      return [4, 5 / 15]
    else if (drinksize === 6)
      return [6, 4 / 15]
    else if (drinksize === 8)
      return [8, 3 / 15]
    else if (drinksize === 10)
      return [10, 2 / 15]
    else if (drinksize === 12)
      return [12, 1 / 15]
  }

  function callModel() {
    const randnr = Math.random();
    //console.log("Random nr: ", randnr);
    let probability = 0;

    // Calls corresponding function for random number and calculates probability
    if (0 <= randnr && randnr < 0.2) { // colorTaste
      functions[0]();
      probability = 0.2 * 1 / (color.length * taste.length);

    } else if (0.2 <= randnr && randnr < 0.4) { // thingAdjective
      functions[1]();
      probability = 0.2 * 1 / (adjective.length * thing.length);

    } else if (0.4 <= randnr && randnr < 0.55) { // skitDrink
      functions[2]();
      probability = 0.15 * 1 / (skit.length);

    } else if (0.55 <= randnr && randnr < 0.65) { // textDrink
      functions[3]();
      probability = 0.10 * 1 / (text.length);

    } else if (0.65 <= randnr && randnr < 0.8) { // nobodyRemeber
      functions[4]();
      probability = 0.15 * 1 / (thing.length);

    } else if (0.8 <= randnr && randnr <= 1) { // oneThing
      functions[5]();
      probability = 0.2 * 1 / (thing.length);

    } else {
      functions[0]();
      probability = 0.2 * 1 / (color.length * taste.length);
      //console.log("Should not happen, colorTaste")
    }
    const prob = probability * sizeprob * 100;
    calculateRarity(prob)
    setProbability(prob.toFixed(2));
    return (prob)
  }

  function calculateRarity(prob) {
    if(prob > 0.2)
      setRarity("Common")
    else if(prob > 0.08)
      setRarity("Rare")
    else if(prob > 0.04)
      setRarity("Epic")
    else if(prob > 0)
      setRarity("Legendary")
    else
      setRarity("Common")
  }

  // 0 -> 20%   (20%)
  const colorTaste = () => setDrinkOrder(getOrder(color, " och ", taste, "!"));
  // 20 -> 40%  (20%)
  const thingAdjective = () => setDrinkOrder(getOrder(adjective, " ", thing, "!"));
  // 40 -> 55%  (15%)
  const skitDrink = () => setDrinkOrder(getOrder("skit", skit, "!"));
  // 55 -> 65%  (10%)
  const textDrink = () => setDrinkOrder(getOrder(text, "!"));
  // 65 -> 80%  (15%)
  const nobodyRemeber = () => setDrinkOrder(getOrder("ingen minns en ", thing, "!"));
  // 80 -> 100% (20%)
  const oneThing = () => setDrinkOrder(getOrder(thing, "!"));

  const functions = [colorTaste, thingAdjective, skitDrink, textDrink, nobodyRemeber, oneThing];

  function manyRuns() {
    let probarray = [];
    for (let index = 0; index < 100000; index++) {
      probarray.push(callModel());
    }
    console.log("Max: ", Math.max(...probarray))
    console.log("Max: ", Math.min(...probarray))
    console.log(probarray)
  }

  return (
    <div className="container">
      <div className="top">
        {drinkOrder}
        <div className='prob'>
          <p>{probability ? `\nDrinksannolikhet: ${probability} %` : ""} {rarity}</p>
          Totalt {total_comb} olika drinkbeställningar!
        </div>
      </div>
      <div className="bottom">
        <button onClick={() => callModel()}>Generera drink!</button>
      </div>
    </div>
  );
}

export default App;
