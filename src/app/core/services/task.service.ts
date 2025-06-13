import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateTaskPayload, Task } from '../models/task.model';
import { Observable, switchMap, tap } from 'rxjs';
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

  selectedTask = signal<Task | null>(null);

  getTasksByUser(): Observable<Task[]> {
    const userId = this.userAuth()!.id;
    return this.http
      .get<Task[]>(`${baseUrl}/tasks/${userId}`)
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
