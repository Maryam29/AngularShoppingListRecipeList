import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService]
})
export class AppComponent {
  title = 'app';
  loadedFeature = 'recipe';
  isRecipe = true;
  
  
  ShowFeature(feature:string){
  this.loadedFeature = feature;
  if(feature === 'recipe'){
  this.isRecipe = true;
  }
  else{
  this.isRecipe = false;
  }
  }
}
