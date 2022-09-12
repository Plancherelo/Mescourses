import express from 'express';

import  mainlistcontroller from '../controllers/mainlist_controller'

const API_VERSION = '/api/v1/';
const ELEMENT = 'mainlist';

let router = express.Router();

// Répond aux endpoints http://localhost:1992/api/v1/mainlist
//                   ou http://localhost:1992/api/v1/mainlist/:_main_list_id
router.post(API_VERSION + ELEMENT, mainlistcontroller.createMainlist);
router.get(API_VERSION + ELEMENT, mainlistcontroller.readAllMainlist);
router.get(API_VERSION + ELEMENT +"/:_main_list_id", mainlistcontroller.readMainlist);
router.patch(API_VERSION + ELEMENT + "/:_main_list_id", mainlistcontroller.updateMainlist);
router.delete(API_VERSION + ELEMENT + "/:_main_list_id", mainlistcontroller.deleteMainlist);

export = router;