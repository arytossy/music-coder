import React, { HTMLAttributes, MouseEvent, PropsWithChildren, useRef, useState } from "react";

import "./AdjustablePane.css";

type Props = {
    id?: string,
    direction: "north" | "east" | "south" | "west",
    initSize: number,
};

export default function AdjustablePane(props: PropsWithChildren<Props>) {

    const [isHold, setIsHold] = useState(false);
    const [startFrom, setStartFrom] = useState(0);
    const [adjustFrom, setAdjustFrom] = useState(0);
    const [size, setSize] = useState(props.initSize);
    const ref = useRef<HTMLDivElement>(null);

    function hold(event: MouseEvent) {

        event.preventDefault();

        if (ref.current === null) return;

        setIsHold(true);

        switch (props.direction) {

            case "north":
            case "south":
                setStartFrom(event.clientY);
                setAdjustFrom(ref.current.clientHeight);
                break;

            case "east":
            case "west":
                setStartFrom(event.clientX);
                setAdjustFrom(ref.current.clientWidth);
                break;
        }
    }

    function adjust(event: MouseEvent) {

        event.preventDefault();

        if (!isHold) return;

        switch (props.direction) {

            case "north":
                setSize(adjustFrom - (event.clientY - startFrom));
                break;
            case "south":
                setSize(adjustFrom + (event.clientY - startFrom));
                break;
            case "east":
                setSize(adjustFrom + (event.clientX - startFrom));
                break;
            case "west":
                setSize(adjustFrom - (event.clientX - startFrom));
                break;
        }
    }

    function release(event: MouseEvent) {
        event.preventDefault();
        setIsHold(false);
    }

    let attributes: HTMLAttributes<HTMLDivElement> = {};
    attributes.className = `adjustable-pane ${props.direction}`;
    if (props.id) {
        attributes.id = props.id;
    }
    switch (props.direction) {
        case "north":
        case "south":
            attributes.style = { height: size };
            break;
        case "east":
        case "west":
            attributes.style = { width: size };
            break;
    }

    const adjuster = (
        <div
            className={`adjuster ${props.direction}`}
            onMouseDown={hold}
        />
    );

    const body = <div className="adjustable-pane-body">{props.children}</div>

    let content = <></>;
    switch (props.direction) {
        case "north":
        case "west":
            content = <>{adjuster}{body}</>;
            break;
        case "south":
        case "east":
            content = <>{body}{adjuster}</>;
            break;
    }

    return (
        <div { ...attributes } ref={ref} >
            {content}
            {isHold ?
                <div
                    id="drag-wrapper"
                    className={props.direction}
                    onMouseMove={adjust}
                    onMouseUp={release}
                    onMouseLeave={release}
                />
            : null}
        </div>
    );
}