const { EventEmitter } = require('events');

class OptionalError extends Error {}

class Optional extends EventEmitter {
    constructor(value = Optional.NoValue) {
        super();

        this._value = value;
    }

    /**
     * Symbol for no value
     * @returns {symbol}
     */
    static get NoValue() {
        return Symbol.for('OptionalNoValue');
    }

    /**
     * Returns value if not empty, throws an exception if empty
     * @throws OptionalError
     * @returns {any}
     */
    get value() {
        if (this._value === Optional.NoValue) {
            throw new OptionalError('OptionalNoValue');
        }
        return this._value;
    }

    /**
     * Changes the value of the optional
     * @param {any} newValue
     * @emits 'set'
     */
    set value(newValue) {
        this._value = newValue;

        this.emit('set', newValue);
    }

    /**
     * Transforms the value according to the cb, does nothing if empty
     * @param {function (any, Optional): any} cb
     * @emits 'set'
     * @returns {Optional}
     */
    forValue(cb) {
        if (this._value !== Optional.NoValue) {
            const newValue = cb(this._value, this);
            const oldValue = this._value;
            this._value = newValue;

            if (newValue !== oldValue) {
                this.emit('set', newValue);
            }
        }
        return this;
    }

    /**
     * Sets the value to the return value of cb if empty, does nothing if not empty
     * @param {function (Optional): any} cb
     * @returns {Optional}
     */
    forEmpty(cb) {
        if (this._value === Optional.NoValue) {
            const newValue = cb(this);
            this._value = newValue;

            if (newValue !== Optional.NoValue) {
                this.emit('set', newValue);
            }
        }
        return this;
    }

    /**
     *
     * @param {function (any, Optional): void} cb
     * @returns {Optional}
     */
    ifValue(cb) {
        this.forValue((value, optional) => {
            cb(value, optional);
            return value;
        })

        return this;
    }

    /**
     *
     * @param {function (Optional): void} cb
     * @returns {Optional}
     */
    ifEmpty(cb) {
        this.forValue((optional) => {
            cb(optional);
            return Optional.NoValue;
        })

        return this;
    }
}

module.exports = {
    Optional,
    OptionalError
}