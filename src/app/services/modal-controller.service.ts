import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { TasksCommentsModalComponent } from '../components/tasks-comments-modal/tasks-comments-modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly _dialog = inject(Dialog);
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%',
  };

  openNewTaskModal() {
    return this._dialog.open(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: {
        mode: 'create',
      },
    });
  }

  openEditTaskModal() {
    return this._dialog.open(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: {
        mode: 'edit',
      },
    });
  }

  openTaskCommentsModal() {
    return this._dialog.open(TasksCommentsModalComponent, {
      ...this.modalSizeOptions,
    });
  }
}
