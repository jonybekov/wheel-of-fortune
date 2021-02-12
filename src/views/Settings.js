import React, { useState, useEffect } from "react";
import { ANSWERS } from "../answers";
import { Link } from "@reach/router";

const getStorageWords = () => localStorage.getItem("answers");

export default function Settings() {
    const storageWords = getStorageWords();
    const [answers, setAnswers] = useState(storageWords || ANSWERS.join(" "));
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem("answers", answers);
            setLoading(false);
        }, 1000);
    };

    const onClear = () => {
        localStorage.clear();
        setAnswers(ANSWERS.join(" "));
    };

    useEffect(() => {
        return () => {
            setAnswers("");
        };
    }, []);

    return (
        <div className="container">
            <div className="row">
                <br />
                <Link to="/">
                    <a className="button">Назад к игру</a>
                </Link>
                <br />
                <br />
                <div className="column small-12">
                    <h2>Добавьте ответы с пробелом</h2>

                    <textarea
                        value={answers}
                        onChange={(e) => setAnswers(e.target.value)}
                        className="js-words"
                        name="words"
                        rows="3"
                    ></textarea>
                    <div className="button-group align-justify">
                        <a
                            className={`button expanded primary ${loading ? "disabled" : ""}`}
                            onClick={onSubmit}
                        >
                            {loading ? "Подождите..." : "Сохранить"}
                        </a>
                        <a className="button expanded alert" onClick={onClear}>
                            Ответы по умолчанию
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
