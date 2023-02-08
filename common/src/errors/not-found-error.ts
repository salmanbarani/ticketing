import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    status = 404;
    constructor () {
        super("Not found");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError(){
        return [{message: "Not found"}]
    }
}