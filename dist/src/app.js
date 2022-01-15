var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
app.use('/api/auth', require('../routes/auth.routes'));
const PORT = config.get("port") || 5000;
//////
// app.get('/', (req, res) => {
//   res.send('The sedulous hyena ate the antelope!');
// });
//////
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(config.get("mongoUri"), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));
        }
        catch (e) {
            console.log("Server Error", e.message);
            process.exit(1);
        }
    });
}
start();
//# sourceMappingURL=app.js.map