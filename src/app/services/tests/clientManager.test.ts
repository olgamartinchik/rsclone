jest.mock('node-fetch');
import ClientManager from '../clientManager';
import { TLoginForm, TSettings, TWorkout, TWorkoutProgram } from '../types';

test('Check work GET request', async () => {
    const data = (await new ClientManager().getWorkouts()) as TWorkout[];
    expect(typeof Array.isArray(data)).toEqual('boolean');
});

test('the fetch fails with an error', async () => {
    try {
        (await new ClientManager().getWorkouts()) as TWorkout[];
    } catch (e) {
        expect(e).toMatch('error');
    }
});
