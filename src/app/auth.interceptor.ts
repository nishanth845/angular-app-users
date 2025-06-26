import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage?.getItem('token');

  // Add Authorization header if token exists
  const authReq = token ? req.clone(
        { 
          setHeaders: {
          Authorization: `Bearer ${token}`,
            'x-api-key': 'reqres-free-v1'
          }
        })
    : req;

  const router = inject(Router); // inject Router for navigation
  
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 401 || error.status === 403) {
        // Auto logout on token error
        localStorage.removeItem('authToken');
        alert('Session expired. Please login again.');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
