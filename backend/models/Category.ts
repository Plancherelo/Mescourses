import mongoose, { Schema } from 'mongoose';
import Product from './Product';

/** Création de l'interface catégorie. */
export interface ICategory {
  category_name: string;
}

/** Création du Schéma qui sera utilisé pour stocker les données dans la base de données. */
const categorySchema = new Schema<ICategory>({
    category_name: { type: String, required: false },
  },
  // Pas besoin de la versionKey
  {versionKey : false}
);

/** Fonctionnalité : Suppression de chaque référence de la catégorie dans les produits 
 * lors de la suppression du magasin, via le middleware. */
categorySchema.pre('remove', function(next) {
  Product.remove({ product_category: this._id }).exec();
  next();
});

/** Exporter le modèle pour qu'il soit utilisable ailleurs */
export default mongoose.model<ICategory>('Category', categorySchema)