import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { constClass as cons } from './words';
import CountDown from 'react-countdown';


export default function GenerateDrink() {
  
  let sizeprob = 0;
  const wantedDelay = 180000; // 3 min
  const [drinkOrder, setDrinkOrder] = useState("");
  const [probability, setProbability] = useState(0);
  const [rarity, setRarity] = useState("");
  const [rarityStyle, setRarityStyle] = useState("Common")
  const [date, setDate] = useState({ date: Date.now(), delay: 0 });

  const getLocalStorageValue = (s) => localStorage.getItem(s);


  // Check if user reloaded page and restore timer
  useEffect(() => {
    console.log("useEffect")
    const futureDate = getLocalStorageValue("end_date");
    if (futureDate != null && !isNaN(futureDate)) {
      console.log("time exists")
      const currentTime = Date.now();
      const delta = parseInt(futureDate, 10) - currentTime;
      //Do you reach the end?
      if (delta > wantedDelay) {
        //Yes we clear our saved end date
        if (localStorage.getItem("end_date").length > 0)
          localStorage.removeItem("end_date");
      } else {
        //No update the end date  
        console.log("Update time")
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

    // Calls corresponding function for random number and calculates probability
    if (0 <= randnr && randnr < 0.30) { // colorTaste
      functions[0]();
      prob = 0.30 * 1 / (cons.color.length * cons.taste.length);
      setRarity("Everywhere")
      setRarityStyle("Everywhere")

    } else if (0.30 <= randnr && randnr < 0.55) { // thingAdjective
      functions[1]();
      prob = 0.25 * 1 / (cons.adjective.length * cons.thing.length);
      setRarity("Common")
      setRarityStyle("Common")

    } else if (0.55 <= randnr && randnr < 0.8) { // skitDrink
      functions[2]();
      prob = 0.25 * 1 / (cons.thing.length);
      setRarity("Uncommon")
      setRarityStyle("Uncommon")

    } else if (0.8 <= randnr && randnr < 0.9) { // textDrink
      functions[3]();
      prob = 0.1 * 1 / (cons.skit.length);
      setRarity("Very Uncommon")
      setRarityStyle("VeryUncommon")

    } else if (0.9 <= randnr && randnr < 0.96) { // nobodyRemeber
      functions[4]();
      prob = 0.06 * 1 / (cons.thing.length);
      setRarity("Rare")
      setRarityStyle("Rare")

    } else if (0.96 <= randnr && randnr < 0.99) { // oneThing
      functions[5]();
      prob = 0.03 * 1 / (cons.text.length);
      setRarity("Epic")
      setRarityStyle("Epic epicAnim")
    
    } else if (0.99 <= randnr && randnr <= 1) {
      functions[6]();
      prob = 0.01 * 1 / cons.vågadösize.length;
      setRarity("LEGENDARY")
      setRarityStyle("Legendary legendAnim")
    
    } else {
      functions[0]();
      prob = 0.35 * 1 / (cons.color.length * cons.taste.length);
      setRarity("Common")
      setRarityStyle("Common")
      console.log("Should not happen, colorTaste")
    }
    prob = prob * sizeprob * 100;
    setProbability(prob.toFixed(3)); // set percentage decimals
    return (prob)
  }

  // 0 -> 30%   (30%)
  const colorTaste = () => setDrinkOrder(getOrder(cons.color, " och ", cons.taste, "!"));
  // 30 -> 55%  (25%)
  const thingAdjective = () => setDrinkOrder(getOrder(cons.adjective, " ", cons.thing, "!"));
  // 55 -> 80% (25%)
  const oneThing = () => setDrinkOrder(getOrder(cons.thing, "!"));
  // 80 -> 90%  (10%)
  const skitDrink = () => setDrinkOrder(getOrder("skit", cons.skit, "!"));
  // 90 -> 96%  (6%)
  const nobodyRemeber = () => setDrinkOrder(getOrder("ingen minns en ", cons.thing, "!"));
  // 96 -> 99%  (3%)
  const textDrink = () => setDrinkOrder(getOrder(cons.text, "!"));
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
          Det finns {cons.total_comb} olika beställningar!
        </div>
      </div>
      <CountDown
        date={date.date + date.delay}
        renderer={Timer}
        key={date.date}
        onStart={() => {
          //Save the end date
          console.log("onStart: ");
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

