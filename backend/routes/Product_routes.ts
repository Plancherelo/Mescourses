import express from 'express';

import  productController from '../controllers/product_controller'

const API_VERSION = '/api/v1/';
const ELEMENT = 'mainlist/:_main_list_id/products';

let router = express.Router();

// Répond aux endpoints http://localhost:1992/api/v1/mainlist/:_main_list_id/products 
//                   ou http://localhost:1992/api/v1/mainlist/:_main_list_id/products/:_product_id
router.post(API_VERSION + ELEMENT, productController.createProduct);
router.get(API_VERSION + ELEMENT, productController.readAllProduct);
router.get(API_VERSION + ELEMENT + "/:_product_id", productController.readProduct);
router.patch(API_VERSION + ELEMENT + "/:_product_id", productController.updateProduct);
router.delete(API_VERSION + ELEMENT + "/:_product_id", productController.deleteProduct);

export = router;