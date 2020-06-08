import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { ProductDescComponent } from './product-desc/product-desc.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent  },
  { path: 'dashboard', component: DashboardComponent  },
  {path: 'productDescription/:id',component: ProductDescComponent},
  { path: 'request-reset-password', component: RequestResetComponent  },
  { path: 'response-reset-password/:token', component: ResponseResetComponent  },
  { path: '',redirectTo: '/login',pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ProductDescComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatCardModule,MatDividerModule,MatTableModule,MatPaginatorModule,MatSortModule,MatIconModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        whitelistedDomains: ['http://localhost:4200/','http://52.66.252.216:3000']
      }
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }


