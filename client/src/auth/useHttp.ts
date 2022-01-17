
// export interface IData{
//     email?:string
//     password?:string
// }

class UseHttp{
    loading:boolean|null|undefined
    error:string|null|undefined
    constructor(){
        this.loading=false
        this.error=null
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
   async request(url:string, method="GET", body=null, headers:HeadersInit | undefined={}):Promise<Record<string, string>>{
        this.loading=true
        try{
            const response= await fetch(url, {method,body,headers})
            const data =await response.json()
            if(!response.ok){
                throw new Error(data.message||"Something went wrong")
            }
            this.loading=false
            return data
            
        }catch(e:string|null|undefined|any){
            this.loading=false
            this.error=e.message
            throw e
        }
    }

    clearError(){
       this.error=null 
    } 
}

export default UseHttp