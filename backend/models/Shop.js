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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Product_1 = __importDefault(require("./Product"));
/** Création du Schéma qui sera utilisé pour stocker les données dans la base de données. */
const shopSchema = new mongoose_1.Schema({
    shop_name: { type: String, required: false },
    shop_description: { type: String, required: false }
}, 
// Pas besoin de la versionKey
{ versionKey: false });
/** Fonctionnalité : Suppression de la référence du magasin dans les produits
 * lors de la suppression du magasin, via le middleware. */
shopSchema.pre('remove', function (next) {
    Product_1.default.remove({ product_shop: this._id }).exec();
    next();
});
/** Exporter le modèle pour qu'il soit utilisable ailleurs */
exports.default = mongoose_1.default.model('Shop', shopSchema);
