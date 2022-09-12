import mongoose, { Schema, Types } from 'mongoose';
import Product from './Product';

/** Création de l'interface liste de courses. */
export interface IMainlist {
    products_name : string;
    products_date? : number;
}

/** Création du Schéma qui sera utilisé pour stocker les données dans la base de données. */
const mainlistSchema = new Schema<IMainlist>({
    products_name : { type: String, required:true },
    products_date: { type: Date, required: false }
  },
  // Pas besoin de la versionKey
  {versionKey : false}
);

/** Exporter le modèle pour qu'il soit utilisable ailleurs */
export default mongoose.model<IMainlist>('Mainlist', mainlistSchema)