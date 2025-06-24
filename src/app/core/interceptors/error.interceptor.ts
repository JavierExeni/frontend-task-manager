import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: any) => {
      switch (error.status) {
        case HttpStatusCode.BadRequest:
          const resError = error.error
          if(resError.errors){
            notificationService.error(resError.errors[0].message, 10000);
          }else{
            notificationService.error(error.message, 10000);
          }
          break;
        case HttpStatusCode.NotFound:
          if (!router.url.includes('/login')) {
            notificationService.error(
              '¡Ups! Ruta no encontrada (Error 404)',
              10000
            );
          }
          break;
        case HttpStatusCode.InternalServerError:
          notificationService.error(
            'Hubo un error desde el servidor, vuelva a intentarlo más tarde.',
            10000
          );
          break;
        case HttpStatusCode.Unauthorized:
          notificationService.error(error.message, 10000);
          break;
        case HttpStatusCode.Conflict:
          notificationService.error(
            'Error en la inserción o actualización.',
            10000
          );
          break;
        default:
          notificationService.error(
            '¡Ups! Hubo un error desconocido, comuniquese con Javier Exeni.',
            10000
          );
          break;
      }
      return throwError(() => error.error.message);
    })
  );
};
