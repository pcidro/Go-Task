import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { iTask } from '../interfaces/task.interface';
import { ItaskFormControls } from '../interfaces/task-form-controls.interface';
import { TaskStatusEnum } from '../enums/tasks-status.enum';
import { generateUniqueIdWithTimeStamp } from '../utils/generate-unique-id-with-timestamp';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Tarefas fazer
  private todoTasks$ = new BehaviorSubject<iTask[]>([]);
  readonly todoTasks = this.todoTasks$
    .asObservable()
    .pipe(map((list) => structuredClone(list)));

  // Tarefas fazendo

  private doingTasks$ = new BehaviorSubject<iTask[]>([]);
  readonly doingTasks = this.doingTasks$
    .asObservable()
    .pipe(map((list) => structuredClone(list)));

  // Tarefas concluido

  private doneTasks$ = new BehaviorSubject<iTask[]>([]);
  readonly doneTasks = this.doneTasks$
    .asObservable()
    .pipe(map((list) => structuredClone(list)));

  addTask(taskInfos: ItaskFormControls) {
    const newTask: iTask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimeStamp(),
      comments: [],
    };

    const currentList = this.todoTasks$.value;
    this.todoTasks$.next([...currentList, newTask]);
  }
}
