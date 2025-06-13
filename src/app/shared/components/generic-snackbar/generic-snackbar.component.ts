import { NgClass } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-generic-snackbar',
  standalone: true,
  imports: [NgClass, MatIcon],
  templateUrl: './generic-snackbar.component.html',
  styles: ``,
})
export class GenericSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef<GenericSnackbarComponent>);
  notificationService = inject(NotificationService);
  data = this.notificationService.snackbarData;

  // Computamos las propiedades individuales
  type = computed(() => this.data()!.type);
  message = computed(() => this.data()!.message);
  action = computed(() => this.data()!.action);

  // Signal para el icono
  icon = computed(() => {
    switch (this.type()) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'loading':
        return 'autorenew';
      default:
        return 'info';
    }
  });

  onAction(): void {
    this.snackBarRef.dismissWithAction();
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
