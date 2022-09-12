import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import MainList from "../models/Mainlist";
import Product from "../models/Product";

export default class mainlist_controller{

    /** Créer un une liste de courses. */
    public static async createMainlist(req : Request, res : Response, next: NextFunction): Promise<any>{
        const { products_name, products_date } = req.body; 
 
        const mainlist = new MainList({
            _main_list_id : new mongoose.Types.ObjectId(),
            products_name,
            products_date
        });
    
        return mainlist
            .save()
            .then((mainlist) => res.status(201).json({ mainlist }))
            .catch((error) => res.status(500).json({ error }));
    };
    
    /** Lire un une liste de courses - ne sera pas utilisé dans l'application. */
    public static async readMainlist(req : Request, res : Response, next: NextFunction): Promise<any>{
        const _main_list_id = req.params._main_list_id;
    
    
        return MainList.findById(_main_list_id)
            .then((mainlist) => {
                if (mainlist) {
                    res.status(200).json({ mainlist })
                } else {
                    res.status(404).json({ message : 'Shopping list not found' })
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Lire toutes les listes de courses. */
    public static async readAllMainlist(req : Request, res : Response, next: NextFunction): Promise<any>{
        return MainList.find()
            .then((mainlist) => res.status(200).json( { mainlist }))
            .catch((error) => res.status(500).json({ error }));
    };
    
    /** Mettre à jour une liste de courses. */
    public static async updateMainlist(req : Request, res : Response, next: NextFunction): Promise<any>{
        const main_list_id = req.params._main_list_id;
    
        return MainList.findByIdAndUpdate(main_list_id)
            .then((mainlist) => {
                if (mainlist) {
                    mainlist.set(req.body).save(),
                    res.status(201).json({ mainlist })    
                } else {
                    res.status(404).json({ message : 'Shopping list not found' });
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Supprimer une liste de courses. */
    public static async deleteMainlist(req : Request, res : Response, next: NextFunction): Promise<any>{
        const main_list_id = req.params._main_list_id;
    
        return MainList.findByIdAndDelete(main_list_id)
            .then((mainlist) => {
                if (mainlist) {
                    // Suppression dans la base de données tous les produits
                    // contenu dans la liste de courses supprimée.
                    Product.deleteMany({ _main_list_id : main_list_id }).exec();
                    res.status(200).json({ message: 'Shopping list deleted' })
                } else {
                    res.status(404).json({ message : 'Shopping list not found' })
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };
}