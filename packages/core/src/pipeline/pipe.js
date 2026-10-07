const { EventEmitter } = require('events')

class Pipe extends EventEmitter {
    constructor() {
        super();
    }

    push(data) {
        this.emit('itemPushed', data);
    }
}

module.exports = Pipe;