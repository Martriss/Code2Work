import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './common/admin.guard';
import { AuthGuard } from './common/auth.guard';
import { ProductsComponent } from './components/product/products/products.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ListUsersComponent } from './components/user/list-users/list-users.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductsComponent},
  { path: 'users', component: ListUsersComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }