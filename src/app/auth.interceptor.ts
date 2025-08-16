import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;

  // ✅ Safe check for browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token');
  }

  // ✅ Clone request only if token exists
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'x-api-key': 'reqres-free-v1'
        }
      })
    : req;

  const router = inject(Router);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(error);

      if (error.status === 401 || error.status === 403) {
        // ✅ Safe removal
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('token'); // use same key you set
        }
        alert('Session expired. Please login again.');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
