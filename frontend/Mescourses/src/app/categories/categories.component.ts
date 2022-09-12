import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ManageCategoryService } from './manage-category.service';
import { ICategory } from './icategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  // Datasource est un tableau amélioré qui contient la liste de toutes les listes  de courses.
  dataSource!: MatTableDataSource<ICategory>;

  // DisplayedColumns est utilisé par le html pour définir quelles colonnes afficher. 
  displayedColumns: string[] = ['_id', 'category_name', 'actions'];

  // Requis pour pouvoir trier par ordre alphabétique
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private category_service : ManageCategoryService, 
              public category_dialog : MatDialog) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  //** CRUD Catégorie */

  addCategory(){
    const category_dialog = this.category_dialog.open(CategoryDialogComponent,{
      width: '400px',
    });

    category_dialog.afterClosed().subscribe((res : ICategory) => { 
      if (res){
        this.category_service.postCategory(res)
          .subscribe({ 
            next: () => this.getAllCategories(), 
            error: () => alert("Impossible d'ajouter la catégorie"),
            complete: () => console.info("POST catégorie OK")
          });
        };
      });
  }

  getAllCategories(){
    this.category_service.getAllCategory()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res.category);
        this.dataSource.sort = this.sort;
      },
      error: () => alert("Impossible de GET les catégories"),
      complete: () => console.info("GET les catégories OK")
    })
  };

  editCategory(row : ICategory, category_id : string){
    const category_dialog_edit =  this.category_dialog.open(CategoryDialogComponent, {
      width: '400',
      data:row
    });

    category_dialog_edit.afterClosed().subscribe((res : ICategory) => {
      if (res){
        this.category_service.patchCategory(res, category_id)
        .subscribe({ 
          next: () => this.getAllCategories(), 
          error: () => alert("Impossible de modifier la catégorie"),
          complete: () => console.info("PATCH la catégorie OK")
        })
      }
    });
  };

  deleteCategory(category_id :string, catName:string){
    if(confirm("Voulez vous vraiment supprimer " + catName.toUpperCase() + " ?")){
      this.category_service.deleteCategory(category_id)
      .subscribe({
        next: () => this.getAllCategories(),
        error: () => alert("Impossbible de supprimer la catégorie"),
        complete: () => console.info("DELETE la catégorie OK")
      });
    }
  };
}
