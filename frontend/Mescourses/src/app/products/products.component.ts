import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from './iproduct';
import { ManageProductService } from './manage-product.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageMainListService } from '../main-list/manage-main-list.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  title : String ='';
  date : Date = new Date();
  sumBudget : number = 0;
  sumTotal : number = 0;

  // MAIN_LIST_ID est l'id de la liste de courses actuelle.
  MAIN_LIST_ID! : string;

  // Datasource est un tableau amélioré qui contient la liste de tous les produits.
  dataSource! : MatTableDataSource<IProduct>

  // DisplayedColumns est utilisé par le html pour définir quelles colonnes afficher.
  displayedColumns: string[] = ['_id', 'product_check', 'product_name', 'product_quantity', 'product_shop', 'product_category', 'product_budget', 'product_price', 'product_description', 'actions'];
  
  // Requis pour pouvoir trier par ordre alphabétique
  @ViewChild(MatSort) sort!: MatSort;

  // Constructeur dans lequel plusieurs services sont injectés.
  constructor(private product_service : ManageProductService, 
              public product_dialog : MatDialog, 
              private _liveAnnouncer: LiveAnnouncer,
              private route : ActivatedRoute,
              private main_list_service : ManageMainListService,
              private router: Router) { }

  // ngOnInit appelé une fois que la classe est instanciée. On préférera ceci au constructeur.
  ngOnInit(): void {

    this.MAIN_LIST_ID = this.route.snapshot.paramMap.get('id')!;

    this.getTitleAndDate(this.MAIN_LIST_ID);
    this.getAllProducts(this.MAIN_LIST_ID);

  }

  /*
  async test(){
    await this.main_list_service.getAllShopping().subscribe(data => this.dataSource.data.push(data));
  }
  */

  getTitleAndDate(main_list_id : string){
    this.main_list_service.getShopping(main_list_id).subscribe({
      next : (res) => {
        this.title = res.mainlist.products_name;
        this.date = res.mainlist.products_date;
      },
      error: (e) => console.error(e),
      complete : () => null
    });
  }

  // Méthode de filtre par défaut
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }

  // Méthode de base d'Angular pour le tri
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  //** CRUD Produits */

  // Ajouter un produit dans la liste
  addProduct(){
    const product_dialog = this.product_dialog.open(ProductDialogComponent,{
      width: '400px',
    });

    product_dialog.afterClosed().subscribe((res) => { 
    if (res){
      this.product_service.postProduct(this.MAIN_LIST_ID, res)
        .subscribe({ 
          next: () => this.getAllProducts(this.MAIN_LIST_ID), 
          error: () => alert("Impossible d'ajouter le produit"),
          complete: () => console.info("POST produit OK")
        });
      };
    });       
  }

  // Retrouver tous les produits dans la liste
  getAllProducts(_main_list_id : string){
    this.product_service.getAllProduct(_main_list_id)
    .subscribe({ 
      next: (data) => {
        this.dataSource = new MatTableDataSource<IProduct>(data.products);
        this.dataSource.sortingDataAccessor = (prod : any, attribute : string) => {
          switch (attribute) {
            case 'product_shop'
              : return  prod.product_shop?.shop_name;
            case 'product_category'
              : return  prod.product_category?.category_name;
            default
              : return prod[attribute];
          }
        }
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: IProduct, filter : string) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(filter) != -1; }
        this.sumBudget = this.dataSource.data.map((product : IProduct) => product.product_budget).reduce((accumulated, value) => Number(accumulated) + Number(value), 0);
        this.sumTotal = this.dataSource.data.map((product : IProduct) => product.product_price).reduce((accumulated, value) => Number(accumulated) + Number(value), 0);
      },
      error: () => alert("Impossible de GET les produits"),
      complete: () => console.log("GET tous les produits OK")
    })
  }

  // Modifier un produit.
  editProduct(row : any, id : string){
    const shop_dialog_edit = this.product_dialog.open(ProductDialogComponent,{
      width: '400px',
      data: row
    });

    shop_dialog_edit.afterClosed().subscribe((res) => {
      if (res){
        this.product_service.patchProduct(this.MAIN_LIST_ID, res, id)
        .subscribe({ 
          next: () => this.getAllProducts(this.MAIN_LIST_ID), 
          error: () => alert("Impossible de modifier le produit"),
          complete: () => console.info("PATCH le produit OK")
        })
      }
    });
  }

  // Supprimer un produit.
  deleteProduct(product_id : string, pName : string){
    if(confirm("Voulez vous vraiment supprimer " + pName.toUpperCase() + " ?")){
      this.product_service.deleteProduct(this.MAIN_LIST_ID, product_id)
      .subscribe({
        next: () => this.getAllProducts(this.MAIN_LIST_ID),
        error: () => alert("Impossible de Supprimer"),
        complete: () => console.info("DELETE le produit OK")
      })
    }
  }

  // Mettre à jour la base de données comme quoi le produit est ajouté.
  onClickCheck(product: any, id: string){
    this.product_service.checkProduct(this.MAIN_LIST_ID,  product, id).subscribe(() => product.product_check != product.product_check)
  }
}
