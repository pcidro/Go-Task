import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCommentsModalComponent } from './tasks-comments-modal.component';

describe('TasksCommentsModalComponent', () => {
  let component: TasksCommentsModalComponent;
  let fixture: ComponentFixture<TasksCommentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksCommentsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
