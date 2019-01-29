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
        //if key is a number, log the number
        if (!isNaN(pressedBtn)) {
            this.props.onKeyDown(pressedBtn);
            console.log(`${pressedBtn}: # key pressed`);
        } else {
            //if key matches operators or "backspace" or "enter", perform relevant function
            switch (pressedBtn) {
                case "Backspace":
                case "Enter":
                case "+":
                case "-":
                case "*":
                case "/":
                    this.props.onKeyDown(pressedBtn);
                    console.log(`${pressedBtn}: key pressed`);
                    break;
                default:
                    console.log(`${pressedBtn}: non-key pressed`);
            }
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
