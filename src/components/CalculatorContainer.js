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
        const operatorPosition = [0]; //zero in first index - used in for loop logic at bottom to separate numbers
        const calculationString = this.state.calculationString;

        //loop through string and find index position of all operators, store in operatorPosition
        for (let i = 0; i < calculationString.length; i++) {
            console.log(calculationString[i]);
            if (isNaN(calculationString[i])) {
                operatorPosition.push(i);
            }
        }
        console.log(`operator indexes: ${operatorPosition}`);
        operatorPosition.sort((a, b) => {
            return a - b;
        });
        operatorPosition.push(calculationString.length);
        console.log(`sorted: ${operatorPosition}`);
        console.log(`operatorPosition.length: ${operatorPosition.length}`);
        console.log(operatorPosition[operatorPosition.length - 1]);

        const numberArray = [];
        const numberCount = operatorPosition.length - 1;
        let numberString = "";
        let operatorArray = [];


        console.log(`calculationString: ${calculationString}`);
        console.log(`numberCount: ${numberCount}`);

        //logic to separate out and store each number
        for (let i = 0; i < numberCount; i++) {

            for (let j = operatorPosition[i]; j < operatorPosition[i + 1]; j++) {

                if (!isNaN(calculationString[j])) {
                    numberString += calculationString[j];
                } else {
                    operatorArray.push(calculationString[j]);
                }

            }
            console.log(`numberString: ${numberString}`);
            console.log(`operatorArray: ${operatorArray}`);
            numberArray.push(numberString);
            numberString = "";
        }

        console.log(`numberArray: ${numberArray}`);

        let calculatedTotal = 0;

        //perform calculation - FIX FIX FIX
        for (let i = 0; i < operatorArray.length; i++) {

            // calculationString[operatorPosition[i]];
            if (operatorArray.indexOf("*") >= 0) {
                calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                operatorArray[operatorArray.indexOf("*")] = "done";
                // numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                // numberArray.splice(operatorArray.indexOf("*") + 1, 1);
                console.log(`operatorArray: ${operatorArray}`);
                console.log(`updated numberArray: ${numberArray}`);
            }
            console.log(`multiplication done. calculatedTotal: ${calculatedTotal}`);
            if (operatorArray.indexOf("/") >= 0) {
                calculatedTotal = numberArray[operatorArray.indexOf("/")] * numberArray[operatorArray.indexOf("/") + 1];
            }
            console.log(`division done. calculatedTotal: ${calculatedTotal}`);
        }

    }


    // logResult() {

    // }



    render() {
        let numberArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        let operatorArray = ["+", "-", "*", "/", "="];

        return (
            <div>
                <Button btnValue={numberArray} onClick={this.logString} />
                <Button btnValue={operatorArray} onClick={this.logString} />
                <Button btnValue={["clear"]} onClick="" />
                <h1>{this.state.calculationString}</h1>
                <h1>Total:</h1>
            </div>
        );
    }
};

export default CalculatorContainer;
