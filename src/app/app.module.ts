import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app.routing';
import { ProductComponent } from './dashboard/product/product.component';
import { StoreComponent } from './dashboard/store/store.component';
import { StoreownerComponent } from './dashboard/storeowner/storeowner.component';
import { StoredetailsComponent } from './dashboard/store/storedetails/storedetails.component';
import { ProductdetailsComponent } from './dashboard/product/productdetails/productdetails.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonService } from './shared/common.service';
import { EthcontractService } from './shared/ethContract.service';
import { StoreownerdetailsComponent } from './dashboard/storeowner/storeownerdetails/storeownerdetails.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProductComponent,
    StoreComponent,
    StoreownerComponent,
    StoredetailsComponent,
    ProductdetailsComponent,
    StoreownerdetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    AppRoutingModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSelectModule
  ],
  providers: [CommonService, EthcontractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
