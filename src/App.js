import './App.css';
import Die from "./Die";
import React from "react";
import {nanoid} from 'nanoid';
import Confetti from './Confetti';

function App() {

    const [tenzies, setTenzies] = React.useState(false);

    const DICE_AMOUNT = 10;

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < DICE_AMOUNT; i++) {
            newDice.push(generateNewDie())
        }
        return newDice;
    }

    //Create an array of dice with random numbers from 1 to 6 as values
    const [dice, setDice] = React.useState(allNewDice());
    const diceElements = dice.map((die, index) =>
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    )

    function rollDice() {
        if (tenzies) {
            setDice(allNewDice())
            setTenzies(false)
            return
        }
        setDice(prevDice => prevDice.map(die => die.isHeld ? die : generateNewDie()));
    }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
    }

    //Check whether the user has won the game yet or not
    React.useEffect(() => {
        const firstValue = dice[0].value;
        const allSameValue = dice.every(dice => dice.value === firstValue);
        const allHeld = dice.every(dice => dice.isHeld);
        if (allSameValue && allHeld) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    return (
        <main className="main">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="description">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dices">
                {diceElements}
            </div>
            <button onClick={rollDice} className="button">{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}

export default App;
