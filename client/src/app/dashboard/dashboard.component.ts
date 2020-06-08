import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {AppService } from '../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'items_in_stock', 'our_price','delete'];
  ELEMENT_DATA: ProductElement[];
  dataSource: MatTableDataSource<ProductElement>
  isProduct:boolean=false;
  isDashBoardView=true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private appService: AppService, private router: Router,private toastr: ToastrService,){
    
  }
  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts(){
    this.appService.getAllProducts().subscribe( (res) =>{
      console.log(res);
      if(!res.error && res.data){
      this.isProduct=true;
      var ProductsArray:any=[];
      res.data.forEach(element => {
        var obj={};
        obj['id']=element.id
        obj['name']=element.name;
        obj['items_in_stock']=element.items_in_stock;
        obj['our_price']=element.our_price;
        ProductsArray.push(obj);
      });
      this.ELEMENT_DATA =ProductsArray;
    }
    else{
     // this.toastr.error(res.message)
      this.isProduct=false;
      this.ELEMENT_DATA =[];
    }
    this.dataSource= new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },(error)=>{
      console.log('error',error);
      this.ELEMENT_DATA =[];
      this.dataSource= new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(){
    this.router.navigate(['/productDescription','']);
  }

  edit(id){
    console.log(id);
    this.router.navigate(['/productDescription',id]);
  }

  delete(id){
    console.log('delete',id);
    this.appService.deleteProduct(id).subscribe( (res) =>{
      console.log(res);
      this.getAllProducts()
    })
  }
  goToSearch(){
    this.router.navigate(['/search']);
  }
  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }  
}



export interface ProductElement {
  id: string
  status: string;
  title: string;
  reporter: string;
  date: Date;
}
