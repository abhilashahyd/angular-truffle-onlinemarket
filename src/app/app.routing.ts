import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './dashboard/product/product.component';
import { StoreComponent } from './dashboard/store/store.component';
import { ProductdetailsComponent } from './dashboard/product/productdetails/productdetails.component';
import { StoreownerComponent } from './dashboard/storeowner/storeowner.component';
import { StoredetailsComponent } from './dashboard/store/storedetails/storedetails.component';

import{DashboardComponent} from './dashboard/dashboard.component';
import { AppRoutes } from './app-routes.enum';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: AppRoutes.Base,
    pathMatch: 'full',
    redirectTo: AppRoutes.Dashboard
    // canActivate: [LoggedInGuard]
  },
    {
    path: AppRoutes.Dashboard,
    component: DashboardComponent,
    children: [
      {
        path: AppRoutes.Base,
        pathMatch: 'full',
        redirectTo: AppRoutes.Products
      },
      {
      path: AppRoutes.Products,
      component: ProductComponent
    },
    {
    path: AppRoutes.StoreOwner,
    component: StoreownerComponent
  },
   {
      path: AppRoutes.Stores,
      component: StoreComponent
    }, {
      path: AppRoutes.StoreDetails,
      component: StoredetailsComponent
    }, {
      path: AppRoutes.ProductDetails,
      component: ProductdetailsComponent
    }]
  },
  {
    path: AppRoutes.Login,
    component: LoginComponent
    // canActivate: [LoggedInGuard]
  },
  { path: AppRoutes.Signup, component: SignupComponent }
  // { path: AppRoutes.Signup, component: SignupComponent },
];




@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { };
// export const routingComponents = [LoginComponent, SignupComponent,DashboardComponent];
