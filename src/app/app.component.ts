import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
