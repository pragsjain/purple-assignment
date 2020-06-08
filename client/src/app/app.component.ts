import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
isUser:boolean=true;
fullName='';
isLogin:boolean;
isRegister:boolean;
constructor(private appService: AppService,
  private router: Router,
  private route: ActivatedRoute){
}
ngOnInit(){
    //if user is present in localstorage, get from there or else initialize 
    if(this.appService.getUserInfoFromLocalstorage()){
      this.appService.fullNameSource.next(this.appService.getUserInfoFromLocalstorage().fullName);
    }
    this.appService.fullName.subscribe(result => {
      this.fullName = result; 
  });

}


logout(){
let userId=this.appService.getUserInfoFromLocalstorage()['userId']
console.log(userId);
this.appService.logout(userId).subscribe( (res) =>{
 console.log(res);
})

    this.appService.setUserInfoInLocalStorage('')
    this.appService.setTokenInLocalStorage(null)
    this.router.navigate(['/login']);
  
}

toasterClickedHandler() {
console.log('Toastr clicked');
}
}
