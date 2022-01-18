"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("materialize-css");
let form = {
    userName: '',
    email: '',
    password: '',
};
class Auth {
    constructor() {
    }
    handleInput() {
        const email = document.querySelector('.email');
        const password = document.querySelector('.password');
        const userName = document.querySelector('.userName');
        userName.addEventListener('change', this.getDataValue);
        email.addEventListener('change', this.getDataValue);
        password.addEventListener('change', this.getDataValue);
    }
    getDataValue(e) {
        if (e.target.closest('.userName')) {
            let input = e.target.closest('.userName');
            form.userName = input.value;
        }
        if (e.target.closest('.email')) {
            let input = e.target.closest('.email');
            form.email = input.value;
        }
        if (e.target.closest('.password')) {
            let input = e.target.closest('.password');
            form.password = input.value;
        }
    }
    responseHandler(path) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('form', form);
            try {
                const response = yield fetch(`http://localhost:5000/api/auth/${path}`, { method: 'POST', body: JSON.stringify(Object.assign({}, form)),
                    headers: {
                        'Content-Type': 'application/json'
                    } });
                const data = yield response.json();
                console.log('response', response);
                if (!response.ok) {
                    throw new Error(data.message || "Something went wrong");
                }
                console.log('data', data.message, data);
                this.createMessage(data.message);
                return data;
            }
            catch (e) {
                this.createMessage(e.message);
                console.log('error', e.message);
            }
        });
    }
    createMessage(text) {
        if (window.M && text) {
            window.M.toast({ html: text });
        }
    }
    enterHandler() {
        this.handleInput();
        const enter = document.querySelector('.enter');
        enter.addEventListener('click', () => {
            this.responseHandler('login');
        });
        const register = document.querySelector('.register');
        register.addEventListener('click', () => {
            this.responseHandler('register');
        });
    }
}
new Auth().enterHandler();
//# sourceMappingURL=auth.js.map