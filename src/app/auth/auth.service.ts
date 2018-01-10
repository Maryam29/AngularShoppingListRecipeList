import * as firebase from 'firebase';
import { Router} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
 token:string;
 constructor(private router:Router){}
 
    signupUser(email:string, password:string)
    {
     firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((response) => firebase.auth().currentUser.getIdToken()
     .then(
     (token) => 
     {
     this.token = token;
     this.router.navigate(['/']);
     }))
     .catch(
        error => console.log(error);
        )
    } // returns a promise
    
    signinUser(email:string, password:string)
    {
     firebase.auth().signInWithEmailAndPassword(email, password)
     .then(
        (response) => 
        {
        console.log(response);
        firebase.auth().currentUser.getIdToken().then((token) => {
        this.token = token;
        this.router.navigate(['/']);
        });
        
        }
        )
     .catch(
        error => console.log(error)
        )
    }
    
    getToken(){
    firebase.auth().currentUser.getIdToken().then((token) => {
    this.token = token;
    });
    return this.token;
    // asynchronus function, firebase doesn't directly return the token, it also checks if token is still valid and if expired it returns a new one, we are retunring promise
    }
    
    isAuthenticated(){
    return this.token != null;
    }
    
    logout(){
    this.token = null;
    }
    
    setToken(token:string){
    this.token = token;
    }
}