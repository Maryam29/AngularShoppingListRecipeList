import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeEditForm : FormGroup;
  
  constructor(private route: ActivatedRoute, private RecipesService: RecipesService,, private router:Router) { }

  ngOnInit() {
  this.route.params.subscribe((params: Params) => {
  this.id = +params['id'];
  this.editMode = params['id']?true:false;
  //console.log(this.editMode)
  });
  this.initForm();
  };
  
  private initForm(){
   let recipeName = '';
   let recipeImagePath = '';
   let recipeDescription = '';
   let recipeIngredients = new FormArray([])
   
   if(this.editMode){
    let recipe = this.RecipesService.getRecipeById(this.id);
    recipeName = recipe.name;
    recipeImagePath = recipe.imagePath;
    recipeDescription = recipe.description;
    if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
            new FormGroup({
                'name' : new FormControl(ingredient.name,Validators.required),
                'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        )}
    }
   }
   
    this.recipeEditForm = new FormGroup({
    'recipeName' : new FormControl(recipeName,Validators.required),
    'imagePath' : new FormControl(recipeImagePath,Validators.required),
    'description' : new FormControl(recipeDescription,Validators.required),
    'ingredients' : recipeIngredients
  })
  }
  
  onSubmit(){
    const recipe = new Recipe(
    this.recipeEditForm.value['recipeName'],
    this.recipeEditForm.value['description'],
    this.recipeEditForm.value['imagePath'],
    this.recipeEditForm.value['ingredients'],
    )
    console.log(this.editMode);
    if(this.editMode){
    this.RecipesService.UpdateRecipe(this.id-1,recipe);
    }
    else{
    this.RecipesService.AddRecipe(recipe);
    }
    this.router.navigate(['../'],{relativeTo:this.route});
  };
  
  AddNewIngredient(){
    const ingredient = new FormGroup({
        name : new FormControl(null,Validators.required ),
        amount : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
        });
    (<FormArray>this.recipeEditForm.get('ingredients')).push(ingredient);
  };
  
  OnCancelRecipe(){
    this.router.navigate(['../'],{relativeTo:this.route});
  };

  OnCancelIng(index:number){
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  };
}
