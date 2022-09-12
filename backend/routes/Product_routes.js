"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product_controller"));
const API_VERSION = '/api/v1/';
const ELEMENT = 'mainlist/:_main_list_id/products';
let router = express_1.default.Router();
// Répond aux endpoints http://localhost:1992/api/v1/mainlist/:_main_list_id/products 
//                   ou http://localhost:1992/api/v1/mainlist/:_main_list_id/products/:_product_id
router.post(API_VERSION + ELEMENT, product_controller_1.default.createProduct);
router.get(API_VERSION + ELEMENT, product_controller_1.default.readAllProduct);
router.get(API_VERSION + ELEMENT + "/:_product_id", product_controller_1.default.readProduct);
router.patch(API_VERSION + ELEMENT + "/:_product_id", product_controller_1.default.updateProduct);
router.delete(API_VERSION + ELEMENT + "/:_product_id", product_controller_1.default.deleteProduct);
module.exports = router;
