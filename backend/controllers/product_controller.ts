import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product, { IProduct } from "../models/Product";


export default class product_controller{

    /** Créer un produit. */
    public static async createProduct(req : Request, res : Response, next: NextFunction): Promise<any>{
        const { product_check, product_name, product_quantity, product_shop, product_category, product_budget, product_price, product_description } = req.body; 

        const product = new Product({
            _product_id : new mongoose.Types.ObjectId(),
            product_check,
            product_name,
            product_quantity,
            product_shop,
            product_category,
            product_budget,
            product_price,
            product_description,
            //On obtien l'ID de la liste de course via la requête
            _main_list_id : req.params._main_list_id

        });
    
        return product
            .save()
            .then((product) => res.status(201).json( { product }))
            .catch((error) => res.status(500).json( { error } ));
    };
    
    /** Lire un produit - ne sera pas utilisé dans l'application. */
    public static async readProduct(req : Request, res : Response, next: NextFunction): Promise<any>{
        const product_id = req.params._product_id;   
    
        return Product.findById(product_id)
            .then((product) => {
                if (product) {
                    res.status(200).json({ product })
                } else {
                    res.status(404).json({ message : 'Product not found' })
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Lire tous les produits. */
    public static async readAllProduct(req : Request, res : Response, next: NextFunction): Promise<any>{
        const shoppingListID = {_main_list_id : req.params._main_list_id };

        return Product.find( shoppingListID ).populate('product_shop').populate('product_category').exec()
            .then((products) => res.status(200).json( { products }))
            .catch((error) => res.status(500).json({ error }));
    };
    
    /** Mettre à jour un produit. */
    public static async updateProduct(req : Request, res : Response, next: NextFunction): Promise<any>{
        const product_id = req.params._product_id;
        
        return Product.findByIdAndUpdate(product_id)
            .then((product) => {
                if (product) {
                    product.set(req.body).save(),
                    res.status(201).json({ product })
                } else {
                    res.status(404).json({ message : 'Product not found' });
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };

    /** Supprimer un produit. */
    public static async deleteProduct(req : Request, res : Response, next: NextFunction): Promise<any>{
        const product_id = req.params._product_id;

        return Product.findByIdAndDelete(product_id)
            .then((product) => {
                if (product) {
                    res.status(200).json({ message: 'Product deleted' })
                } else {
                    res.status(404).json({ message : 'Product not found' })
                }
            })
            .catch((error) => res.status(500).json({ error }));
    };
}