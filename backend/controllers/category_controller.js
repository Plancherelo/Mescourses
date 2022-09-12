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
const Category_1 = __importDefault(require("../models/Category"));
class category_controller {
    /** Créer une catégorie. */
    static createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category_name } = req.body;
            const category = new Category_1.default({
                _category_id: new mongoose_1.default.Types.ObjectId(),
                category_name
            });
            return category
                .save()
                .then((category) => res.status(201).json({ category }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire une catégorie - ne sera pas utilisé dans l'application. */
    static readCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = req.params._category_id;
            return Category_1.default.findById(category_id)
                .then((category) => {
                if (category) {
                    res.status(200).json({ category });
                }
                else {
                    res.status(404).json({ message: 'Category not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire toutes les catégories. */
    static readAllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return Category_1.default.find()
                .then((category) => res.status(200).json({ category }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Mettre à jour une catégorie. */
    static updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = req.params._category_id;
            return Category_1.default.findByIdAndUpdate(category_id)
                .then((category) => {
                if (category) {
                    category.set(req.body).save(),
                        res.status(201).json({ category });
                }
                else {
                    res.status(404).json({ message: 'Category not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Supprimer une catégorie. */
    static deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = req.params._category_id;
            return Category_1.default.findByIdAndDelete(category_id)
                .then((category) => {
                if (category) {
                    res.status(200).json({ message: 'Category deleted' });
                }
                else {
                    res.status(404).json({ message: 'Category not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
}
exports.default = category_controller;
