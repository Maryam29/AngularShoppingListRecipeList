import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
    ingredients : Ingredient[];
    EditItemIngredient : Ingredient;
    EditItemIndex : number;
}

const initialState : State = {
 ingredients: [new Ingredient('Ginger Garlic Paste',200)],
 EditItemIngredient: null,
 EditItemIndex: -1
}

export function ShoppingListReducer(state = initialState, action:ShoppingListActions.ShoppingListActions) {
switch(action.type){
case ShoppingListActions.ADD_ING:
    return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
    };
    
case ShoppingListActions.UPDATE_ING:{
    const ingredient = state.ingredients[state.EditItemIndex];
    const updatedIngredient = {
    ...ingredient,
    ...action.payload
    }
    const ingredients = [...state.ingredients];
    ingredients[state.EditItemIndex] = updatedIngredient;
    return {
        ...state,
        ingredients: ingredients,
        EditItemIngredient: null,
        EditItemIndex: -1
    };
};

case ShoppingListActions.DELETE_ING:{
 const oldingredients = [...state.ingredients];
 oldingredients.splice(state.EditItemIndex,1);
 
 return {
    ...state,
    ingredients: oldingredients,
    EditItemIngredient: null,
    EditItemIndex: -1
 }
    
};

case ShoppingListActions.ADD_INGS:{
    return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
    }
};

case ShoppingListActions.START_EDIT:{
const editedIngredient = {...state.ingredients[action.payload]};
    return {
        ...state,
        EditItemIngredient:editedIngredient,
        EditItemIndex:action.payload
    }
};

case ShoppingListActions.STOP_EDIT:{
    return {
        ...state,
        EditItemIngredient: null,
        EditItemIndex: -1
    }
};
default:
    return state;
}

}
// This function is called whenever action is dispatched, ngRx will pass automatically pass 2 arguments to this function state and action.