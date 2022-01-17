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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useHttp_1 = __importDefault(require("./useHttp"));
let form = {
    email: '',
    password: ''
};
class Auth {
    // form: Record<string, string>
    constructor() {
        // this.email=''
        // this.password=''
        this.useHttp = new useHttp_1.default();
        // this.form={
        //     email:'',
        //     password:''
        // }
    }
    handleInput() {
        const email = document.querySelector('.email');
        const password = document.querySelector('.password');
        email.addEventListener('change', this.getDataValue);
        password.addEventListener('change', this.getDataValue);
    }
    getDataValue(e) {
        if (e.target.closest('.email')) {
            let input = e.target.closest('.email');
            form.email = input.value;
            console.log('email', input.value);
        }
        if (e.target.closest('.password')) {
            let input = e.target.closest('.password');
            form.password = input.value;
            console.log('password', input.value);
        }
    }
    registerHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('click');
            // const email=this.form!.email
            // const password=this.form!.password
            try {
                // const data=await  this.useHttp.request('/api/auth/register', 'POST', null, form)
                const data = yield fetch('http://localhost:5000/api/auth/register', { method: 'POST', body: JSON.stringify(Object.assign({}, form)) });
                console.log('data', data);
            }
            catch (e) {
            }
        });
    }
    handlerRegister() {
        this.handleInput();
        const register = document.querySelector('.register');
        register.addEventListener('click', this.registerHandler);
    }
}
// new Auth().handleInput()
new Auth().handlerRegister();
//# sourceMappingURL=auth.js.map