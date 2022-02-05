import authManager, { AuthManager } from './services/authManager';

class App {
    authManager: AuthManager;

    constructor() {
        this.authManager = authManager;
    }

    public start(): void {
        this.authManager.navigate();
        console.log('start authcheck');
    }
}

export default App;
