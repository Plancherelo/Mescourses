import { ICategory } from "../categories/icategory";
import { IShop } from "../shops/ishop";

export interface IProduct {
    _id? : string;
    product_check : boolean;
    product_name : string;
    product_quantity : string;
    product_shop? : IShop;
    product_category? : ICategory;
    product_budget : number;
    product_price : number;
    product_description : string;
    _main_list_id : string;
}
