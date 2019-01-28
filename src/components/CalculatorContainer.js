import React from "react";
import Button from "./Button";
import "./calculatorContainer.css";

class CalculatorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calculationString: "",
            total: ""
        }
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
            if (isNaN(calculationString[i])) {
                operatorPosition.push(i);
            }
        }
        operatorPosition.push(calculationString.length);
        console.log(`operator indexes: ${operatorPosition}`);
        console.log(`operatorPosition.length: ${operatorPosition.length}`);

        //validate input - checks if operators have been entered consecutively - this will result in error
        for (let i=0; i<operatorPosition.length; i++) {
            if (operatorPosition[i+1]-operatorPosition[i] === 1) {
                console.log("consecutive operators - ERROR");
                this.setState({
                    total: "ERROR"
                })

            }
        }



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
            // console.log(`numberString: ${numberString}`);
            // console.log(`operatorArray: ${operatorArray}`);
            numberArray.push(numberString);
            numberString = "";
        }

        console.log(`numberArray: ${numberArray}`);
        console.log(`operatorArray: ${operatorArray}`);

        let calculatedTotal = 0;


        if (numberArray.length > 1 && numberArray.length === operatorArray.length + 1) {

            //perform multiplication / division first - FIX FIX FIX
            for (let i = 0; i < operatorArray.length; i++) {

                // if both multiplication and division present, complete in left-to-right order
                if (operatorArray.indexOf("*") >= 0 && operatorArray.indexOf("/") >= 0) {
                    if (operatorArray.indexOf("*") < operatorArray.indexOf("/")) {
                        calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                        console.log(`multiplication done. calculatedTotal: ${calculatedTotal}`);
                        numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                        numberArray.splice(operatorArray.indexOf("*") + 1, 1);
                        operatorArray.splice(operatorArray.indexOf("*"), 1);
                        console.log(`updated numberArray: ${numberArray}`);
                        console.log(`updated operatorArray: ${operatorArray}`);
                    } else {
                        calculatedTotal = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                        console.log(`division done. calculatedTotal: ${calculatedTotal}`);
                        numberArray[operatorArray.indexOf("/")] = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                        numberArray.splice(operatorArray.indexOf("/") + 1, 1);
                        operatorArray.splice(operatorArray.indexOf("/"), 1);
                        console.log(`updated numberArray: ${numberArray}`);
                        console.log(`updated operatorArray: ${operatorArray}`);
                    }
                }
            }

            for (let i = 0; i < operatorArray.length; i++) {
                if (operatorArray.indexOf("*") >= 0) {
                    calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                    console.log(`multiplication done. calculatedTotal: ${calculatedTotal}`);
                    numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                    numberArray.splice(operatorArray.indexOf("*") + 1, 1);
                    operatorArray.splice(operatorArray.indexOf("*"), 1);
                    console.log(`updated operatorArray: ${operatorArray}`);
                    console.log(`updated numberArray: ${numberArray}`);
                }

                if (operatorArray.indexOf("/") >= 0) {
                    calculatedTotal = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                    console.log(`division done. calculatedTotal: ${calculatedTotal}`);
                    numberArray[operatorArray.indexOf("/")] = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                    numberArray.splice(operatorArray.indexOf("/") + 1, 1);
                    operatorArray.splice(operatorArray.indexOf("/"), 1);
                    console.log(`updated operatorArray: ${operatorArray}`);
                    console.log(`updated numberArray: ${numberArray}`);
                }
                console.log(`division done. calculatedTotal: ${calculatedTotal}`);
            }
        } else if (numberArray.length > 1 && numberArray.length !== operatorArray.length + 1) {
            this.setState({
                total: "ERROR"
            })
        } else if (numberArray.length === 1) {
            this.setState({
                total: numberArray[0]
            })
        }



    }

    // multiply() {
    //     let calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
    //     console.log(`multiplication done. calculatedTotal: ${calculatedTotal}`);
    //     numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
    //     numberArray.splice(operatorArray.indexOf("*"), 1);
    //     operatorArray.splice(operatorArray.indexOf("*"),1);
    //     console.log(`updated operatorArray: ${operatorArray}`);
    //     console.log(`updated numberArray: ${numberArray}`);
    // }


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
                <h1>Total: {this.state.total}</h1>
            </div>
        );
    }
};

export default CalculatorContainer;
