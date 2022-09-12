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
const Mainlist_1 = __importDefault(require("../models/Mainlist"));
const Product_1 = __importDefault(require("../models/Product"));
class mainlist_controller {
    /** Créer un une liste de courses. */
    static createMainlist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products_name, products_date } = req.body;
            const mainlist = new Mainlist_1.default({
                _main_list_id: new mongoose_1.default.Types.ObjectId(),
                products_name,
                products_date
            });
            return mainlist
                .save()
                .then((mainlist) => res.status(201).json({ mainlist }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire un une liste de courses - ne sera pas utilisé dans l'application. */
    static readMainlist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const _main_list_id = req.params._main_list_id;
            return Mainlist_1.default.findById(_main_list_id)
                .then((mainlist) => {
                if (mainlist) {
                    res.status(200).json({ mainlist });
                }
                else {
                    res.status(404).json({ message: 'Shopping list not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire toutes les listes de courses. */
    static readAllMainlist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return Mainlist_1.default.find()
                .then((mainlist) => res.status(200).json({ mainlist }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Mettre à jour une liste de courses. */
    static updateMainlist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const main_list_id = req.params._main_list_id;
            return Mainlist_1.default.findByIdAndUpdate(main_list_id)
                .then((mainlist) => {
                if (mainlist) {
                    mainlist.set(req.body).save(),
                        res.status(201).json({ mainlist });
                }
                else {
                    res.status(404).json({ message: 'Shopping list not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Supprimer une liste de courses. */
    static deleteMainlist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const main_list_id = req.params._main_list_id;
            return Mainlist_1.default.findByIdAndDelete(main_list_id)
                .then((mainlist) => {
                if (mainlist) {
                    // Suppression dans la base de données tous les produits
                    // contenu dans la liste de courses supprimée.
                    Product_1.default.deleteMany({ _main_list_id: main_list_id }).exec();
                    res.status(200).json({ message: 'Shopping list deleted' });
                }
                else {
                    res.status(404).json({ message: 'Shopping list not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
}
exports.default = mainlist_controller;
