"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../models/Product"));
class product_controller {
    /** Créer un produit. */
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_check, product_name, product_quantity, product_shop, product_category, product_budget, product_price, product_description } = req.body;
            const product = new Product_1.default({
                _product_id: new mongoose_1.default.Types.ObjectId(),
                product_check,
                product_name,
                product_quantity,
                product_shop,
                product_category,
                product_budget,
                product_price,
                product_description,
                //On obtien l'ID de la liste de course via la requête
                _main_list_id: req.params._main_list_id
            });
            return product
                .save()
                .then((product) => res.status(201).json({ product }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire un produit - ne sera pas utilisé dans l'application. */
    static readProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product_id = req.params._product_id;
            return Product_1.default.findById(product_id)
                .then((product) => {
                if (product) {
                    res.status(200).json({ product });
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire tous les produits. */
    static readAllProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const shoppingListID = { _main_list_id: req.params._main_list_id };
            return Product_1.default.find(shoppingListID).populate('product_shop').populate('product_category').exec()
                .then((products) => res.status(200).json({ products }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Mettre à jour un produit. */
    static updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product_id = req.params._product_id;
            return Product_1.default.findByIdAndUpdate(product_id)
                .then((product) => {
                if (product) {
                    product.set(req.body).save(),
                        res.status(201).json({ product });
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Supprimer un produit. */
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product_id = req.params._product_id;
            return Product_1.default.findByIdAndDelete(product_id)
                .then((product) => {
                if (product) {
                    res.status(200).json({ message: 'Product deleted' });
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
}
exports.default = product_controller;
