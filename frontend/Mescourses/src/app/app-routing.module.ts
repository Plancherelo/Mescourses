import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ShopsComponent } from './shops/shops.component';
import { ProductsComponent } from './products/products.component';
import { MainListComponent } from './main-list/main-list.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ShopDialogComponent } from './shops/shop-dialog/shop-dialog.component';

const routes: Routes = [
  //default
  { path: '',   redirectTo: '/mainlist', pathMatch: 'full' },
  { path: 'mainlist', component: MainListComponent},
  { path: 'mainlist/:id', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shops', component: ShopsComponent },
  //{ path: 'shops/:id', component: ShopDetailComponent },
  { path: 'categories', component: CategoriesComponent },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
