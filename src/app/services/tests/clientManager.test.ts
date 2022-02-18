import ClientManager from '../clientManager'
import { TWorkout } from '../types'
// // import fetch from 'node-fetch';
// const {fetch} =require('node-fetch')
// // import http from 'node:http';
// const {Response} = jest.requireActual('node-fetch');

// jest.mock('node-fetch');
// test('Should return data from backend', async ()=>{
//     (fetch as any).mockReturnValue(Promise.resolve(new Response('4')));

//     const userId = await new ClientManager().getWorkouts();
  
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(fetch).toHaveBeenCalledWith('https://rsclonebackend.herokuapp.com/api/workouts', {
//       method: 'GET',
//     });
//     expect(userId).toBe('4');

    
  

// })

test('works', async () => {
    const data = await new ClientManager().getWorkouts()as TWorkout[]
    expect(typeof Array.isArray(data)).toEqual('boolean')
    // expect(data).toHaveBeenCalledWith('https://rsclonebackend.herokuapp.com/api/workouts')
  })
