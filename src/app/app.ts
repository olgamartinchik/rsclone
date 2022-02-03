import authManager from './services/authManager';

class App {
    public start(): void {
        authManager.checkAuth();
    }
}

export default App;
