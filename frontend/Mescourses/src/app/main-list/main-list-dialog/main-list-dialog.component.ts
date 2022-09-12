import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IShoppingList } from 'src/app/main-list/ishopping-list';

@Component({
  selector: 'app-main-list-dialog',
  templateUrl: './main-list-dialog.component.html',
  styleUrls: ['./main-list-dialog.component.css']
})
export class MainListDialogComponent implements OnInit {

  // Créer le groupe de champs qui forment le formulaire
  shoppings_form = this.formBuilder.group({
    products_name: ['', Validators.required],
    products_date: ['']
  })

  dialgo_title : string = 'Ajouter';

  constructor(public shoppings_dialogRef : MatDialogRef<IShoppingList>,
              private formBuilder : FormBuilder,
              @Inject (MAT_DIALOG_DATA) public shoppings_dialog_data : any) { }
  
  
  ngOnInit(): void {
    if(this.shoppings_dialog_data){
      this.dialgo_title = 'Modifier';
      this.shoppings_form.controls['products_name'].setValue(this.shoppings_dialog_data.products_name);
      this.shoppings_form.controls['products_date'].setValue(this.shoppings_dialog_data.products_date);
    }
  }
}
