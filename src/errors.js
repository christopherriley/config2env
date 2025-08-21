export class InvalidContentError extends Error {
    constructor(message) {
        super('invalid content: ' + message);
        this.name = "InvalidContentError";
    }
}

// test test 2
export class UnsupportedContentError extends Error {
    constructor(message) {
        super('unsupported content: ' + message);
        this.name = "UnsupportedContentError";
    }
}

