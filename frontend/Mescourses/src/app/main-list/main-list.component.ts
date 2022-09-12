import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { MainListDialogComponent } from './main-list-dialog/main-list-dialog.component';
import { ManageMainListService } from './manage-main-list.service';
import { IShoppingList } from './ishopping-list';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css']
})
export class MainListComponent implements OnInit{

  // Datasource est un tableau amélioré qui contient la liste de toutes les listes  de courses.
  dataSource!: MatTableDataSource<IShoppingList>;

  // DisplayedColumns est utilisé par le html pour définir quelles colonnes afficher.
  displayedColumns: string[] = ['_id', 'products_name', 'products_date', 'actions'];

  // Requis pour pouvoir trier par ordre alphabétique.
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private main_list_service : ManageMainListService,
              public main_list_dialog : MatDialog) { }

  ngOnInit(): void {
    this.getAllMainList();
  }

  //** CRUD Liste de courses */

  addMainList(){
    const main_dialog = this.main_list_dialog.open(MainListDialogComponent,{
      width: '400px',
    });

    main_dialog.afterClosed().subscribe((res : IShoppingList) => { 
      if (res){
        this.main_list_service.postShopping(res)
          .subscribe({ 
            next: () => this.getAllMainList(), 
            error: () => alert("Impossible d'ajouter la liste de courses"),
            complete: () => console.info("POST liste de courses OK")
          });
        };
      });
  }

  getAllMainList(){
    this.main_list_service.getAllShopping()
    .subscribe({ 
      next: (data) => {
        this.dataSource = new MatTableDataSource(data.mainlist);
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data); 
      },
      error: () => alert("Impossbible de GET les listes de courses"),
      complete: () => console.info("GET les listes de courses OK")
    })
  }

  editMainList(row : IShoppingList, main_list_id : string){
    const main_dialog_edit = this.main_list_dialog.open(MainListDialogComponent,{
      width: '400px',
      data: row
    });

    main_dialog_edit.afterClosed().subscribe((res : IShoppingList) => {
      if (res){
        console.log(res);
        this.main_list_service.patchShopping(res, main_list_id)
        .subscribe({ 
          next: () => this.getAllMainList(), 
          error: () => alert("Impossible de modifier la liste de courses"),
          complete: () => console.info("PATCH la liste de courses OK")
        })
      }
    });
  }

  deleteMainList(main_list_id : string, mlName : string){
    if(confirm("Voulez vous vraiment supprimer " + mlName.toUpperCase() + " ?")){
      this.main_list_service.deleteShopping(main_list_id)
      .subscribe({
        next: () => this.getAllMainList(),
        error: () => alert("Impossbible de supprimer la liste de courses"),
        complete: () => console.info("DELETE la liste de courses OK")
      })
    }
  }
}
