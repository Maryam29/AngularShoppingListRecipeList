import { Component, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private DataStorageService : DataStorageService) { }

  ngOnInit() {
  }
  
  onSaveData(){
  this.DataStorageService.saveRecipes();
  }
  
  onFetchData(){
  this.DataStorageService.getRecipes();
  }
}