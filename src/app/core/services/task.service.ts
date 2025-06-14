import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CreateTaskPayload, Task, TaskState } from '../models/task.model';
import { AuthService } from './auth.service';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private userAuth = this.authService.user;

  tasks = signal<Task[]>([]);

  taskState = signal(TaskState.ALL);

  selectedTask = signal<Task | null>(null);

  getTasksByUser(filters?: {
    title?: string;
    completed?: boolean;
  }): Observable<Task[]> {
    const userId = this.userAuth()!.id;
    let params = new HttpParams();
    if (filters) {
      if (filters.title) params = params.set('title', filters.title);
      if (filters.completed !== undefined)
        params = params.set('completed', filters.completed.toString());
    }

    return this.http
      .get<Task[]>(`${baseUrl}/tasks/${userId}`, { params })
      .pipe(tap((res) => this.tasks.set(res)));
  }

  addTask(payload: CreateTaskPayload): Observable<Task[]> {
    const userId = this.userAuth()!.id;
    return this.http
      .post<Task>(`${baseUrl}/tasks`, { ...payload, userId })
      .pipe(switchMap(() => this.getTasksByUser()));
  }

  updateTask(taskId: string, payload: Partial<Task>): Observable<Task[]> {
    return this.http
      .put<Task>(`${baseUrl}/tasks/${taskId}`, payload)
      .pipe(switchMap(() => this.getTasksByUser()));
  }

  deleteTask(taskId: string): Observable<Task[]> {
    return this.http
      .delete(`${baseUrl}/tasks/${taskId}`)
      .pipe(switchMap(() => this.getTasksByUser()));
  }
}
