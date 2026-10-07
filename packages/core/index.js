const { Optional, OptionalError } = require("./src/util/optional");
const Operator = require("./src/pipeline/operator");
const Pipe = require("./src/pipeline/pipe");
const connect = require("./src/pipeline/connect");

module.exports = {
    Optional,
    OptionalError,
    Operator,
    Pipe,
    connect
}