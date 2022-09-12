import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Shop from "../models/Shop";

export default class shop_controller{

    /** Créer un magasin. */
    public static async createShop(req : Request, res : Response, next: NextFunction): Promise<any>{
        const { shop_name, shop_description } = req.body; 
    
        let shop = new Shop({
            _shop_id : new mongoose.Types.ObjectId(),
            shop_name,
            shop_description
        });
    
        return shop
            .save()
            .then((shop) => res.status(201).json({ shop }))
            .catch((error) => res.status(500).json({ error }));
    };
    
    /** Lire un magasin - ne sera pas utilisé dans l'application. */
    public static async readShop(req : Request, res : Response, next: NextFunction): Promise<any>{
        const shop_id = req.params._shop_id;
    
        return Shop.findById(shop_id)
            .then((shop) => {
                if (shop) {
                    res.status(200).json({ shop })
                } else {
                    res.status(404).json({ message : 'Shop not found' })
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Lire tous les magasins. */
    public static async readAllShops(req : Request, res : Response, next: NextFunction): Promise<any>{
        return Shop.find()
            .then((shop) => res.status(200).json({ shop }))
            .catch((error) => res.status(500).json({ error }));
    };
    
    /** Mettre à jour un magasin. */
    public static async updateShop(req : Request, res : Response, next: NextFunction): Promise<any>{
        const shop_id = req.params._shop_id;
    
        return Shop.findByIdAndUpdate(shop_id)
            .then((shop) => {
                if (shop) {
                    shop.set(req.body).save(),
                    res.status(201).json({ shop })
                } else {
                    res.status(404).json({ message : 'Shop not found'})
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Supprimer un magasin. */
    public static async deleteShop(req : Request, res : Response, next: NextFunction): Promise<any>{
        const shop_id = req.params._shop_id;
    
        return Shop.findByIdAndDelete(shop_id)
            .then((shop) => {
                if (shop) {
                    res.status(200).json({ message: 'Shop deleted' })
                } else {
                    res.status(404).json({ message : 'Shop not found' })
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };
}