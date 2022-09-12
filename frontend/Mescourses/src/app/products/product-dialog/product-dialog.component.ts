import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/categories/icategory';
import { ManageCategoryService } from 'src/app/categories/manage-category.service';
import { IShop } from 'src/app/shops/ishop';
import { ManageShopService } from 'src/app/shops/manage-shop.service';
import { IProduct } from '../iproduct';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit{

  categories : ICategory[] = [];
  shops : IShop[] = [];
  dialgo_title : string = 'Ajouter';

  product_form = this.formBuilder.group({
    //product_check: [{value: false, disabled: true}],
    product_name : ['', Validators.required],
    product_quantity : [''],
    product_shop : [null],
    product_category : [null],
    // Explication du pattern regex : entre 1 et 10 chiffres, puis éventuellement
    // un point suivi d'au maximum 2 chiffres après le point.
    product_budget : ['', Validators.pattern("^[0-9]{1,10}\.?[0-9]{0,2}$")],
    product_price : ['',Validators.pattern("^[0-9]{1,10}\.?[0-9]{0,2}$")],
    product_description : ['']
  })

  constructor(public product_dialogRef : MatDialogRef<IProduct>,
              private formBuilder : FormBuilder,
              private categories_service : ManageCategoryService, 
              private shops_service : ManageShopService,
              @Inject (MAT_DIALOG_DATA) public product_dialog_data : any) { }
  ngOnInit(): void {

    // Obtenir touts les magasins pour la sélection dans le forumulaire.
    this.shops_service.getAllShop()
    .subscribe({ 
      next: (data : any) => {
        this.shops = data.shop;
        console.log(this.shops)
      },
      error: () => alert("Impossible de GET"),
      complete: () => console.info("GET les shops OK")
    })

    // Obtenir toutes les catégories pour la sélection dans le forumulaire.
    this.categories_service.getAllCategory()
    .subscribe({ 
      next: (data : any) => {
        this.categories = data.category;
        console.log(this.categories)
      },
      error: () => alert("Impossible de GET"),
      complete: () => console.info("GET les catégpories OK")
    })

    if(this.product_dialog_data){
      this.dialgo_title= "Modifier";
      this.product_form.controls['product_name'].setValue(this.product_dialog_data.product_name);
      this.product_form.controls['product_quantity'].setValue(this.product_dialog_data.product_quantity);
      this.product_form.controls['product_shop'].setValue(this.product_dialog_data.product_shop);
      this.product_form.controls['product_category'].setValue(this.product_dialog_data.product_category);
      this.product_form.controls['product_budget'].setValue(this.product_dialog_data.product_budget);
      this.product_form.controls['product_price'].setValue(this.product_dialog_data.product_price);
      this.product_form.controls['product_description'].setValue(this.product_dialog_data.product_description);
    }
  }
}
