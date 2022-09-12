"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category_controller"));
const API_VERSION = '/api/v1/';
const ELEMENT = 'categories';
let router = express_1.default.Router();
// Répond aux endpoints http://localhost:1992/api/v1/category
//                   ou http://localhost:1992/api/v1/category/:_category_id
router.post(API_VERSION + ELEMENT, category_controller_1.default.createCategory);
router.get(API_VERSION + ELEMENT, category_controller_1.default.readAllCategory);
router.get(API_VERSION + ELEMENT + "/:_category_id", category_controller_1.default.readCategory);
router.patch(API_VERSION + ELEMENT + "/:_category_id", category_controller_1.default.updateCategory);
router.delete(API_VERSION + ELEMENT + "/:_category_id", category_controller_1.default.deleteCategory);
module.exports = router;
