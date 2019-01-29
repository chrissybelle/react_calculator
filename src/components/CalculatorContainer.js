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
        this.clearCalculator = this.clearCalculator.bind(this);
        this.deleteLastKey = this.deleteLastKey.bind(this);
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
        console.log(`calculationString: ${calculationString}`);

        //loop through string and find index position of all operators, store in operatorPosition
        for (let i = 0; i < calculationString.length; i++) {
            if (isNaN(calculationString[i]) && calculationString[i] !== "=") {
                operatorPosition.push(i);
            }
        }
        operatorPosition.push(calculationString.length);
        console.log(`operatorPosition: ${operatorPosition}`);
        console.log(`operatorPosition.length: ${operatorPosition.length}`);

        //validate input
        for (let i = 1; i < operatorPosition.length; i++) {
            //if operators have been entered consecutively, this will result in an error
            if (operatorPosition[i + 1] - operatorPosition[i] === 1) {
                console.log("consecutive operators - ERROR");
                this.setState({
                    total: "ERROR"
                });
            }
        }

        const numberArray = [];
        const operatorArray = [];
        const numberCount = operatorPosition.length - 1;
        let numberString = "";
        let counter = 0;


        console.log(`calculationString: ${calculationString}`);
        console.log(`numberCount: ${numberCount}`);

        //logic to separate out and store each number
        for (let i = 0; i < numberCount; i++) {

            for (let j = operatorPosition[i]; j < operatorPosition[i + 1]; j++) {

                //if character is a number
                if (!isNaN(calculationString[j])) {
                    numberString += calculationString[j];
                    console.log(`numberArray: ${numberArray}, operatorArray: ${operatorArray}`);
                } else if (isNaN(calculationString[j]) && calculationString[j] !== "=") {
                    operatorArray.push(calculationString[j]);
                    counter++;
                    console.log(`numberArray: ${numberArray}, operatorArray: ${operatorArray}`);
                }
                // console.log(`numberArray: ${numberArray}, operatorArray: ${operatorArray}`);

            }
            if(numberString) {numberArray.push(numberString);}
            numberString = "";
        }

        console.log(`numberArray: ${numberArray}, length: ${numberArray.length}`);
        console.log(`operatorArray: ${operatorArray}, length: ${operatorArray.length}`);

        let calculatedTotal = 0;

        //calculate!
        if (numberArray.length > 1 && numberArray.length === operatorArray.length + 1) {

            //perform multiplication & division first
            for (let i = 0; i < counter; i++) {

                // if both multiplication and division present, complete in left-to-right order
                if (operatorArray.indexOf("*") >= 0 && operatorArray.indexOf("/") >= 0) {
                    if (operatorArray.indexOf("*") < operatorArray.indexOf("/")) {
                        calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                        console.log(`multiplication done. ${numberArray[operatorArray.indexOf("*")]} * ${numberArray[operatorArray.indexOf("*") + 1]}calculatedTotal: ${calculatedTotal}`);
                        //adjusts numberArray and operatorArray
                        numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                        numberArray.splice(operatorArray.indexOf("*") + 1, 1);
                        operatorArray.splice(operatorArray.indexOf("*"), 1);
                        console.log(`updated numberArray: ${numberArray}`);
                        console.log(`updated operatorArray: ${operatorArray}`);
                    } else {
                        calculatedTotal = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                        console.log(`division done. ${numberArray[operatorArray.indexOf("/")]} / ${numberArray[operatorArray.indexOf("/") + 1]} calculatedTotal: ${calculatedTotal}`);
                        numberArray[operatorArray.indexOf("/")] = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                        numberArray.splice(operatorArray.indexOf("/") + 1, 1);
                        operatorArray.splice(operatorArray.indexOf("/"), 1);
                        console.log(`updated numberArray: ${numberArray}`);
                        console.log(`updated operatorArray: ${operatorArray}`);
                    }
                }
            }

            //perform any remaining multiplication / division
            for (let i = 0; i < counter; i++) {
                if (operatorArray.indexOf("*") >= 0) {
                    calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                    console.log(`multiplication done. ${numberArray[operatorArray.indexOf("*")]} * ${numberArray[operatorArray.indexOf("*") + 1]} calculatedTotal: ${calculatedTotal}`);
                    numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
                    numberArray.splice(operatorArray.indexOf("*") + 1, 1);
                    operatorArray.splice(operatorArray.indexOf("*"), 1);
                    console.log(`updated operatorArray: ${operatorArray}`);
                    console.log(`updated numberArray: ${numberArray}`);
                }

                if (operatorArray.indexOf("/") >= 0) {
                    calculatedTotal = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                    console.log(`division done. ${numberArray[operatorArray.indexOf("/")]} / ${numberArray[operatorArray.indexOf("/") + 1]} calculatedTotal: ${calculatedTotal}`);
                    numberArray[operatorArray.indexOf("/")] = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
                    numberArray.splice(operatorArray.indexOf("/") + 1, 1);
                    operatorArray.splice(operatorArray.indexOf("/"), 1);
                    console.log(`updated operatorArray: ${operatorArray}`);
                    console.log(`updated numberArray: ${numberArray}`);
                }
            }

            //if both addition & subtraction present, complete in left-to-right order
            for (let i = 0; i < counter; i++) {
                if (operatorArray.indexOf("+") >= 0 && operatorArray.indexOf("-") >= 0) {
                    if (operatorArray.indexOf("+") < operatorArray.indexOf("-")) {
                        calculatedTotal = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
                        console.log(`addition done. ${numberArray[operatorArray.indexOf("+")]} + ${numberArray[operatorArray.indexOf("+") + 1]} calculatedTotal: ${calculatedTotal}`);
                        numberArray[operatorArray.indexOf("+")] = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
                        numberArray.splice(operatorArray.indexOf("+") + 1, 1);
                        operatorArray.splice(operatorArray.indexOf("+"), 1);
                        console.log(`updated numberArray: ${numberArray}`);
                        console.log(`updated operatorArray: ${operatorArray} operatorPosition: ${operatorPosition}`);
                    } else {
                        calculatedTotal = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
                        console.log(`subtraction done. ${numberArray[operatorArray.indexOf("-")]} - ${numberArray[operatorArray.indexOf("-") + 1]} calculatedTotal: ${calculatedTotal}`);
                        numberArray[operatorArray.indexOf("-")] = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
                        numberArray.splice(operatorArray.indexOf("-") + 1, 1);
                        operatorArray.splice(operatorArray.indexOf("-"), 1);
                        console.log(`updated numberArray: ${numberArray}`);
                        console.log(`updated operatorArray: ${operatorArray}`);
                    }
                }
            }

            //perform any remaining addition / subtraction
            for (let i = 0; i <= counter; i++) {
                if (operatorArray.indexOf("+") >= 0) {
                    calculatedTotal = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
                    console.log(`addition done. ${parseInt(numberArray[operatorArray.indexOf("+")], 10)} + ${parseInt(numberArray[operatorArray.indexOf("+") + 1], 10)} calculatedTotal: ${calculatedTotal}`);
                    numberArray[operatorArray.indexOf("+")] = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
                    numberArray.splice(operatorArray.indexOf("+") + 1, 1);
                    operatorArray.splice(operatorArray.indexOf("+"), 1);
                    console.log(`updated operatorArray: ${operatorArray} operatorPosition: ${operatorPosition}`);
                    console.log(`updated numberArray: ${numberArray}`);
                    console.log(i);
                }

                if (operatorArray.indexOf("-") >= 0) {
                    calculatedTotal = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
                    console.log(`subtraction done. ${numberArray[operatorArray.indexOf("-")]} - ${numberArray[operatorArray.indexOf("-") + 1]} calculatedTotal: ${calculatedTotal}`);
                    numberArray[operatorArray.indexOf("-")] = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
                    numberArray.splice(operatorArray.indexOf("-") + 1, 1);
                    operatorArray.splice(operatorArray.indexOf("-"), 1);
                    console.log(`updated operatorArray: ${operatorArray}`);
                    console.log(`updated numberArray: ${numberArray}`);
                }
            }

            this.setState({
                total: calculatedTotal
            });

        //the count of numbers should always be one greater than the count of operators, otherwise: ERROR
        } else if (numberArray.length !== operatorArray.length + 1) {
            this.setState({
                total: "ERROR"
            });

        //if only one number entered and no operators, then total should equal that number
        } else if (numberArray.length === 1 && numberArray.length === operatorArray.length + 1) {
            this.setState({
                total: numberArray[0]
            });
        }
    }




    //     if (this.state.total !== "ERROR") {
    //         // if no operators entered consecutively, continue with calulation
    //         const numberArray = [];
    //         const operatorArray = [];
    //         const numberCount = operatorPosition.length - 1;
    //         let numberString = "";

    //         console.log(`calculationString: ${calculationString}`);
    //         console.log(`numberCount: ${numberCount}`);

    //         //logic to separate out and store each number
    //         for (let i = 0; i < numberCount; i++) {

    //             for (let j = operatorPosition[i]; j < operatorPosition[i + 1]; j++) {

    //                 if (!isNaN(calculationString[j])) {
    //                     numberString += calculationString[j];
    //                     numberArray.push(numberString);
    //                 } else if (isNaN(calculationString[j]) && calculationString[j] !== "=") {
    //                     operatorArray.push(calculationString[j]);
    //                 }

    //             }

    //             numberString = "";
    //         }

    //         console.log(`numberArray: ${numberArray}, length: ${numberArray.length}`);
    //         console.log(`operatorArray: ${operatorArray}, length: ${operatorArray.length}`);

    //         let calculatedTotal = 0;

    //         //calculate!
    //         if (numberArray.length > 1 && numberArray.length === operatorArray.length + 1) {

    //             //perform multiplication & division first
    //             for (let i = 0; i < operatorArray.length; i++) {

    //                 // if both multiplication and division present, complete in left-to-right order
    //                 if (operatorArray.indexOf("*") >= 0 && operatorArray.indexOf("/") >= 0) {
    //                     if (operatorArray.indexOf("*") < operatorArray.indexOf("/")) {
    //                         calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
    //                         console.log(`multiplication done. calculatedTotal: ${calculatedTotal}`);
    //                         //adjusts number Array and operator Array
    //                         numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
    //                         numberArray.splice(operatorArray.indexOf("*") + 1, 1);
    //                         operatorArray.splice(operatorArray.indexOf("*"), 1);
    //                         console.log(`updated numberArray: ${numberArray}`);
    //                         console.log(`updated operatorArray: ${operatorArray}`);
    //                     } else {
    //                         calculatedTotal = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
    //                         console.log(`division done. calculatedTotal: ${calculatedTotal}`);
    //                         numberArray[operatorArray.indexOf("/")] = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
    //                         numberArray.splice(operatorArray.indexOf("/") + 1, 1);
    //                         operatorArray.splice(operatorArray.indexOf("/"), 1);
    //                         console.log(`updated numberArray: ${numberArray}`);
    //                         console.log(`updated operatorArray: ${operatorArray}`);
    //                     }
    //                 }
    //             }

    //             //perform any remaining multiplication / division
    //             for (let i = 0; i < operatorArray.length; i++) {
    //                 if (operatorArray.indexOf("*") >= 0) {
    //                     calculatedTotal = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
    //                     console.log(`multiplication done. calculatedTotal: ${calculatedTotal}`);
    //                     numberArray[operatorArray.indexOf("*")] = numberArray[operatorArray.indexOf("*")] * numberArray[operatorArray.indexOf("*") + 1];
    //                     numberArray.splice(operatorArray.indexOf("*") + 1, 1);
    //                     operatorArray.splice(operatorArray.indexOf("*"), 1);
    //                     console.log(`updated operatorArray: ${operatorArray}`);
    //                     console.log(`updated numberArray: ${numberArray}`);
    //                 }

    //                 if (operatorArray.indexOf("/") >= 0) {
    //                     calculatedTotal = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
    //                     console.log(`division done. calculatedTotal: ${calculatedTotal}`);
    //                     numberArray[operatorArray.indexOf("/")] = numberArray[operatorArray.indexOf("/")] / numberArray[operatorArray.indexOf("/") + 1];
    //                     numberArray.splice(operatorArray.indexOf("/") + 1, 1);
    //                     operatorArray.splice(operatorArray.indexOf("/"), 1);
    //                     console.log(`updated operatorArray: ${operatorArray}`);
    //                     console.log(`updated numberArray: ${numberArray}`);
    //                 }
    //             }

    //             //if both addition & subtraction present, complete in left-to-right order
    //             for (let i = 0; i < operatorArray.length; i++) {
    //                 if (operatorArray.indexOf("+") >= 0 && operatorArray.indexOf("-") >= 0) {
    //                     if (operatorArray.indexOf("+") < operatorArray.indexOf("-")) {
    //                         calculatedTotal = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
    //                         console.log(`addition done. ${numberArray[operatorArray.indexOf("+")]} + ${numberArray[operatorArray.indexOf("+") + 1]} calculatedTotal: ${calculatedTotal}`);
    //                         numberArray[operatorArray.indexOf("+")] = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
    //                         numberArray.splice(operatorArray.indexOf("+") + 1, 1);
    //                         operatorArray.splice(operatorArray.indexOf("+"), 1);
    //                         console.log(`updated numberArray: ${numberArray}`);
    //                         console.log(`updated operatorArray: ${operatorArray}`);
    //                     } else {
    //                         calculatedTotal = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
    //                         console.log(`subtraction done. calculatedTotal: ${calculatedTotal}`);
    //                         numberArray[operatorArray.indexOf("-")] = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
    //                         numberArray.splice(operatorArray.indexOf("-") + 1, 1);
    //                         operatorArray.splice(operatorArray.indexOf("-"), 1);
    //                         console.log(`updated numberArray: ${numberArray}`);
    //                         console.log(`updated operatorArray: ${operatorArray}`);
    //                     }
    //                 }
    //             }

    //             //perform any remaining addition / subtraction
    //             for (let i = 0; i < operatorArray.length; i++) {
    //                 if (operatorArray.indexOf("+") >= 0) {
    //                     calculatedTotal = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
    //                     console.log(`addition done. calculatedTotal: ${calculatedTotal}`);
    //                     numberArray[operatorArray.indexOf("+")] = parseInt(numberArray[operatorArray.indexOf("+")], 10) + parseInt(numberArray[operatorArray.indexOf("+") + 1], 10);
    //                     numberArray.splice(operatorArray.indexOf("+") + 1, 1);
    //                     operatorArray.splice(operatorArray.indexOf("+"), 1);
    //                     console.log(`updated operatorArray: ${operatorArray}`);
    //                     console.log(`updated numberArray: ${numberArray}`);
    //                 }

    //                 if (operatorArray.indexOf("-") >= 0) {
    //                     calculatedTotal = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
    //                     console.log(`subtraction done. calculatedTotal: ${calculatedTotal}`);
    //                     numberArray[operatorArray.indexOf("-")] = numberArray[operatorArray.indexOf("-")] - numberArray[operatorArray.indexOf("-") + 1];
    //                     numberArray.splice(operatorArray.indexOf("-") + 1, 1);
    //                     operatorArray.splice(operatorArray.indexOf("-"), 1);
    //                     console.log(`updated operatorArray: ${operatorArray}`);
    //                     console.log(`updated numberArray: ${numberArray}`);
    //                 }
    //             }

    //             this.setState({
    //                 total: calculatedTotal
    //             });

    //         } else if (numberArray.length > 1 && numberArray.length !== operatorArray.length + 1) {
    //             this.setState({
    //                 total: "ERROR"
    //             });

    //         } else if (numberArray.length === 1) {
    //             this.setState({
    //                 total: numberArray[0]
    //             });
    //         }

    //     }


    // }











    //clear calculator
    clearCalculator() {
        this.setState({
            calculationString: "",
            total: ""
        })
    }

    //delete last key
    deleteLastKey() {
        this.setState({
            calculationString: this.state.calculationString.substring(0, (this.state.calculationString.length - 1))
        })
    }



    render() {
        let numberArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        let operatorArray = ["+", "-", "*", "/", "="];

        return (
            <div>
                <Button btnValue={numberArray} onClick={this.logString} />
                <Button btnValue={operatorArray} onClick={this.logString} />
                <Button btnValue={["backspace"]} onClick={this.deleteLastKey} />
                <Button btnValue={["clear"]} onClick={this.clearCalculator} />
                <h1>{this.state.calculationString}</h1>
                <h1>Total: {this.state.total}</h1>
            </div>
        );
    }
};

export default CalculatorContainer;
