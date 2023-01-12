import React, { MouseEvent, useState } from "react";

import "./Adjuster.css";

type Props = {
    direction: "horizontal" | "vertical",
    onStartHeld: () => void,
    onMove: (offset: number) => void
};

export default function Adjuster(props: Props) {

    const [isHeld, setIsHeld] = useState(false);
    const [origin, setOrigin] = useState(0);

    function handleStartHeld(event: MouseEvent) {
        event.preventDefault();
        setIsHeld(true);
        setOrigin(props.direction == "horizontal" ? event.clientY : event.clientX);
        props.onStartHeld();
    }

    function handleMove(event: MouseEvent) {
        event.preventDefault();
        if (!isHeld) return;
        const offset =
            props.direction == "horizontal"
                ? event.clientY - origin
                : event.clientX - origin;
        props.onMove(offset);
    }

    function handleRelease(event: MouseEvent) {
        event.preventDefault();
        setIsHeld(false);
        setOrigin(0);
    }

    return (
        <>
            <div
                className={`adjuster ${props.direction}`}
                onMouseDown={handleStartHeld}
            />
            {isHeld ?
                <div
                    id="drag-wrapper"
                    className={props.direction}
                    onMouseMove={handleMove}
                    onMouseUp={handleRelease}
                    onMouseLeave={handleRelease}
                />
            : null}
        </>
    );
}