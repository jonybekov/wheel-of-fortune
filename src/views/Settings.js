import React, { useState, useEffect } from "react";
import { ANSWERS } from "../answers";
import { Link } from "@reach/router";

const getStorageWords = () => localStorage.getItem("answers");

export default function Settings() {
    const storageWords = getStorageWords();
    const [answers, setAnswers] = useState(storageWords ? storageWords.split(" ") : ANSWERS);
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState("");

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem("answers", answers.join(" "));
            setLoading(false);
        }, 1000);
    };

    const onClear = () => {
        localStorage.clear();
        setAnswers(ANSWERS);
    };

    const onAddOption = () => {
        if (option.replace(/\s/g, "").length > 0) {
            console.log(option);
            setAnswers([...answers, option]);
            setOption("");
        }
    };

    const onKeyDown = (e) => {
        if (e.code === "Enter" || e.code === "Space") {
            onAddOption();
        }
    };

    const onDelete = (index) => {
        const newAnswers = answers.filter((el, i) => i !== index);
        setAnswers(newAnswers);
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
                <Link className="button" to="/">
                    Назад к игру
                </Link>
                <br />
                <p className="info">
                    <i>
                        Инфо: Добавьте ответы к вопросам и нажмите на кнопку сохранить что-бы
                        ответы отображался в игре. Чтобы удалить ответы нажмите на кнопку ❌
                    </i>
                </p>
                <br />
                <h4>Ответы на вопросы: </h4>
                <ol className="answers">
                    {answers.map((answer, i) => (
                        <li key={i}>
                            {answer}{" "}
                            {answers.length !== 1 && (
                                <a title="Удалить" onClick={() => onDelete(i)}>
                                    ❌
                                </a>
                            )}
                        </li>
                    ))}
                </ol>

                <div className="column small-12">
                    <div className="add-option">
                        <input
                            className="input"
                            onKeyDown={onKeyDown}
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                        ></input>
                        <a className="button" onClick={onAddOption}>
                            Добавить ответ
                        </a>
                    </div>
                    <a
                        className={`button expanded success ${loading ? "disabled" : ""}`}
                        onClick={onSubmit}
                    >
                        {loading ? "Подождите..." : "Сохранить"}
                    </a>
                    <div className="button-group align-justify">
                        <a className="button expanded alert" onClick={onClear}>
                            Ответы по умолчанию
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
