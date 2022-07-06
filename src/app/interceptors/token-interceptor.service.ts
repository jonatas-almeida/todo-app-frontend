import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userAuth: UserService, private route: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Pega o token do usuário
    const token = this.userAuth.userToken;

    // Se o token existir envia o token no header da requisição
    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    return next.handle(request).pipe(
      // Caso exista algum erro envia o erro de Unauthorized
      catchError((err) => {
        if(err.status === 401) {
          this.route.navigateByUrl('/login')
        }
        const error =  err.error.message || err.statusText;
        return throwError(error)
      })
    )
  }
}
