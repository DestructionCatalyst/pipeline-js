const Pipe = require("./pipe");

/**
 *
 * @param {Optional} output
 * @param {Optional} input
 * @param {typeof Pipe} pipe
 */
const connect = (output, input, pipe = Pipe) => {
    const newPipe = new pipe();

    output
        .forValue(() => {
            throw new Error(`OutputAlreadyUsed: ${output}`);
        })
        .forEmpty(() => {
            return newPipe;
        });

    input
        .forValue(() => {
            throw new Error(`InputAlreadyUsed: ${output}`);
        })
        .forEmpty(() => {
            return newPipe;
        });
}

module.exports = connect;