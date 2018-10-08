"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController = require("../controllers/api");
class Api {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', apiController.getApi);
    }
}
const apiRoutes = new Api();
exports.default = apiRoutes.router;
//# sourceMappingURL=api.js.map