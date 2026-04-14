import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateUniqueIdWithTimeStamp } from '../../utils/generate-unique-id-with-timestamp';

import { iComment } from '../../interfaces/comment.interface';
import { iTask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tasks-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-comments-modal.component.html',
  styleUrl: './tasks-comments-modal.component.css',
})
export class TasksCommentsModalComponent {
  readonly _task: iTask = inject(DIALOG_DATA);
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);
  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;
  @Input() task!: iTask;

  commentControl = new FormControl('', [Validators.required]);
  taskCommentsChanged = false;

  onAddComment() {
    const newComment: iComment = {
      id: generateUniqueIdWithTimeStamp(),
      description: this.commentControl.value ? this.commentControl.value : '',
    };
    this._task.comments.unshift(newComment);
    this.commentControl.reset();
    this.taskCommentsChanged = true;
    this.commentInputRef.nativeElement.focus();
  }

  onRemoveComment(idRemove: string) {
    this._task.comments = this._task.comments.filter(
      (task) => task.id !== idRemove,
    );
    this.taskCommentsChanged = true;
  }

  onCloseModal() {
    this._dialogRef.close(this.taskCommentsChanged);
  }
}
