import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { iTask } from '../interfaces/task.interface';
import { ItaskFormControls } from '../interfaces/task-form-controls.interface';
import { TaskStatusEnum } from '../enums/tasks-status.enum';
import { generateUniqueIdWithTimeStamp } from '../utils/generate-unique-id-with-timestamp';
import { TaskStatus } from '../types/tasks-status';
import { iComment } from '../interfaces/comment.interface';

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

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    taskNextStatus: TaskStatus,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      currentTask.status = taskNextStatus;
      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]);

      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  updateTaskNameAndDescription(
    taskId: string,
    taskStatus: TaskStatus,
    newTaskName: string,
    nemTaskDescription: string,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskStatus);

    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];
      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        name: newTaskName,
        description: nemTaskDescription,
      };
      currentTaskList.next(updatedTaskList);
    }
  }

  updateTaskComments(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    newTaskComments: iComment[],
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );
    if (currentTaskIndex > -1) {
      const updatedTaskComments = [...currentTaskList.value];
      updatedTaskComments[currentTaskIndex] = {
        ...updatedTaskComments[currentTaskIndex],
        comments: [...newTaskComments],
      };
      currentTaskList.next(updatedTaskComments);
    }
  }

  private getTaskListByStatus(TaskStatus: TaskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$,
    };
    return taskListObj[TaskStatus];
  }
}
