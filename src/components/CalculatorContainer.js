import React from "react";
import Button from "./Button";
import "./calculatorContainer.css";

class CalculatorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // firstNumber: "",
            // operator: "",
            // secondNumber: "",
            // operatorPressed: false,
            // calculationDone: false
            calculationString: "",
            total: ""
        }
        // this.logNumberOne = this.logNumberOne.bind(this);
        // this.logOperator = this.logOperator.bind(this);
        // this.logNumberTwo = this.logNumberTwo.bind(this);
        // this.logButton = this.logButton.bind(this);
        this.logString = this.logString.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    logString(loggedKey) {
        if (loggedKey !== "=") {
            this.setState({
                calculationString: this.state.calculationString + loggedKey
            })
        } else if (loggedKey === "=") {
            this.calculateTotal();
        }

    }

    calculateTotal() {
        let operatorPosition = [];
        // let calculationString = this.state.calculationString;

        // const findOperators = (startIndex) => {
            //if a "*" operator exists in the string after the startIndex, add the position to the operatorOpsiiton array
            // if (calculationString.indexOf("*") >= 0) {
            //     operatorPosition.push(calculationString.indexOf("*", startIndex));
            // }
            // if (calculationString.indexOf("+") >= 0) {
            //     operatorPosition.push(calculationString.indexOf("+", startIndex));
            // }
            // if (calculationString.indexOf("-") >= 0) {
            //     operatorPosition.push(calculationString.indexOf("-", startIndex));
            // }
            // if (calculationString.indexOf("/") >= 0) {
            //     operatorPosition.push(calculationString.indexOf("/", startIndex));
            // }

        //loop through string and find position of all operators
        for (let i=0; i<this.state.calculationString.length; i++) {
            console.log(this.state.calculationString[i]);
            if (isNaN(this.state.calculationString[i])) {
                operatorPosition.push(i);
            }
        }
            console.log(`operator indexes: ${operatorPosition}`);
            operatorPosition.sort((a, b) => {
                return a - b;
            });
            console.log(`sorted: ${operatorPosition}`);
            console.log(operatorPosition[operatorPosition.length - 1]);
        }

            // if (calculationString.indexOf("*",startIndex) >= 0 || calculationString.indexOf("/",startIndex) >= 0 || calculationString.indexOf("+",startIndex) >= 0 || calculationString.indexOf("-",startIndex) >= 0 ) {
            //     operatorPosition.push(calculationString.indexOf("*",startIndex));
            //     operatorPosition.push(calculationString.indexOf("/",startIndex));
            //     operatorPosition.push(calculationString.indexOf("+",startIndex));
            //     operatorPosition.push(calculationString.indexOf("-",startIndex));
            // }
    


        // let newStartIndex = operatorPosition[operatorPosition.length - 1];

        // findOperators(newStartIndex);
        // if (findOperators(newStartIndex))




    // logNumberOne(loggedNumber) {
    //     this.setState({
    //         firstNumber: this.state.firstNumber + loggedNumber
    //     })
    // }

    // logOperator(loggedOperator) {
    //     this.setState({
    //         operator: loggedOperator,
    //         operatorPressed: true
    //     })
    // }

    // logNumberTwo(loggedNumber) {
    //     this.setState({
    //         secondNumber: this.state.secondNumber + loggedNumber
    //     })
    // }

    // logResult() {

    // }

    // logButton(loggedButton) {
    //     if (!this.state.operatorPressed) {
    //         this.logNumberOne(loggedButton);
    //     } else if (this.state.firstNumber && !this.state.operatorPressed) {
    //         this.logOperator(loggedButton);
    //     } else if (this.state.firstNumber && this.state.operatorPressed && !this.state.calculationDone) {
    //         this.logNumberTwo(loggedButton);
    //     } else if (this.state.firstNumber && this.state.operatorPressed && !this.state.secondNumber) {
    //         this.logResult();
    //     }
    // }

    render() {
        let numberArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        let operatorArray = ["+", "-", "*", "/", "="];

        return (
            <div>
                <Button btnValue={numberArray} onClick={this.logString} />
                <Button btnValue={operatorArray} onClick={this.logString} />
                <h1>{this.state.calculationString}</h1>
            </div>
        );
    }
};

export default CalculatorContainer;
