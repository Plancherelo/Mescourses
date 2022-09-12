import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainListComponent } from './main-list/main-list.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShopsComponent } from './shops/shops.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

//Menu
import { MatSidenavModule } from '@angular/material/sidenav';

import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { MainListDialogComponent } from './main-list/main-list-dialog/main-list-dialog.component';
import { ShopDialogComponent } from './shops/shop-dialog/shop-dialog.component';

import { MatSortModule } from '@angular/material/sort';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';

import { registerLocaleData } from '@angular/common';
import frenchLocale from '@angular/common/locales/fr';

registerLocaleData(frenchLocale);


@NgModule({
  declarations: [
    AppComponent,
    MainListComponent,
    ProductsComponent,
    CategoriesComponent,
    ShopsComponent,
    CategoryDialogComponent,
    ProductDialogComponent,
    MainListDialogComponent,
    ShopDialogComponent,
    NavigationComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule
    
    /*
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    */
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
