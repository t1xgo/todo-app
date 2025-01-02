import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  getRemoteConfig,
  fetchAndActivate,
  getBoolean,
  RemoteConfig,
} from 'firebase/remote-config';
import { initializeApp } from 'firebase/app';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: { name: string; completed: boolean; category: string }[] = [];
  filteredTasks: { name: string; completed: boolean; category: string }[] = [];
  categoryFilterEnabled = false; // Feature flag state
  categories: string[] = [];
  newTask: string = '';
  taskCategory: string = '';
  newCategory: string = '';
  selectedCategory: string = 'all';
  private remoteConfig: RemoteConfig;

  constructor(private changeDetector: ChangeDetectorRef) {
    const firebaseConfig = {
      apiKey: environment.firebaseConfig.apiKey,
      authDomain: environment.firebaseConfig.authDomain,
      projectId: environment.firebaseConfig.projectId,
      storageBucket: environment.firebaseConfig.storageBucket,
      messagingSenderId: environment.firebaseConfig.messagingSenderId,
      appId: environment.firebaseConfig.appId,
    };

    initializeApp(firebaseConfig);
    this.remoteConfig = getRemoteConfig();
    this.remoteConfig.settings.minimumFetchIntervalMillis = 360;
  }

  ngOnInit() {
    this.initializeRemoteConfig();
  }

  async initializeRemoteConfig() {
    try {
      // Fetch and activate the latest Remote Config values
      await fetchAndActivate(this.remoteConfig);

      // Here is how we get the value of the feature flag
      const featureFlagValue = getBoolean(
        this.remoteConfig,
        'enableCategoryFilter'
      );

      this.categoryFilterEnabled = featureFlagValue;
      this.changeDetector.detectChanges();
    } catch (error) {
      console.error('There was an error getting the remote setup:', error);
    }
  }
  // Tasks
  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({
        name: this.newTask,
        completed: false,
        category: this.taskCategory,
      });
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
    if (
      this.newCategory.trim() !== '' &&
      !this.categories.includes(this.newCategory)
    ) {
      this.categories.push(this.newCategory);
      this.newCategory = '';
    }
  }

  editCategory(index: number) {
    const updatedCategory = prompt('Update category:', this.categories[index]);
    if (
      updatedCategory &&
      updatedCategory.trim() !== '' &&
      !this.categories.includes(updatedCategory)
    ) {
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
    if (this.categoryFilterEnabled && this.selectedCategory !== 'all') {
      this.filteredTasks = this.tasks.filter(
        (task) => task.category === this.selectedCategory
      );
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }
}
