"use strict";
// export interface IData{
//     email?:string
//     password?:string
// }
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
class UseHttp {
    constructor() {
        this.loading = false;
        this.error = null;
    }
    // hook():object{
    //    const request   =  async (url:string, method="GET", body=null, headers={}):Promise<IData>=>{
    //         this.loading=true
    //         try{
    //             const response= await fetch(url, {method,body,headers})
    //             const data =await response.json()
    //             if(!response.ok){
    //                 throw new Error(data.message||"Something went wrong")
    //             }
    //             this.loading=false
    //             return data
    //         }catch(e:string|null|undefined|any){
    //             this.loading=false
    //             this.error=e.message
    //             throw e
    //         }
    //      }
    //      const clearError=this.clearError()
    //      const loading=this.loading
    //      const error=this.error
    //     return {loading, request, error,clearError}
    // }
    request(url, method = "GET", body = null, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            try {
                const response = yield fetch(url, { method, body, headers });
                const data = yield response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Something went wrong");
                }
                this.loading = false;
                return data;
            }
            catch (e) {
                this.loading = false;
                this.error = e.message;
                throw e;
            }
        });
    }
    clearError() {
        this.error = null;
    }
}
exports.default = UseHttp;
//# sourceMappingURL=useHttp.js.map