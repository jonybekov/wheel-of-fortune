import "./scripts/wheel";
import { render } from "react-dom";
import React, { Fragment, useEffect, useState, useRef, memo } from "react";
import { ANSWERS } from "./answers";

const container = document.getElementById("hidden-word");

const Letter = memo(({ letter, order, show }) => {
    const [visible, setVisible] = useState(false);

    const onHide = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (show) {
            setVisible(true);
        } else {
            onHide();
        }
    }, [show]);

    useEffect(() => {
        return () => onHide();
    }, []);

    return (
        <div
            className={`flip-card ${visible ? "visible" : ""}`}
            onClick={() => setVisible(true)}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">{order}</div>
                <div className="flip-card-back">{letter}</div>
            </div>
        </div>
    );
});

const HiddenWordComponent = () => {
    const [words, setWords] = useState(ANSWERS);
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
                <button class="button" onClick={showAllWords}>
                    Открыть все
                </button>
                <button class="button" onClick={() => setShowAll(false)}>
                    Скрыть все
                </button>
            </div>

            {loading ? (
                <div className="loading">Подождите...</div>
            ) : (
                currentWord
                    .split("")
                    .map((letter, i) => (
                        <Letter show={showAll} key={i} order={i + 1} letter={letter} />
                    ))
            )}
        </Fragment>
    );
};

const App = <HiddenWordComponent />;

render(App, container);

if (module.hot) {
    module.hot.accept();
}
