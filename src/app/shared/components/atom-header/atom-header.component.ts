import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'atom-header',
  standalone: true,
  imports: [MatButton, NgOptimizedImage],
  template: `
    <header class="shadow-md p-2 lg:py-2 lg:px-0">
      <div
        class="flex items-center justify-between lg:max-w-[80%] md:m-auto"
      >
        <img
          class="hidden sm:block"
          alt="Logo de ATOM Chat"
          ngSrc="assets/images/logo-atom-chat.png"
          width="192.5"
          height="55"
        />
        <img
          class="block sm:hidden"
          alt="Logo de ATOM Chat"
          ngSrc="assets/images/logo-atom-chat.png"
          width="120"
          height="34"
          priority
        />

        <h1 class="hidden sm:block text-xl font-semibold">Reto Técnico</h1>
        <button (click)="logout()" mat-flat-button color="primary">
          Cerrar Sesión
        </button>
      </div>
    </header>
  `,
  styles: ``,
})
export class AtomHeaderComponent {
  authService = inject(AuthService);
  taskService = inject(TaskService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.taskService.tasks.set([]);
    this.router.navigateByUrl('/login');
  }
}
