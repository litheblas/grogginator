import { useState, useTransition } from 'react';
import './App.css';

function App() {
  document.title = "Grogginator";

  const size = [4, 4, 4, 4, 4, 6, 6, 6, 6, 8, 8, 8, 10, 10, 12];
  const vågadösize = [16, 20, 24];

  const color = ["röd", "gul", "grön", "blå", "svart", "rosa", "färglös"];
  const taste = ["god", "fruktig", "mjuk", "besk", "söt", "äcklig", "frisk", "tropisk", "apelsin", "banan"];
  const adjective = ["skön", "trevlig", "busig", "spännande", "dansk", "heterogen", "homogen", "apelsinig", "split"];
  const thing = ["golvfest", "emulsion", "käftsmäll", "dansk", "fegis", "sommar", "kökkenmödding"];
  const skit = ["god", "äcklig", "nasty", "vatten", "trevlig", "juice", " på dig"];
  const text = ["inget tjaffs", "fisk", "hondra prrocent", "swedish tequila",
    "baren bestämmer", "gin och tonic", "du har blivit barstoppad! Ställ dig sist i kön"];

  const color_taste = color.length * taste.length;
  const thing_adjective = adjective.length * thing.length;
  const skit_drink = skit.length;
  const test_drink = text.length;
  const nobody_remeber = thing.length;
  const one_thing = thing.length;
  const våga_dö = vågadösize.length;

  const total_comb = 5 * (color_taste + thing_adjective + skit_drink + test_drink + nobody_remeber + one_thing) + 3*våga_dö;

  const [drinkOrder, setDrinkOrder] = useState("");
  const [probability, setProbability] = useState(0);
  const [rarity, setRarity] = useState("");
  const [rarityStyle, setRarityStyle] = useState("Common")
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

  function vågaDögetOrder(...array) {
    let order = "";
    array.forEach(array => {
      if (typeof array === 'string') {
        order += array;
      } else {
        order += array[Math.floor(Math.random() * array.length)];
      }
    })
    const drinkSize = vågadösize[Math.floor(Math.random() * vågadösize.length)];
    sizeprob = 1/4;
    return `En ${drinkSize}:a ` + order;
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
    let prob = 0;

    // Calls corresponding function for random number and calculates probability
    if (0 <= randnr && randnr < 0.35) { // colorTaste
      functions[0]();
      prob = 0.35 * 1 / (color.length * taste.length);
      setRarity("Everywhere")
      setRarityStyle("Everywhere")

    } else if (0.35 <= randnr && randnr < 0.6) { // thingAdjective
      functions[1]();
      prob = 0.25 * 1 / (adjective.length * thing.length);
      setRarity("Common")
      setRarityStyle("Common")

    } else if (0.6 <= randnr && randnr < 0.8) { // skitDrink
      functions[2]();
      prob = 0.2 * 1 / (thing.length);
      setRarity("Uncommon")
      setRarityStyle("Uncommon")

    } else if (0.8 <= randnr && randnr < 0.9) { // textDrink
      functions[3]();
      prob = 0.1 * 1 / (skit.length);
      setRarity("Very Uncommon")
      setRarityStyle("VeryUncommon")

    } else if (0.9 <= randnr && randnr < 0.96) { // nobodyRemeber
      functions[4]();
      prob = 0.06 * 1 / (thing.length);
      setRarity("Rare")
      setRarityStyle("Rare")

    } else if (0.96 <= randnr && randnr < 0.99) { // oneThing
      functions[5]();
      prob = 0.03 * 1 / (text.length);
      setRarity("Epic")
      setRarityStyle("Epic")
    
    } else if (0.99 <= randnr && randnr <= 1) {
      functions[6]();
      prob = 0.01 * 1 / vågadösize.length;
      setRarity("LEGENDARY")
      setRarityStyle("Legendary blinking")
    
    } else {
      functions[0]();
      prob = 0.35 * 1 / (color.length * taste.length);
      setRarity("Common")
      setRarityStyle("Common")
      console.log("Should not happen, colorTaste")
    }
    prob = prob * sizeprob * 100;
    setProbability(prob.toFixed(2));
    return (prob)
  }

  // 0 -> 35%   (35%)
  const colorTaste = () => setDrinkOrder(getOrder(color, " och ", taste, "!"));
  // 35 -> 60%  (25%)
  const thingAdjective = () => setDrinkOrder(getOrder(adjective, " ", thing, "!"));
  // 60 -> 80% (20%)
  const oneThing = () => setDrinkOrder(getOrder(thing, "!"));
  // 80 -> 90%  (10%)
  const skitDrink = () => setDrinkOrder(getOrder("skit", skit, "!"));
  // 90 -> 96%  (6%)
  const nobodyRemeber = () => setDrinkOrder(getOrder("ingen minns en ", thing, "!"));
  // 96 -> 99%  (3%)
  const textDrink = () => setDrinkOrder(getOrder(text, "!"));
  // 99 -> 100% (1%)
  const vågaDö = () => setDrinkOrder(vågaDögetOrder("våga dö!"))


  const functions = [colorTaste, thingAdjective, oneThing, skitDrink, nobodyRemeber, textDrink, vågaDö];

  return (
    <div className="container">
      <div className="top">
        <p>{drinkOrder}</p>
        <div className='stats'>
          <p className={`${rarityStyle}`}>{rarity}</p>
          <p style={{"fontSize":25}}>{probability ? `\nDrinksannolikhet: ${probability} %` : ""}</p>
          Det finns {total_comb} olika drinkbeställningar!
        </div>
      </div>
      <div className="bottom">
        <button onClick={() => callModel()}>Generera drink!</button>
      </div>
    </div>
  );
}

export default App;
