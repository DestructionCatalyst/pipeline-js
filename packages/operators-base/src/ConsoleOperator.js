const { Operator } = require("@pipeline/core");

class ConsoleOperator extends Operator {
    constructor(value) {
        super(['debug', 'info', 'log', 'warn', 'error'], []);

        this.value = value;
    }

    onInput(inputName, data) {
        console[inputName](data);
    }
}

module.exports = ConsoleOperator;
