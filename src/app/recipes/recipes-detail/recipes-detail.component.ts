import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input() recipe:Recipe;
  
  constructor(private RecipesService:RecipesService) { }
 
  ngOnInit() {
  }
  
  AddtoShoppingList(){
   //console.log(this.recipe);
  this.RecipesService.AddIngstoShoppingList(this.recipe.ingredients);
 
  }
}
