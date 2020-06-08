import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AppService } from '../app.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-desc',
  templateUrl: './product-desc.component.html',
  styleUrls: ['./product-desc.component.css']
})
export class ProductDescComponent implements OnInit {

  id='';
  product;
  createForm: FormGroup;
  commentForm: FormGroup;
  editorStyle={height:'150px',background: '#fff'}
  date=new Date();
  isForm=true;
  user;
  noProductDetail;
  reporterFullName='';
  fieldsChanged=[];

 // @ViewChild('scrollMe', { read: ElementRef }) 
  scrollMe: ElementRef;
  scrolltop:number = null

  constructor(private appService: AppService, private fb: FormBuilder, private router:Router,
    private route:ActivatedRoute,private toastr: ToastrService) { 
   this.resetForm()
  }
  
    ngOnInit(): void {
      this.user=this.appService.getUserInfoFromLocalstorage()
      this.route.params.subscribe(params =>{
        //console.log('params.id->',params.id);
        if(params.id!==''){
          this.id=params.id;
          this.isForm=false;
          //get product by id
          this.appService.getProductById(this.id).subscribe( (res) =>{
            //console.log('res',res);
            if(!res.error){
            this.setFormValue(res.data);
            }
            else{
             this.toastr.error(res.message)
            }
          },(error)=>{
            console.log('error',error);
          })
        }
      })
  
  }

  resetForm(){
    //create form initially reporter will be user
    this.appService.fullName.subscribe(val=>
      this.reporterFullName= val );
    this.createForm = this.fb.group({
     id:[''],
     name:['',Validators.required],
     description:[''],
     short_description:[''],
     url:[''],
     our_price:[''],
     items_in_stock:[''],
     date_added:[''],
    })
   
    this.commentForm = this.fb.group({
      comment:['',Validators.required]
    })
   }

   //set form according to response if product id is not null
   setFormValue(res){
    this.product=res;
    //console.log('this.filesArray->',this.filesArray);
      this.createForm.get('name').setValue(this.product.name);
      this.createForm.get('description').setValue(this.product.description);
      this.createForm.get('short_description').setValue(this.product.short_description);
      this.createForm.get('url').setValue(this.product.url);
      this.createForm.get('our_price').setValue(this.product.our_price);
      this.createForm.get('items_in_stock').setValue(this.product.items_in_stock);
      if(this.id==''){
        this.createForm.get('date_added').setValue(new Date());
      }else{
        this.createForm.get('date_added').setValue(this.product.date_added);
      }
   }

   createFormData(){
    //console.log('saved form value->',this.createForm.value)
     let product=this.createForm.value;
     var formData = {};
      if(this.id)
      formData['id']=this.id
      formData['name']=product.name
      formData['description']=product.description
      formData['short_description']=product.short_description
      formData['url']=product.url
      formData['our_price']=product.our_price
      formData['items_in_stock']=product.items_in_stock
      formData['date_added']=product.date_added
      return formData;
   }

  saveClicked(){
    this.isForm=false;
    let formData = this.createFormData();
    if(this.id==''){
      this.appService.createProduct(formData).subscribe((res)=>{
        if(!res.error){
          var notificationMessage =`${this.user.fullName} has created an product Product Id: ${res.data.id} and assigned to you.`
        this.router.navigate(['/dashboard']);
        }else{
          this.toastr.error('Product not Created. Try Again !')
        }
      })
    }else{
      this.editProduct(formData);
    }
  }

  editProduct(formData){
    //console.log(formData);
    this.appService.editProduct(formData).subscribe((res)=>{
      //console.log(res);
      this.product=res.data;
    })
  }

}
