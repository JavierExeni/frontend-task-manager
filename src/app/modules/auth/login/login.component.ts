import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { catchError, of, switchMap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../../core/services/auth.service';
import { DialogConfirmCreationComponent } from '../components/dialog-confirm-creation/dialog-confirm-creation.component';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent {
  router = inject(Router);
  dialog = inject(MatDialog);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  async onSubmit() {
    if (this.emailFormControl.invalid) return;

    this.notificationService.setVerticalPosition('bottom');
    this.notificationService.setHorizontalPosition('center');

    this.notificationService.loading('Cargando...');

    const email = this.emailFormControl.value;

    const isAuthenticated = await this.authService.findUserByEmail(email!);
    this.notificationService.dismissLoading();
    if (isAuthenticated) {
      this.router.navigateByUrl('home');
    } else {
      this.openConfirmDialog(email!);
    }
  }

  openConfirmDialog(email: string) {
    const dialogRef = this.dialog.open(DialogConfirmCreationComponent, {
      ariaLabel: 'Diálogo de confirmación',
      autoFocus: false,
      disableClose: true,
      restoreFocus: true,
      panelClass: '!z-10',
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            this.notificationService.loading('Registrando usuario...');
            return this.authService.addUser(email);
          } else {
            return of(false);
          }
        }),
        catchError((err) => {
          console.error('Error adding user', err);
          this.notificationService.dismissLoading();
          return of(false);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.notificationService.setHorizontalPosition('right');

          this.router.navigateByUrl('home');
          setTimeout(() => {
            this.notificationService.success(
              '¡Usuario registrado con exito!',
              5000
            );
          }, 150);
        }
        this.emailFormControl.reset();
      });
  }
}
