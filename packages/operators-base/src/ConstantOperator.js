const { Operator } = require("@pipeline/core");

class ConstantOperator extends Operator {
    constructor(value) {
        super(['trigger'], ['value']);

        this.value = value;
    }

    onInput(inputName, data) {
        this.push('value', this.value);
    }
}

module.exports = ConstantOperator;
