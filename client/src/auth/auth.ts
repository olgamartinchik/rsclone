
let form:any={
    userName:'',
    email:'',
    password:'',
   
}
class Auth {
    constructor(){
    }

    handleInput(){
        const email=document.querySelector('.email') as HTMLInputElement
        const password=document.querySelector('.password') as HTMLInputElement
        const userName=document.querySelector('.userName') as HTMLInputElement

        userName.addEventListener('change', this.getDataValue)
        email.addEventListener('change', this.getDataValue)
        password.addEventListener('change', this.getDataValue)
    }
    getDataValue(e:Event){     
        if((e.target as HTMLInputElement).closest('.userName')){
            let input=(e.target as HTMLInputElement).closest('.userName') as HTMLInputElement           
           form.userName=input.value
            // console.log('userName',input.value)
        }   
        if((e.target as HTMLInputElement).closest('.email')){
            let input=(e.target as HTMLInputElement).closest('.email') as HTMLInputElement           
           form.email=input.value
            // console.log('email',input.value)
        }
        if((e.target as HTMLInputElement).closest('.password')){
            let input=(e.target as HTMLInputElement).closest('.password') as HTMLInputElement
            form.password=input.value
            // console.log('password',input.value)
        }

    }
    // async registerHandler(){
     
    //     try{            
    //         const response = await fetch(`http://localhost:5000/api/auth/register`,{ method:'POST', body:JSON.stringify({...form})
    //         , headers: {
    //                 'Content-Type': 'application/json'
    //               }})
    //        const data=await response.json()
    //         console.log('response', response)
    //         if(!response.ok){
    //             throw new Error(data.message||"Something went wrong")
    //         }
    //         console.log('data', data.message)
    //         return data
    //     }catch(e:any){
    //         console.log('error', e.message)
    //     }

    // }
    async loginHandler(path:string){
     console.log('form',form)
        try{            
            const response = await fetch(`http://localhost:5000/api/auth/${path}`,{ method:'POST', body:JSON.stringify({...form})
            , headers: {
                    'Content-Type': 'application/json'
                  }})
           const data=await response.json()
            console.log('response', response)
            if(!response.ok){
                throw new Error(data.message||"Something went wrong")
            }
            console.log('data', data.message, data)
            return data
        }catch(e:any){
            console.log('error', e.message)
        }

    }
    // createMessage(text:string){
    //     if(window.M && text){
    //         window.M.toast({html:text})
    //     }
    // }
    // handlerLogin(){
    //     console.log('click')
    //     this.handleInput()
    //     const enter=document.querySelector('.enter') as HTMLElement
    //     enter.addEventListener('click', ()=>{
    //         this.loginHandler('login')
    //     })
    // }
    // handlerRegister(){
    //     this.handleInput()
    //     const register=document.querySelector('.register') as HTMLElement
        
    //     register!.addEventListener('click', this.registerHandler)

    // }
    enterHandler(){
        
        this.handleInput()
        const enter=document.querySelector('.enter') as HTMLElement
        enter.addEventListener('click', ()=>{
            this.loginHandler('login')
        })
      
        const register=document.querySelector('.register') as HTMLElement
        
        register!.addEventListener('click', ()=>{
            this.loginHandler('register')
        })
    }
}

// new Auth().handleInput()
// new Auth().handlerRegister()
// new Auth().handlerLogin()
new Auth().enterHandler()