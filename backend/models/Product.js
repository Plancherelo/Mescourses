"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
/** Création du Schéma qui sera utilisé pour stocker les données dans la base de données. */
const productSchema = new mongoose_1.Schema({
    product_check: { type: Boolean, default: false, required: false },
    product_name: { type: String, required: true },
    product_quantity: { type: String, required: false },
    product_shop: { type: mongoose_1.Schema.Types.ObjectId, default: null, ref: 'Shop', required: false },
    product_category: { type: mongoose_1.Schema.Types.ObjectId, default: null, ref: 'Category', required: false },
    product_budget: { type: Number, required: false },
    product_price: { type: Number, required: false },
    product_description: { type: String, required: false },
    _main_list_id: { type: mongoose_1.default.Types.ObjectId, ref: 'Mainlist', required: true },
}, 
// Pas besoin de la versionKey
{ versionKey: false });
/** Exporter le modèle pour qu'il soit utilisable ailleurs */
exports.default = mongoose_1.default.model('Product', productSchema);
