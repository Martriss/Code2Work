import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfilComponent } from './components/user/profil/profil.component';
import { JwtInterceptor } from './common/jwt.interceptor';
import { DeleteUserComponent } from './components/user/delete.user/delete.user.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ProductsComponent } from './components/product/products/products.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { DeleteProductComponent } from './components/product/delete-product/delete-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { UserProductsComponent } from './components/product/user-products/user-products.component';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfilComponent,
    DeleteUserComponent,
    DashboardComponent,
    ProductsComponent,
    CreateProductComponent,
    DeleteProductComponent,
    EditProductComponent,
    UserProductsComponent,
    ListUsersComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
