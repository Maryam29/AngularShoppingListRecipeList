import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromApp from '../store/app.reducers';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store:Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    
    return this.store.select('auth').take(1).switchMap((authState:fromAuth.State) => {
    const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
    return next.handle(copiedReq);  
    // returns an observable, we use switchmap to directly return observable next.handle(), if map is used then next.handle observable is wrapped into another observable and then returned
    });
  }
}
