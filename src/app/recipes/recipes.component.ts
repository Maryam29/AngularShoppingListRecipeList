import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  loadedRecipe : Recipe;
  constructor() { }

  ngOnInit() {
  }
  GetRecipeDetail(selectedRecipe:Recipe){
  this.loadedRecipe = selectedRecipe;
  }

}
