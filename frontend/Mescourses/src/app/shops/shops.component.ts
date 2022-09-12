import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IShop } from './ishop';
import { ManageShopService } from './manage-shop.service';
import { ShopDialogComponent } from './shop-dialog/shop-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  // Datasource est un tableau amélioré qui contient la liste de tous les magasins.
  dataSource!: MatTableDataSource<IShop>;

  // Le nom des colonnes du tableau qui serontt affichées dans le HTML
  displayedColumns: string[] = ['_id', 'shop_name', 'shop_description', 'actions'];

  // Requis pour pouvoir trier par ordre alphabétique.
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private shop_service: ManageShopService,
              public shop_dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllShops();
  }

  //** CRUD les magasins */

  addShop(){
    const shop_dialog = this.shop_dialog.open(ShopDialogComponent,{
      width: '400px',
    });

    shop_dialog.afterClosed().subscribe((res : IShop) => { 
      if (res){
        this.shop_service.postShop(res)
          .subscribe({ 
            next: () => this.getAllShops(), 
            error: () => alert("Impossible d'ajouter le magasin"),
            complete: () => console.info("POST magasin OK")
          });
        };
      });
  }

  getAllShops(){
    this.shop_service.getAllShop()
    .subscribe({ 
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.shop);
        this.dataSource.sort = this.sort;
      },
      error: () => alert("Impossbible de GET"),
      complete: () => console.info("GET les magasins OK")
    })
  }

  editShop(row : IShop, shop_id : string){
    const shop_dialog_edit = this.shop_dialog.open(ShopDialogComponent,{
      width: '400px',
      data: row
    });

    shop_dialog_edit.afterClosed().subscribe((res : IShop) => {
      if (res){
        this.shop_service.patchShop(res, shop_id)
        .subscribe({ 
          next: () => this.getAllShops(), 
          error: () => alert("Impossible de modifier le magasin"),
          complete: () => console.info("PATCH magasin OK")
        })
      }
    });
  }

  deleteShop(shop_id : string, sName : string){
    if(confirm("Voulez vous vraiment supprimer " + sName.toUpperCase() + " ?")){
      this.shop_service.deleteShop(shop_id)
      .subscribe({
        next: () => this.getAllShops(),
        error: () => alert("Impossbible de Supprimer"),
        complete: () => console.info("DELETE le magasin OK")
      })
    }
  }
}
