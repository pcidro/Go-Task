import { iComment } from './comment.interface';
import { TaskStatus } from '../types/tasks-status';

export interface iTask {
  id: string;
  name: string;
  description: string;
  comments: iComment[];
  status: TaskStatus;
}
