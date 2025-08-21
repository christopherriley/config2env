export class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = "AppError";
    }
}

export class InvalidContentError extends AppError {
    constructor(message) {
        super('invalid content: ' + message);
        this.name = "InvalidContentError";
    }
}

export class UnsupportedContentError extends AppError {
    constructor(message) {
        super('unsupported content: ' + message);
        this.name = "UnsupportedContentError";
    }
}
