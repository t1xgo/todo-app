import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false
})
export class HomePage {
  tasks: { name: string; completed: boolean; category: string }[] = [];
  filteredTasks: { name: string; completed: boolean; category: string }[] = [];
  categories: string[] = [];
  newTask: string = '';
  taskCategory: string = '';
  newCategory: string = '';
  selectedCategory: string = 'all';

  constructor() {}

  // Tasks
  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ name: this.newTask, completed: false, category: this.taskCategory });
      this.newTask = '';
      this.taskCategory = '';
      this.filterTasks();
    }
  }

  toggleTask(task: { completed: boolean }) {
    task.completed = !task.completed;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.filterTasks();
  }

  // Categories
  addCategory() {
    if (this.newCategory.trim() !== '' && !this.categories.includes(this.newCategory)) {
      this.categories.push(this.newCategory);
      this.newCategory = '';
    }
  }

  editCategory(index: number) {
    const updatedCategory = prompt('Editar categoría:', this.categories[index]);
    if (updatedCategory && updatedCategory.trim() !== '' && !this.categories.includes(updatedCategory)) {
      const oldCategory = this.categories[index];
      this.categories[index] = updatedCategory;

      // Update task that had the old category
      this.tasks.forEach((task) => {
        if (task.category === oldCategory) {
          task.category = updatedCategory;
        }
      });
      this.filterTasks();
    }
  }

  deleteCategory(index: number) {
    const categoryToDelete = this.categories[index];
    this.categories.splice(index, 1);

    // Delete category from tasks
    this.tasks.forEach((task) => {
      if (task.category === categoryToDelete) {
        task.category = '';
      }
    });
    this.filterTasks();
  }

  // Filter tasks
  filterTasks() {
    if (this.selectedCategory === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.category === this.selectedCategory
      );
    }
  }
}
