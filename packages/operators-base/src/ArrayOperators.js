const { Operator } = require("@pipeline/core");

class ArraySplitOperator extends Operator {
    constructor() {
        super(['array'], ['values', 'length']);
    }

    onInput(inputName, data) {
        for (let item of data) {
            this.push('values', item);
        }
        this.push('length', data.length);
    }
}

class ArrayJoinOperator extends Operator {
    constructor() {
        super(['values', 'length'], ['array']);
        this.values = [];
        this.lengths = [];
    }

    onInput(inputName, data) {
        switch (inputName) {
            case 'values':
                this.values.push(data);
                this.release();
                break;
            case 'length':
                this.lengths.push(data);
                this.release();
                break;
        }
    }

    release() {
        if (this.values.length >= this.lengths[0]) {
            this.push('array', this.values.splice(0, this.lengths.shift()));
        }
    }
}

module.exports = {
    ArraySplitOperator,
    ArrayJoinOperator
};
