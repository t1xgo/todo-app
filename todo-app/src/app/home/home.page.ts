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
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: string[] = [];
  newTask: string = '';
  newCategory: string = '';
  taskCategory: string = '';
  taskPriority: string = 'low';
  selectedCategory: string = 'all';
  categoryFilterEnabled = false;
  private remoteConfig: RemoteConfig;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private taskService: TaskService
  ) {
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
  loadInitialData() {
    this.tasks = this.taskService.getTasks();
    this.categories = this.taskService.getCategories();
    this.filterTasks();
  }

  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        name: this.newTask,
        completed: false,
        category: this.taskCategory,
        priority: this.taskPriority,
      };
      this.taskService.addTask(task);
      this.newTask = '';
      this.taskCategory = '';
      this.taskPriority = 'low';
      this.loadInitialData();
    }
  }

  toggleTask(task: Task, index: number) {
    this.taskService.toggleTaskCompletion(index);
    this.loadInitialData();
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
    this.loadInitialData();
  }

  addCategory() {
    if (this.newCategory.trim()) {
      const success = this.taskService.addCategory(this.newCategory.trim());
      if (success) {
        this.newCategory = '';
        this.loadInitialData();
      } else {
        alert('Category already exists!');
      }
    }
  }

  editCategory(index: number) {
    const oldCategory = this.categories[index];
    const newCategory = prompt('Update category:', oldCategory);
    if (newCategory && newCategory.trim()) {
      const success = this.taskService.editCategory(
        oldCategory,
        newCategory.trim()
      );
      if (success) {
        this.loadInitialData();
      } else {
        alert('Category already exists or is invalid!');
      }
    }
  }

  // Delete category
  deleteCategory(index: number) {
    const categoryToDelete = this.categories[index];
    this.taskService.deleteCategory(categoryToDelete);
    this.loadInitialData();
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
