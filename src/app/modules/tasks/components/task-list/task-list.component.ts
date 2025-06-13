import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'atom-task-list',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    MatCheckboxModule,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    MatTableModule,
  ],
  templateUrl: './task-list.component.html',
  styles: ``,
})
export class TaskListComponent implements OnInit {
  dialog = inject(MatDialog);
  taskService = inject(TaskService);
  notificationService = inject(NotificationService);

  filter = signal<{ status?: string }>({});

  get TaskList() {
    return this.taskService.tasks;
  }

  displayedColumns: string[] = [
    'select',
    'title',
    'description',
    'createdAt',
    'state',
    'delete',
  ];
  selection = new SelectionModel<Task>(true, []);

  ngOnInit(): void {
    this.taskService.getTasksByUser().subscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.TaskList().length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

  openEditDialog(row: Task) {
    this.taskService.selectedTask.set(row);
    const dialogRef = this.dialog.open(TaskFormComponent, {
      ariaLabel: 'Diálogo de edición',
      autoFocus: false,
      disableClose: false,
      restoreFocus: true,
      panelClass: '!z-10',
    });

    dialogRef.componentInstance.isUpdate = true;
  }

  updateState(row: Task) {
    this.selection.toggle(row);
    const payload: Partial<Task> = {
      ...row,
      completed: !row.completed,
    };

    this.updateTask(payload);
  }

  updateTask(row: Partial<Task>) {
    this.notificationService.loading('Actualizando...');
    this.taskService.updateTask(row.id!, row).subscribe(() => {
      this.notificationService.dismissLoading();
    });
  }

  deleteTask(row: Task) {
    this.notificationService.loading('Eliminando...');
    this.taskService.deleteTask(row.id).subscribe((_) => {
      this.notificationService.dismissLoading();
      this.notificationService.success('¡Tarea eliminada con exito!', 5000);
    });
  }
}
