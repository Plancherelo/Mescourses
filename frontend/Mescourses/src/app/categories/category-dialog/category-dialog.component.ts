import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from '../icategory';

import { ManageCategoryService } from '../manage-category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})

export class CategoryDialogComponent implements OnInit{

  // Créer le group de champs qui forment le formulaire
  category_form = this.formBuilder.group({
    category_name : ['', Validators.required]
  });

  dialgo_title : string = 'Ajouter';

  constructor(private formBuilder : FormBuilder, 
              public category_dialogRef : MatDialogRef<CategoryDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public category_dialog_data : ICategory){  }

  ngOnInit(): void {
    if(this.category_dialog_data){
      this.dialgo_title = 'Modifier'
      this.category_form.controls['category_name'].setValue(this.category_dialog_data.category_name);
    }
  }
}