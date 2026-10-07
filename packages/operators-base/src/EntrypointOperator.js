const { Operator } = require("@pipeline/core");

class EntrypointOperator extends Operator {
    constructor() {
        super([], ['entrypoint']);
    }

    start() {
        this.push('entrypoint', null);
    }
}

module.exports = EntrypointOperator;
