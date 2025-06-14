import { Component, inject, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

import { TaskState } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'atom-task-filter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIcon,
  ],
  templateUrl: './task-filter-form.component.html',
  styles: ``,
})
export class TaskFilterFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private destroy$ = new Subject<void>();

  readonly TaskState = TaskState;

  taskState = this.taskService.taskState;

  form = this.fb.group({
    state: [TaskState.ALL],
    title: [''],
  });

  constructor() {
    effect(() => {
      this.form.get('state')?.setValue(this.taskState());
    });
  }

  ngOnInit(): void {
    this.form
      .get('title')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((res) => {
          let filters = this.filterTasks(null, res!);
          return this.taskService.getTasksByUser(filters);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.taskService.taskState.set(TaskState.ALL);
      });

    this.form
      .get('state')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        filter((res) => res !== this.taskService.taskState()),
        switchMap((res) => {
          this.taskService.taskState.set(res!);
          let filters = this.filterTasks(res!);
          return this.taskService.getTasksByUser(filters);
        })
      )
      .subscribe();
  }

  private filterTasks(state?: TaskState | null, title?: string) {
    const filters: any = {};

    if (state === TaskState.COMPLETED) {
      filters.completed = true;
    } else if (state === TaskState.PENDING) {
      filters.completed = false;
    }

    if (title) {
      filters.title = title;
    }

    return filters;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
