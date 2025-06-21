import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  
  if (token) {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next(request)
  }

  return next(req);
};
