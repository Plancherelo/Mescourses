"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mainlist_controller_1 = __importDefault(require("../controllers/mainlist_controller"));
const API_VERSION = '/api/v1/';
const ELEMENT = 'mainlist';
let router = express_1.default.Router();
// Répond aux endpoints http://localhost:1992/api/v1/mainlist
//                   ou http://localhost:1992/api/v1/mainlist/:_main_list_id
router.post(API_VERSION + ELEMENT, mainlist_controller_1.default.createMainlist);
router.get(API_VERSION + ELEMENT, mainlist_controller_1.default.readAllMainlist);
router.get(API_VERSION + ELEMENT + "/:_main_list_id", mainlist_controller_1.default.readMainlist);
router.patch(API_VERSION + ELEMENT + "/:_main_list_id", mainlist_controller_1.default.updateMainlist);
router.delete(API_VERSION + ELEMENT + "/:_main_list_id", mainlist_controller_1.default.deleteMainlist);
module.exports = router;
