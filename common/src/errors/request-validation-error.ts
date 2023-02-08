import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class RequestValidationError extends CustomError {
    status = 400;

    constructor(public erros: ValidationError[]) {
        super("validation error");

         Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        return  this.erros.map(error => {
                return { message: error.msg, field: error.param};
            })
    };
}