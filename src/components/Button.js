import React from "react";
import "./button.css";

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let clickedBtn = e.target.value;
        this.props.onClick(clickedBtn);
    }

    render() {
        return (
            <div className="flex-container">
                {this.props.btnValue.map(button => {
                    return <button value={button} key={button} onClick={this.handleClick}>{button}</button>;
                })}
            </div>
        );
    }
};

export default Button;
