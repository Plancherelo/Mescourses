import express from 'express';

import shop_controller from '../controllers/shop_controller';

const API_VERSION = '/api/v1/';
const ELEMENT = 'shops';

let router = express.Router();

// Répond aux endpoints http://localhost:1992/api/v1/shops
//                   ou http://localhost:1992/api/v1/shops/:_shop_id
router.post(API_VERSION + ELEMENT, shop_controller.createShop);
router.get(API_VERSION + ELEMENT, shop_controller.readAllShops);
router.get(API_VERSION + ELEMENT +"/:_shop_id", shop_controller.readShop);
router.patch(API_VERSION + ELEMENT + "/:_shop_id", shop_controller.updateShop);
router.delete(API_VERSION + ELEMENT + "/:_shop_id", shop_controller.deleteShop);

export = router;