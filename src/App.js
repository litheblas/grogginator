import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { constClass as cons } from './words';
import CountDown from 'react-countdown';


export default function GenerateDrink() {
  
  let sizeprob = 0;
  const wantedDelay = 60 * 1000; // 1 min
  const [drinkOrder, setDrinkOrder] = useState("");
  const [probability, setProbability] = useState(0);
  const [rarity, setRarity] = useState("");
  const [rarityStyle, setRarityStyle] = useState("Common")
  const [date, setDate] = useState({ date: Date.now(), delay: 0 });

  const getLocalStorageValue = (s) => localStorage.getItem(s);


  // Check if user reloaded page and restore timer
  useEffect(() => {
    const futureDate = getLocalStorageValue("end_date");
    if (futureDate != null && !isNaN(futureDate)) {
      const currentTime = Date.now();
      const delta = parseInt(futureDate, 10) - currentTime;
      //Do you reach the end?
      if (delta > wantedDelay) {
        //Yes we clear our saved end date
        if (localStorage.getItem("end_date").length > 0)
          localStorage.removeItem("end_date");
      } else {
        //No update the end date  
        setDrinkOrder("Du kan inte spamma fram drinkar!")
        setRarity("Fuskare")
        setRarityStyle("Common")
        setDate({ date: currentTime, delay: delta });
      }
    }
  }, []);


  const Timer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <div className="bottom">
          <button onClick={() => {localStorage.removeItem("end_date"); callModel(); setDate({ date: Date.now(), delay: wantedDelay }) }}>Generera drink!</button>
        </div>
      )
    } else {
      // Render a countdown
      return (
        <div className="bottom">
          <p>Var vänlig vänta {minutes}:{seconds} min på nästa drink!</p>
        </div>
      )
    }
  };


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
    const drinkSize = cons.vågadösize[Math.floor(Math.random() * cons.vågadösize.length)];
    sizeprob = 1 / 4;
    return `En ${drinkSize}:a ` + order;
  }

  function getSizeAndProb() {
    const drinksize = cons.size[Math.floor(Math.random() * cons.size.length)];

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

  const callModel = () => {
    const randnr = Math.random();
    let prob = 0;
    console.log("random nr: ",randnr)

    // Calls corresponding function for random number and calculates probability
    if (0 <= randnr && randnr < 0.25) { // colorTaste
      functions[0]();
      prob = 0.25 * 1 / (cons.color.length * cons.taste.length);
      setRarity("Everywhere")
      setRarityStyle("Everywhere")

    } else if (0.25 <= randnr && randnr < 0.47) { // thingAdjective
      functions[1]();
      prob = 0.22 * 1 / (cons.adjective.length * cons.thing.length);
      setRarity("Common")
      setRarityStyle("Common")

    } else if (0.47 <= randnr && randnr < 0.67) { // skitDrink
      functions[2]();
      prob = 0.20 * 1 / (cons.thing.length);
      setRarity("Uncommon")
      setRarityStyle("Uncommon")

    } else if (0.67 <= randnr && randnr < 0.82) { // textDrink
      functions[3]();
      prob = 0.15 * 1 / (cons.skit.length);
      setRarity("Very Uncommon")
      setRarityStyle("VeryUncommon")

    } else if (0.82 <= randnr && randnr < 0.92) { // nobodyRemeber
      functions[4]();
      prob = 0.10 * 1 / (cons.thing.length);
      setRarity("Rare")
      setRarityStyle("Rare")

    } else if (0.92 <= randnr && randnr < 0.98) { // oneThing
      functions[5]();
      prob = 0.06 * 1 / (cons.text.length);
      setRarity("Epic")
      setRarityStyle("Epic epicAnim")
    
    } else if (0.98 <= randnr && randnr <= 1) {
      functions[6]();
      prob = 0.02 * 1 / cons.vågadösize.length;
      setRarity("LEGENDARY")
      setRarityStyle("Legendary legendAnim")
    
    } else {
      functions[0]();
      prob = 0.25 * 1 / (cons.color.length * cons.taste.length);
      setRarity("Common")
      setRarityStyle("Common")
      console.log("Should not happen, colorTaste")
    }
    prob = prob * sizeprob * 100;
    setProbability(prob.toFixed(4)); // set percentage decimals
    return (prob)
  }

  // 0 -> 25%   (25%)
  const colorTaste = () => setDrinkOrder(getOrder(cons.color, " och ", cons.taste, "!"));
  // 25 -> 47%  (22%)
  const thingAdjective = () => setDrinkOrder(getOrder(cons.adjective, " ", cons.thing, "!"));
  // 47 -> 67% (20%)
  const oneThing = () => setDrinkOrder(getOrder(cons.thing, "!"));
  // 67 -> 82%  (15%)
  const skitDrink = () => setDrinkOrder(getOrder("skit", cons.skit, "!"));
  // 82 -> 92%  (10%)
  const nobodyRemeber = () => setDrinkOrder(getOrder("ingen minns en: ", cons.thing, "!"));
  // 92 -> 98%  (6%)
  const textDrink = () => setDrinkOrder(getOrder(cons.text, "!"));
  // 98 -> 100% (2%)
  const vågaDö = () => setDrinkOrder(vågaDögetOrder("våga dö!"))


  const functions = [colorTaste, thingAdjective, oneThing, skitDrink, nobodyRemeber, textDrink, vågaDö];

  return (
    <div className="container">
      <div className="top">
        <p>{drinkOrder}</p>
        <div className='stats'>
          <p className={`${rarityStyle}`}>{rarity}</p>
          <p style={{"fontSize":25}}>{probability ? `\nDrinksannolikhet: ${probability} %` : ""}</p>
          Det finns {cons.total_comb} olika beställningar!
        </div>
      </div>
      <CountDown
        date={date.date + date.delay}
        renderer={Timer}
        key={date.date}
        onStart={() => {
          //Save the end date
          if (localStorage.getItem("end_date") == null)
            localStorage.setItem(
              "end_date",
              JSON.stringify(date.date + date.delay)
            );
        }}
        onComplete={() => {
          if (localStorage.getItem("end_date") != null)
            localStorage.removeItem("end_date");
        }}
      />
    </div>
  );
}

