import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

const initialState = {
 ingredients : [new Ingredient('Ginger Garlic Paste',200)]
}
export function ShoppingListReducer(state = initialState , action:Action) {

}
// This function is called whenever action is dispatched, ngRx will pass automatically pass 2 arguments to this function state and action.