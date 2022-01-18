import 'materialize-css'

let form:any={
    userName:'',
    email:'',
    password:'',
   
}
declare global {
    interface Window {
      M?: any;
    }
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
        }   
        if((e.target as HTMLInputElement).closest('.email')){
            let input=(e.target as HTMLInputElement).closest('.email') as HTMLInputElement           
           form.email=input.value
        }
        if((e.target as HTMLInputElement).closest('.password')){
            let input=(e.target as HTMLInputElement).closest('.password') as HTMLInputElement
            form.password=input.value
        }

    }
    
    async responseHandler(path:string){
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
            this.createMessage(data.message)
            return data
        }catch(e:any){
            this.createMessage(e.message)
            console.log('error', e.message)
        }

    }
    createMessage(text:string){
        if(window.M && text){
            window.M.toast({html:text})
        }
    }
   
    enterHandler(){        
        this.handleInput()
        const enter=document.querySelector('.enter') as HTMLElement
        enter.addEventListener('click', ()=>{
            this.responseHandler('login')
        })      
        const register=document.querySelector('.register') as HTMLElement        
        register!.addEventListener('click', ()=>{
            this.responseHandler('register')
        })
    }
}


new Auth().enterHandler()