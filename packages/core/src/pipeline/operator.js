const Pipe = require("./pipe");
const { Optional } = require("../util/optional");

class Operator {
    constructor(inputNames = [], outputNames = []) {
        this.inputs = {};
        this.outputs = {};

        for (let inputName of inputNames) {
            this.inputs[inputName] = new Optional();

            this.inputs[inputName].on('set', (pipe) => {
                pipe.on('itemPushed', (data) => {
                    this.onInput(inputName, data);
                });
            });
        }
        for (let outputName of outputNames) {
            this.outputs[outputName] = new Optional();
        }
    }

    output(name) {
        if (this.outputs[name] === undefined) {
            throw new Error(`OutputNotFound: ${name}, ${this.constructor.name}`);
        }

        return this.outputs[name];
    }

    input(name) {
        if (this.inputs[name] === undefined) {
            throw new Error(`InputNotFound: ${name}, ${this.constructor.name}`);
        }

        return this.inputs[name];
    }

    onInput(inputName, data) {}

    push(name, data) {
        this.outputs[name].value.push(data);
    }
}

module.exports = Operator;