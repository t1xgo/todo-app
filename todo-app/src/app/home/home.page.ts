import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks: { name: string; completed: boolean }[] = [];
  newTask: string = '';

  constructor() {}

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  toggleTask(task: { completed: boolean }) {
    task.completed = !task.completed;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
