import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  loadedFeature = 'recipe';
  isRecipe = true;
  
  constructor(private store: Store<fromApp.AppState>){}
  
  ngOnInit(){
  firebase.initializeApp({
    apiKey: "AIzaSyBnv31YyyNPy5uSCVIHsrkPtJ8J8WOF1Fg",
    authDomain: "udemy-shopping-recipe-project.firebaseapp.com"
    })
    
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken().then(
        (token: string) => 
        {
        this.store.dispatch(new AuthActions.SetToken(token))
        }
      );
    }
  });
  
  }
}
