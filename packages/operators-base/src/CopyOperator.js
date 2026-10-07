const { Operator } = require("@pipeline/core");

class CopyOperator extends Operator {
    constructor(outputCount) {
        const outputIndexes = Array.from({ length: outputCount }, (_, i) => i);

        super(['input'], outputIndexes);
    }

    onInput(inputName, data) {
        for (let [outputName, output] of Object.entries(this.outputs)) {
            output.ifValue(() => {
                this.push(outputName, data);
            });

        }
    }
}

module.exports = CopyOperator;
