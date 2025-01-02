import { Injectable } from '@angular/core';

export interface Task {
  name: string;
  completed: boolean;
  category: string;
  priority: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private categories: string[] = [];

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  toggleTaskCompletion(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  getCategories(): string[] {
    return [...this.categories];
  }

  addCategory(category: string): boolean {
    if (!this.categories.includes(category)) {
      this.categories.push(category);
      return true;
    }
    return false;
  }

  editCategory(oldCategory: string, newCategory: string): boolean {
    const index = this.categories.indexOf(oldCategory);
    if (index !== -1 && !this.categories.includes(newCategory)) {
      this.categories[index] = newCategory;

      this.tasks.forEach((task) => {
        if (task.category === oldCategory) {
          task.category = newCategory;
        }
      });
      return true;
    }
    return false;
  }

  deleteCategory(category: string): void {
    this.categories = this.categories.filter((cat) => cat !== category);
    this.tasks.forEach((task) => {
      if (task.category === category) {
        task.category = '';
      }
    });
  }
}
