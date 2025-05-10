# Application Enhancements

## Changes Implemented

### **1. Task Categorization**
- Added UI components to manage task categories:
  - **Create**: Users can add new categories for better organization.
  - **Edit**: Existing categories can be updated.
  - **Delete**: Unnecessary categories can be removed.
- Implemented backend logic to:
  - Assign a category to each task.
  - Filter tasks based on their assigned category.

### **2. Firebase RemoteConfig**
- Integrated **Firebase RemoteConfig** to enable dynamic updates to features without requiring a new app release.
- Ensured seamless integration with the app's existing functionality.

### **3. Code Optimizations**
- **Refactoring**:
  - Consolidated redundant code into reusable modules and components for better maintainability.
  - Improved the clarity of the codebase by adopting consistent naming conventions.
- **Performance Enhancements**:
  - Optimized the application logic to improve load times.
  - Introduced better error handling mechanisms to enhance user experience and app stability.

### **Aditional features**
-  Introduced the ability to assign a **priority level** to tasks using color indicators.
-  Added a modal that explain how the app works.
---

## How to Compile and Run the Application

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Install [Ionic CLI](https://ionicframework.com/docs/cli) globally:
   ```bash
   npm install -g @ionic/cli
    ```

### **Instructions to run from the repository**
1. Clone the repository.
   ```bash
   git clone https://github.com/t1xgo/todo-app.git
   cd todo-app/
   ```

2. Install project dependencies.
   ```bash
   npm install
    ```
3. Run project on emulator.
```bash
   ionic cordova emulate android  
  ```
4. Run project on android device (do not forget to connect via USB and enable USB debugging)
```bash
  ionic cordova run android  
```

### **Instructions to run from the file**
1. In the mail, i send a link with the download url.
2. Go to the link and download. (You can just download it once)
3. Uncompressed the zip file.
4. Connect your android device.
5. Pass the .apk file to your device (Set up device to accept installations from unkown devices)
6. Install in your cellphone and enjoy 🏖️

   
