import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = "Database connection error";
    status = 500;

    constructor() {
        super("Database error");

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    };

    serializeError() {
        return [{message: this.reason}];
    };
}