import { Component } from '@angular/core';
import { AtomHeaderComponent } from "../../../../shared/components/atom-header/atom-header.component";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskListComponent } from "../../components/task-list/task-list.component";

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [AtomHeaderComponent, TaskFormComponent, TaskListComponent],
  templateUrl: './task-page.component.html',
  styles: ``
})
export default class TaskPageComponent {

}
