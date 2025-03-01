import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { Assignment, Position, TeamConfig, Time } from './models';
import { CONFIG, POSITIONS } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public config: TeamConfig = CONFIG;
  public positions: Position[] = POSITIONS;
  public timeMarks: string[] = [];
  public dragElement: HTMLElement | null = null;

  public ngOnInit(): void {
    this.timeMarks = this._generateTimeMarks();
  }

  public isAssignmentStart(position: Position, timeMark: string): boolean {
    return position.assignments.some((a) => a.startTime === timeMark);
  }

  public getAssignment(position: Position, timeMark: string): Assignment {
    return position.assignments.find((a) => a.startTime === timeMark)!;
  }

  public getAssignmentBarWidth(assignment: Assignment): string {
    const duration = new Time(assignment.endTime).diff(
      new Time(assignment.startTime),
      'minutes'
    );
    return `${(duration / 15) * 100}%`;
  }

  public onDblClick(assignment: Assignment) {
    console.log('edit me', assignment);
    // TODO: Implement edit assignment
  }

  public onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      console.log('delete me');
      // TODO: Implement delete assignment
    }
  }

  public onDragStart(event: DragEvent) {
    this.dragElement = event.target as HTMLElement;
    this.dragElement.classList.add('dragging');
  }

  public onDragEnter(event: DragEvent) {
    event.preventDefault();
  }

  public onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  public onDragEnd(event: DragEvent) {
    (event.target as HTMLElement)?.classList.remove('dragging');
  }

  public onDrop(event: any): void {
    if (this.dragElement === null) {
      console.error('dragElement is null');
      return;
    }

    const target = event.target as HTMLElement;
    const targetPositionId = target.getAttribute('data-position-id');
    const targetTimeMark = target.getAttribute('data-time-mark');

    if (!targetPositionId || !targetTimeMark) {
      console.error('targetPositionId or targetTimeMark is null');
      return;
    }

    const assignmentId = this.dragElement.id;
    const position = this.positions.find((p) =>
      p.assignments.some((a) => a.id === +assignmentId)
    );

    if (!position) {
      console.error('position not found');
      return;
    }

    if (position.id !== +targetPositionId) {
      console.error('position mismatch', position.id, targetPositionId);
      return;
    }

    const assignment = position.assignments.find(
      (a) => a.id === +assignmentId
    )!;

    const duration = new Time(assignment.endTime).diff(
      new Time(assignment.startTime),
      'minutes'
    );

    const startTime = new Time(targetTimeMark);
    const endTime = startTime.add(duration, 'minutes');

    const updatedAssignment: Assignment = {
      ...assignment,
      startTime: startTime.toString(),
      endTime: endTime.toString(),
    };

    const updatedAssignments = position.assignments.map((a) => {
      return a.id === +assignmentId ? updatedAssignment : a;
    });

    this.positions = this.positions.map((p) => {
      if (p.id === +position.id) {
        return {
          ...p,
          assignments: updatedAssignments,
        };
      }

      return p;
    });
  }

  private _generateTimeMarks(): string[] {
    const startTime = new Time(this.config.startTime);
    const endTime = new Time(this.config.endTime);

    const marks = [];
    let currentTime = startTime;
    while (currentTime.diff(endTime, 'minutes') <= 0) {
      marks.push(currentTime.toString());
      currentTime = currentTime.add(15, 'minutes');
    }

    return marks;
  }
}
