class InvalidContentError extends Error {
    constructor(message) {
        super('invalid content: ' + message);
        this.name = "InvalidContentError";
    }
}

class UnsupportedContentError extends Error {
    constructor(message) {
        super('unsupported content: ' + message);
        this.name = "UnsupportedContentError";
    }
}

module.exports = InvalidContentError, UnsupportedContentError;