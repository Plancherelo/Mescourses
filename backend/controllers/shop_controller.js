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
const Shop_1 = __importDefault(require("../models/Shop"));
class shop_controller {
    /** Créer un magasin. */
    static createShop(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shop_name, shop_description } = req.body;
            let shop = new Shop_1.default({
                _shop_id: new mongoose_1.default.Types.ObjectId(),
                shop_name,
                shop_description
            });
            return shop
                .save()
                .then((shop) => res.status(201).json({ shop }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire un magasin - ne sera pas utilisé dans l'application. */
    static readShop(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop_id = req.params._shop_id;
            return Shop_1.default.findById(shop_id)
                .then((shop) => {
                if (shop) {
                    res.status(200).json({ shop });
                }
                else {
                    res.status(404).json({ message: 'Shop not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Lire tous les magasins. */
    static readAllShops(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return Shop_1.default.find()
                .then((shop) => res.status(200).json({ shop }))
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Mettre à jour un magasin. */
    static updateShop(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop_id = req.params._shop_id;
            return Shop_1.default.findByIdAndUpdate(shop_id)
                .then((shop) => {
                if (shop) {
                    shop.set(req.body).save(),
                        res.status(201).json({ shop });
                }
                else {
                    res.status(404).json({ message: 'Shop not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
    /** Supprimer un magasin. */
    static deleteShop(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop_id = req.params._shop_id;
            return Shop_1.default.findByIdAndDelete(shop_id)
                .then((shop) => {
                if (shop) {
                    res.status(200).json({ message: 'Shop deleted' });
                }
                else {
                    res.status(404).json({ message: 'Shop not found' });
                }
            })
                .catch((error) => res.status(500).json({ error }));
        });
    }
    ;
}
exports.default = shop_controller;
