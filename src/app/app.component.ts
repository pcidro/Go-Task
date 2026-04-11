import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { TaskFormModalComponent } from './components/task-form-modal/task-form-modal.component';
import { TasksCommentsModalComponent } from './components/tasks-comments-modal/tasks-comments-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MainContentComponent,
    TaskFormModalComponent,
    TasksCommentsModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gotask';
}
