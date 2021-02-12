import React, { useEffect } from "react";
import wheelFactory from "../scripts/wheelFactory";
import HiddenWord from "../components/HiddenWord";

const Game = () => {
    useEffect(() => {
        // FACTORY

        // DOM
        const mount = document.querySelector(".js-mount");
        const wordButton = document.querySelector(".js-get-word");
        const spinButton = document.querySelector(".js-spin");
        const wordsInput = document.querySelector(".js-words");
        const getWords = () => wordsInput.value.split(" ");

        // wordsInput.addEventListener("input", handleChange);
        // wordButton.addEventListener("click", handleGetWord);
        spinButton.addEventListener("click", handleSpin);

        const wheel = wheelFactory(mount);
        wheel.init({
            width: Math.min(window.innerWidth, window.innerHeight),
            height: Math.min(window.innerWidth, window.innerHeight),
            onWheelTick: () => console.log("tick"),
        });

        const text = "5 ➕ 10 25 40 П 15 30 0 Б 20 35";
        wheel.setWords(text.split(" "));
        wheel.drawWheel();

        function handleChange(e) {
            // const words = value.split(" ");
            // wheel.setWords(words);
            // wheel.drawWheel();
        }

        function handleGetWord(e) {
            const word = wheel.getCurrentWord();

            e.target.textContent = `Get current word: ${word}`;
        }

        function handleSpin() {
            wheel.spin(Math.random());
        }

        window.addEventListener("resize", () => {
            wheel.updateDims({
                width: Math.min(window.innerWidth, window.innerHeight),
                height: Math.min(window.innerWidth, window.innerHeight),
            });
        });
    }, []);

    return (
        <div>
            <HiddenWord />

            <div className="wheel-container">
                <div className="mount js-mount"></div>
            </div>
        </div>
    );
};

export default Game;
