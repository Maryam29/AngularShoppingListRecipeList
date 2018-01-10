import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  loadedFeature = 'recipe';
  isRecipe = true;
  
  ngOnInit(){
  firebase.initializeApp({
    apiKey: "AIzaSyBnv31YyyNPy5uSCVIHsrkPtJ8J8WOF1Fg",
    authDomain: "udemy-shopping-recipe-project.firebaseapp.com",

  })
  }
}
