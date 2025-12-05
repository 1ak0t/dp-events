import {BaseUserException} from "./base-user.exception.js";
import {StatusCodes} from "http-status-codes";

export class UserPasswordIncorrectException extends BaseUserException {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, 'Не верный логин или пароль');
    }
}