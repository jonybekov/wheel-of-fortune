import React, { useEffect, useState, memo } from "react";

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

export default Letter;
