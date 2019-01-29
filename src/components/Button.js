import React from "react";
import "./button.css";

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        let clickedBtn = e.target.value;
        this.props.onClick(clickedBtn);
    }

    handleKeyDown(e) {
        e.preventDefault();
        let pressedBtn = e.key;
        console.log(pressedBtn);
        if (!isNaN(pressedBtn)) {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: key pressed`);
        }
        if (pressedBtn === "Backspace") {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: key pressed`);
        }
        if (pressedBtn === "Enter") {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: key pressed`);
        }
        if (pressedBtn === "+") {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: key pressed`);
        }
        if (pressedBtn === "-") {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: key pressed`);
        }
        if (pressedBtn === "*") {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: key pressed`);
        }
        if (pressedBtn === "/") {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: key pressed`);
        }
    }

    render() {
        return (
            <div className="flex-container">
                {this.props.btnValue.map(button => {
                    return <button autoFocus value={button} key={button} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>{button}</button>;
                })}
            </div>
        );
    }
};

export default Button;
