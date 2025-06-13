import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'dialog-confirm-creation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  template: `
    <div class="relative">
      <h2 class="text-lg" mat-dialog-title>No encontramos un usuario con este correo.</h2>
      <mat-dialog-content>
        ¿Deseas registrarte y crear una cuenta ahora?
      </mat-dialog-content>
      <mat-dialog-actions class="!p-6 !pt-0">
        <div class="flex flex-col-reverse sm:flex-row-reverse items-start gap-3">
          <button mat-raised-button color="warn" [mat-dialog-close]="false">
            Cancelar
          </button>
          <button
            class="!m-0"
            mat-raised-button
            color="accent"
            [mat-dialog-close]="true"
            cdkFocusInitial
          >
            Registrarme
          </button>
        </div>
      </mat-dialog-actions>
    </div>
  `,
  styles: ``,
})
export class DialogConfirmCreationComponent {
  authService = inject(AuthService);
}
