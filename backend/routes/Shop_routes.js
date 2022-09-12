"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const shop_controller_1 = __importDefault(require("../controllers/shop_controller"));
const API_VERSION = '/api/v1/';
const ELEMENT = 'shops';
let router = express_1.default.Router();
// Répond aux endpoints http://localhost:1992/api/v1/shops
//                   ou http://localhost:1992/api/v1/shops/:_shop_id
router.post(API_VERSION + ELEMENT, shop_controller_1.default.createShop);
router.get(API_VERSION + ELEMENT, shop_controller_1.default.readAllShops);
router.get(API_VERSION + ELEMENT + "/:_shop_id", shop_controller_1.default.readShop);
router.patch(API_VERSION + ELEMENT + "/:_shop_id", shop_controller_1.default.updateShop);
router.delete(API_VERSION + ELEMENT + "/:_shop_id", shop_controller_1.default.deleteShop);
module.exports = router;
