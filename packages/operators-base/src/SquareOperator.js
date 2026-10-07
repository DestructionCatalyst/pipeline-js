const { Operator } = require("@pipeline/core");

class SquareOperator extends Operator {
    constructor(value) {
        super(['number'], ['square']);
    }

    onInput(inputName, data) {
        this.push('square', data * data);
    }
}

module.exports = SquareOperator;
