import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Category from "../models/Category";

export default class category_controller{

    /** Créer une catégorie. */
    public static async createCategory(req : Request, res : Response, next: NextFunction): Promise<any>{
        const { category_name } = req.body; 
    
        const category = new Category({
            _category_id : new mongoose.Types.ObjectId(),
            category_name
        });
    
        return category
            .save()
            .then((category) => res.status(201).json( { category }))
            .catch((error) => res.status(500).json( { error } ));
    };
    
    /** Lire une catégorie - ne sera pas utilisé dans l'application. */
    public static async readCategory(req : Request, res : Response, next: NextFunction): Promise<any>{
        const category_id = req.params._category_id;
    
    
        return Category.findById(category_id)
            .then((category) => {
                if (category){
                    res.status(200).json({ category })
                } else {
                    res.status(404).json({ message : 'Category not found' })
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Lire toutes les catégories. */
    public static async readAllCategory(req : Request, res : Response, next: NextFunction): Promise<any>{
        return Category.find()
            .then((category) => res.status(200).json({ category }))
            .catch((error) => res.status(500).json({ error }));
    };

    /** Mettre à jour une catégorie. */
    public static async updateCategory(req : Request, res : Response, next: NextFunction): Promise<any>{
        const category_id = req.params._category_id;
    
        return Category.findByIdAndUpdate(category_id)
            .then((category) => {
                
                if (category) {
                    category.set(req.body).save(),
                    res.status(201).json({ category })
                } else {
                    res.status(404).json({ message : 'Category not found' });
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Supprimer une catégorie. */
    public static async deleteCategory(req : Request, res : Response, next: NextFunction): Promise<any>{
        const category_id = req.params._category_id;
    
        return Category.findByIdAndDelete(category_id)
            .then((category) => {
                if (category) {
                    res.status(200).json({ message: 'Category deleted' })
                } else {
                    res.status(404).json({ message : 'Category not found' })
                }
            })
        .catch((error) => res.status(500).json({ error }));
    };
}