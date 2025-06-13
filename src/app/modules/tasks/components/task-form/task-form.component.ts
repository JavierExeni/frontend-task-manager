import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { CreateTaskPayload, Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'atom-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogClose,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
  ],
  templateUrl: './task-form.component.html',
  styles: ``,
})
export class TaskFormComponent implements OnInit {
  @ViewChild('taskForm') taskForm!: NgForm;

  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  notificationService = inject(NotificationService);

  isUpdate = false;

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.patchValue(this.taskService.selectedTask()!);
  }

  submit() {
    const formValue = this.form.value;

    if (this.isUpdate) {
      this.onUpdate(formValue);
      return;
    }
    this.onCreate({
      title: formValue.title!,
      description: formValue.description!,
    });
  }

  onCreate(data: CreateTaskPayload) {
    this.notificationService.loading('Registrando...');
    this.taskService.addTask(data).subscribe((res) => {
      this.notificationService.dismissLoading();
      this.notificationService.success('¡Tarea registrada con exito!', 8000);
      this.taskForm.resetForm();
    });
  }

  onUpdate(data: Partial<Task>) {
    this.notificationService.loading('Actualizando...');
    const taskId = this.taskService.selectedTask()!.id;
    this.taskService.updateTask(taskId, data).subscribe((res) => {
      this.notificationService.dismissLoading();
      this.notificationService.success('¡Tarea actualizada con exito!', 8000);
      this.taskForm.resetForm();
    });
  }
}
