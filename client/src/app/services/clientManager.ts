import { TLoginForm } from '../services/types';

class ClientManager {
  private static _instance: ClientManager = new ClientManager();

  constructor() {
      if(ClientManager._instance){
          throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
      }
      ClientManager._instance = this;
  }

  public static getInstance(): ClientManager
  {
      return ClientManager._instance;
  }

  public async getResponse(path:string, form: TLoginForm){
    console.log('form', form)
       try{            
           const response = await fetch(`https://rsclonebackend.herokuapp.com/api/auth/${path}`,{ method:'POST', body:JSON.stringify({...form})
           , headers: {
                   'Content-Type': 'application/json'
                 }})
          const data=await response.json()
           console.log('response', response)
           if(!response.ok){
               throw new Error(data.message||"Something went wrong")
           }
           console.log('data', data.message, data)
           // this.createMessage(data.message)
           return data
       }catch(e:any){
           // this.createMessage(e.message)
           console.log('error', e.message)
       }

  }
}

export default ClientManager;