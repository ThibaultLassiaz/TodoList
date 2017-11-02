import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalModificationComponent } from './task-modal-modification.component';

describe('TaskModalModificationComponent', () => {
  let component: TaskModalModificationComponent;
  let fixture: ComponentFixture<TaskModalModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskModalModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskModalModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
