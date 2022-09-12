import mongoose, { Schema } from 'mongoose';
import Product from './Product';

/** Création de l'interface magasin. */
export interface IShop {
    shop_name : string;
    shop_description? : string;
}

/** Création du Schéma qui sera utilisé pour stocker les données dans la base de données. */
const shopSchema = new Schema<IShop>({
  shop_name: { type: String, required: false },
  shop_description : { type: String, required: false }
  },
  // Pas besoin de la versionKey
  {versionKey : false}
);

/** Fonctionnalité : Suppression de la référence du magasin dans les produits 
 * lors de la suppression du magasin, via le middleware. */
shopSchema.pre('remove', function(next) {
  Product.remove({ product_shop: this._id }).exec();
  next();
});

/** Exporter le modèle pour qu'il soit utilisable ailleurs */
export default mongoose.model<IShop>('Shop', shopSchema);