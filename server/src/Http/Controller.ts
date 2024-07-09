import App from "../App";

export abstract class Controller {
    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    abstract register(): void;
}
