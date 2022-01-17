import UseHttp from './useHttp'


let form:any={
    email:'',
    password:''
}
class Auth {
    // email:string | undefined
    // password:string | undefined
    useHttp: UseHttp   
    // form: Record<string, string>
    constructor(){
        // this.email=''
        // this.password=''
        this.useHttp=new UseHttp()
        
        // this.form={
        //     email:'',
        //     password:''
        // }
    }

    handleInput(){
        const email=document.querySelector('.email') as HTMLInputElement
        const password=document.querySelector('.password') as HTMLInputElement

        email.addEventListener('change', this.getDataValue)
        password.addEventListener('change', this.getDataValue)
    }
    getDataValue(e:Event){        
        if((e.target as HTMLInputElement).closest('.email')){
            let input=(e.target as HTMLInputElement).closest('.email') as HTMLInputElement
           
           form.email=input.value
            console.log('email',input.value)
        }
        if((e.target as HTMLInputElement).closest('.password')){
            let input=(e.target as HTMLInputElement).closest('.password') as HTMLInputElement
            form.password=input.value
            console.log('password',input.value)
        }
    }
    async registerHandler(){
     
        try{                   
            // const data=await  this.useHttp.request('/api/auth/register', 'POST', {...form})
          
            const response = await fetch('http://localhost:5000/api/auth/register',{ method:'POST', body:JSON.stringify({...form})
            , headers: {
                    'Content-Type': 'application/json'
                  } })
            // const data = await fetch('http://localhost:5000/api/auth/',{mode: 'no-cors'})
           const data=await response.json()
            console.log('response', response)
            if(!response.ok){
                throw new Error(data.message||"Something went wrong")
            }
            return data
        }catch(e){

        }

    }
    handlerRegister(){
        this.handleInput()
        const register=document.querySelector('.register') as HTMLElement
        
        register!.addEventListener('click', this.registerHandler)

    }
}

// new Auth().handleInput()
new Auth().handlerRegister()