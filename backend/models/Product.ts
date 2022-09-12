import mongoose, { Schema, Types } from 'mongoose';
import { ICategory } from './Category';
import { IShop } from './Shop';

/** Création de l'interface produit. */
export interface IProduct {
  product_check? : boolean;
  product_name : string;
  product_quantity? : string;
  product_shop? : IShop;
  product_category? : ICategory;
  product_budget? : number;
  product_price? : number;
  product_description? : string;
  _main_list_id : String;
}

/** Création du Schéma qui sera utilisé pour stocker les données dans la base de données. */
const productSchema = new Schema<IProduct>({
    product_check : { type: Boolean, default:false, required:false },
    product_name: { type: String, required: true },
    product_quantity : { type: String, required:false },
    product_shop : { type : Schema.Types.ObjectId , default : null, ref: 'Shop', required:false},
    product_category : { type : Schema.Types.ObjectId , default : null, ref: 'Category', required:false},
    product_budget : { type: Number, required:false },
    product_price : { type: Number, required:false },
    product_description : { type: String, required:false },
    _main_list_id : {type: mongoose.Types.ObjectId,  ref: 'Mainlist', required:true},
  },
  // Pas besoin de la versionKey
  {versionKey : false}
);

/** Exporter le modèle pour qu'il soit utilisable ailleurs */
export default mongoose.model<IProduct>('Product', productSchema)