import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  //constructor(private RecipesService: RecipesService) { };
  constructor(){}
  ngOnInit() {
  //this.RecipesService.recipeSelected.subscribe((recipe:Recipe) => {
  //this.Selectedrecipe = recipe;
 // });
 }
}
