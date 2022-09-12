import express from 'express';

import  CategoryController from '../controllers/category_controller'

const API_VERSION = '/api/v1/';
const ELEMENT = 'categories';

let router = express.Router();

// Répond aux endpoints http://localhost:1992/api/v1/category
//                   ou http://localhost:1992/api/v1/category/:_category_id
router.post(API_VERSION + ELEMENT, CategoryController.createCategory);
router.get(API_VERSION + ELEMENT, CategoryController.readAllCategory);
router.get(API_VERSION + ELEMENT +"/:_category_id", CategoryController.readCategory);
router.patch(API_VERSION + ELEMENT + "/:_category_id", CategoryController.updateCategory);
router.delete(API_VERSION + ELEMENT + "/:_category_id", CategoryController.deleteCategory);

export = router;