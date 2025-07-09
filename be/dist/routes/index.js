"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testRoutes_1 = __importDefault(require("./testRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const accountRoutes_1 = __importDefault(require("./accountRoutes"));
const transactionsRoutes_1 = __importDefault(require("./transactionsRoutes"));
const stockRoutes_1 = __importDefault(require("./stockRoutes"));
const router = express_1.default.Router();
router.use("/test", testRoutes_1.default);
router.use("/auth", authRoutes_1.default);
router.use("/acc", accountRoutes_1.default);
router.use("/trans", transactionsRoutes_1.default);
router.use("/stock", stockRoutes_1.default);
exports.default = router;
