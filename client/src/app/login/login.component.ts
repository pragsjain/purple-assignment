import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  createLoginForm: FormGroup;
  hide:boolean;

  constructor(
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit() {
    console.log('ngoninit');
    this.resetForm();
    if(this.appService.getUserInfoFromLocalstorage()){
      this.router.navigate(['/dashboard']);
    }
    
  }


  resetForm(){
    this.createLoginForm = this.fb.group({
      emailOruserName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  goToSignup(){
    this.router.navigate(['/register']);
   }
  
   
  signinFunction: any = () => {
    let loginFormValue=this.createLoginForm.value;
      let data = {
        emailOruserName: loginFormValue.emailOruserName,
        password: loginFormValue.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            console.log(apiResponse)
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
             this.appService.setTokenInLocalStorage(apiResponse.data.token)
             this.appService.fullNameSource.next(apiResponse.data.userDetails.fullName);
             this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err) => {
          if(err.error.message)
          this.toastr.error(err.error.message)
          else
          this.toastr.error("Some error in Login.Try Again !")
        });
    } // end signinFunction


  } 

  

  

