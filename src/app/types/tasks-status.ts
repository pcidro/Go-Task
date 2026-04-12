import { TaskStatusEnum } from '../enums/tasks-status.enum';
export type TaskStatus =
  | TaskStatusEnum.TODO
  | TaskStatusEnum.DOING
  | TaskStatusEnum.DONE;
