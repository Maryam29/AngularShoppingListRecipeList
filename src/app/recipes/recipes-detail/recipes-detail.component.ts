import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input() recipe:Recipe;
  @Input() index:number
  
  constructor(private RecipesService:RecipesService, private route:ActivatedRoute,private router:Router) { }
 
  ngOnInit() {
  const id = +this.route.snapshot.params['id'];
  this.recipe = this.RecipesService.getRecipeById(id);
  this.index = id;
  this.route.params.subscribe(
  (params: Params) => {
  this.recipe = this.RecipesService.getRecipeById(+params['id']);
  this.index = +params['id'];
  }
  );

  }
  
  AddtoShoppingList(){
   console.log("Shopping List",this.recipe.ingredients);
  this.RecipesService.AddIngstoShoppingList(this.recipe.ingredients);
 
  }
  
  DeleteRecipe(){
  this.RecipesService.RemoveRecipe(this.index-1);
  this.router.navigate(['/recipes'],{relativeTo:this.route});
  }
}
