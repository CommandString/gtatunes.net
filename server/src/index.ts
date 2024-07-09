import App from "./App";
import Stations from "./Http/Stations";

const app = new App();

[Stations].forEach(controllerClass => {
    const controller = new controllerClass(app);
    controller.register();
});

app.http.listen(parseInt(process.env.HTTP_PORT!), () => {
    console.log('HTTP server is running on port ' + process.env.HTTP_PORT!);
});

app.http.use((req, res) => {
    res.status(404).send({
        'error': "Endpoint not found"
    });
});
