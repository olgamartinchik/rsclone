import authManager, { AuthManager } from './services/authManager';

class App {
    authManager: AuthManager;

    constructor() {
        this.authManager = authManager;
    }

    public start(): void {
        this.authManager.navigate();
    }
}

export default App;
