import React, { Fragment, useEffect, useState, useRef } from "react";
import { ANSWERS } from "../answers";
import Letter from "./Letter";
import { Link } from "@reach/router";

const getStorageWords = () => localStorage.getItem("answers");

const HiddenWord = () => {
    const storageWords = getStorageWords();
    const [words, setWords] = useState(storageWords ? storageWords.split(" ") : ANSWERS);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentWord = words[currentIndex];
    const disabledPrev = currentIndex === 0;
    const disabledNext = currentIndex === words.length - 1;
    const controlsRef = useRef();

    const onNext = () => setCurrentIndex(Math.min(currentIndex + 1, words.length - 1));
    const onPrev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));

    const showAllWords = () => {
        setShowAll(true);
    };

    useEffect(() => {
        setShowAll(false);
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    }, [currentIndex]);

    return (
        <Fragment>
            <div className="word-controls" ref={controlsRef}>
                <p>Вопрос № {currentIndex + 1}</p>
                <div className="word-buttons">
                    <button
                        className={`button ${disabledPrev ? "disabled" : ""}`}
                        onClick={onPrev}
                    >
                        Пред.
                    </button>
                    <button
                        className={`button ${disabledNext ? "disabled" : ""}`}
                        onClick={onNext}
                    >
                        След.
                    </button>
                </div>
                <button className="button" onClick={showAllWords}>
                    Открыть все
                </button>
                <button className="button" onClick={() => setShowAll(false)}>
                    Скрыть все
                </button>
                <Link to="/settings">
                    <button className="button expanded">Настройки</button>
                </Link>
                <button className="success button js-spin">Крутить барабан</button>
            </div>

            <div id="hidden-word">
                {loading ? (
                    <div className="loading">Подождите...</div>
                ) : (
                    currentWord
                        .split("")
                        .map((letter, i) => (
                            <Letter show={showAll} key={i} order={i + 1} letter={letter} />
                        ))
                )}
            </div>
        </Fragment>
    );
};

export default HiddenWord;
