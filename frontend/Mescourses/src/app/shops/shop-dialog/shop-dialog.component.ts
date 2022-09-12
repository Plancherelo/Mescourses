import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IShop } from '../ishop';
import { ManageShopService } from '../manage-shop.service';

@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.css']
})
export class ShopDialogComponent implements OnInit {

  // Créer le group de champs qui formeront le formulaire
  shop_form = this.formBuilder.group({
    shop_name: ['', Validators.required],
    shop_description: ['']
  })

  dialgo_title : string = 'Ajouter';

  constructor(public shop_dialogRef : MatDialogRef<IShop>,
              private formBuilder : FormBuilder,
              @Inject (MAT_DIALOG_DATA) public shop_dialog_data : IShop) {  }   

  ngOnInit(): void {
    if(this.shop_dialog_data){
      this.dialgo_title = 'Modifier';
      this.shop_form.controls['shop_name'].setValue(this.shop_dialog_data.shop_name);
      this.shop_form.controls['shop_description'].setValue(this.shop_dialog_data.shop_description);
    }
  }
}
