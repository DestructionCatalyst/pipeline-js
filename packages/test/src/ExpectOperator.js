const { Operator } = require("@pipeline/core");
const assert = require("assert");

class ExpectOperator extends Operator {
    constructor(inputNames, expectations) {
        super(inputNames, []);

        this.expectations = expectations;
    }

    onInput(inputName, data) {
        let expectedData = this.expectations[inputName].shift();

        assert.deepStrictEqual(data, expectedData);
    }
}

module.exports = ExpectOperator;