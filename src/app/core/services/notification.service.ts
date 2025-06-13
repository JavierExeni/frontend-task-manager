import { Injectable, signal, computed } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { GenericSnackbarComponent } from '../../shared/components/generic-snackbar/generic-snackbar.component';
import { SnackbarData } from '../../shared/models/snackbar.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private horizontalPosition = signal<MatSnackBarHorizontalPosition>('right');
  private verticalPosition = signal<MatSnackBarVerticalPosition>('bottom');

  private currentSnackBarRef = signal<MatSnackBarRef<any> | null>(null);

  readonly snackbarData = signal<SnackbarData | null>(null);

  constructor(private snackBar: MatSnackBar) {}

  getClassesType = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'error':
        return 'bg-red-50 border-l-4 border-red-50';
      case 'loading':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  private openSnackBar(
    message: string,
    type: 'success' | 'error' | 'loading' | 'info',
    duration = 5000,
    action?: string
  ): MatSnackBarRef<any> {
    this.dismissCurrent();
    const data: SnackbarData = { message, type, action };

    this.snackbarData.set(data);

    const ref = this.snackBar.openFromComponent(GenericSnackbarComponent, {
      duration: type === 'loading' ? undefined : duration,
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
      panelClass: ['transparent'],
    });

    this.currentSnackBarRef.set(ref);

    ref.afterDismissed().subscribe(() => {
      if (this.currentSnackBarRef() === ref) {
        this.currentSnackBarRef.set(null);
      }
    });

    return ref;
  }

  success(message: string, duration?: number, action?: string) {
    return this.openSnackBar(message, 'success', duration, action);
  }

  error(message: string, duration?: number, action?: string) {
    return this.openSnackBar(message, 'error', duration, action);
  }

  loading(message: string) {
    return this.openSnackBar(message, 'loading');
  }

  info(message: string, duration?: number, action?: string) {
    return this.openSnackBar(message, 'info', duration, action);
  }

  setHorizontalPosition(position: MatSnackBarHorizontalPosition) {
    this.horizontalPosition.set(position);
  }

  setVerticalPosition(position: MatSnackBarVerticalPosition) {
    this.verticalPosition.set(position);
  }

  dismissCurrent() {
    this.currentSnackBarRef()?.dismiss();
    this.currentSnackBarRef.set(null);
  }

  dismissLoading() {
    const currentRef = this.currentSnackBarRef();
    if (currentRef?.instance?.type() === 'loading') {
      currentRef.dismiss();
      this.currentSnackBarRef.set(null);
    }
  }
}
