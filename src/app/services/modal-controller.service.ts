import { inject, Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { TasksCommentsModalComponent } from '../components/tasks-comments-modal/tasks-comments-modal.component';
import { ItaskFormControls } from '../interfaces/task-form-controls.interface';
import { iTask } from '../interfaces/task.interface';
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
    return this._dialog.open<ItaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: {
        mode: 'create',
        formValues: {
          name: '',
          description: '',
        },
      },
    });
  }

  openEditTaskModal(formValues: ItaskFormControls) {
    return this._dialog.open<ItaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: {
        mode: 'edit',
        formValues,
      },
    });
  }

  openTaskCommentsModal(task: iTask) {
    return this._dialog.open(TasksCommentsModalComponent, {
      ...this.modalSizeOptions,
      data: task,
    });
  }
}
