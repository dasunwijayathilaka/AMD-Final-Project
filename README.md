# 💪 FitTrack – Workout Planner App 📱

FitTrack is a mobile application designed to help users **plan, organize, and track** their daily workout routines.  
Built with **React Native** ⚛️, it enables users to **add, edit, delete, and view exercises** while securely storing their data 🔐 using **Firebase** or a **Mock API**.

---

## ✨ Features

✅ **User Authentication** (Login / Signup)  
✅ **Add, View, Edit, Delete Workouts** (CRUD Operations)  
✅ **Simple List-based UI** 📋 for workouts  

---

## 🚀 Optional Features (Future Enhancements)

- 🏃 **Workout Categorization** (Cardio, Strength, Abs, etc.)  
- 📈 **Progress Tracker** to monitor completed workouts  
- ⏰ **Reminder/Notification System** to stay motivated  
- 👤 **User Profile** with basic details  

---

## 🛠️ Tech Stack

- ⚛️ **React Native** – Cross-platform mobile app development  
- 🔥 **Firebase** – Authentication & Realtime Database  
- 🎨 **NativeWind / TailwindCSS** – Styling & UI  

---

## 📸 Screenshots

| Login Screen | Workout List | Add Workout |
|--------------|--------------|--------------|
| ![Login](assets/screenshots/login.png) | ![Workout List](assets/screenshots/workout-list.png) | ![Add Workout](assets/screenshots/add-workout.png) |

*(Add your real screenshots inside an `assets/screenshots/` folder in your repo.)*  

---

## 🎥 Demo Video

▶️ [Watch on YouTube](https://youtu.be/your-demo-video-link)  

*(Replace with your actual YouTube link once uploaded.)*  

---

## 📂 Installation & Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/FitTrack.git
cd FitTrack

## 2️⃣ Install Dependencies
```bash
npm install

3️⃣ Configure Firebase

Create a Firebase project at Firebase Console

Enable Authentication (Email/Password) and Firestore Database

Add your Firebase config inside a firebaseConfig.js file:

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};


4️⃣ Run the App

npx expo start
Press a to open Android Emulator

Press i to open iOS Simulator (Mac only)

Or scan the QR code 📱 using the Expo Go app


🎯 Project Highlights

Strong understanding of React Native mobile app development

Hands-on practice with CRUD operations 🔄

Secure user authentication 🔑

Scalable database handling with Firebase 🌐

---
## 👨‍💻 Author

Dasun Wijayathilaka
📍 Colombo, Sri Lanka


---
⭐ Contribute

Want to contribute? Fork the repo 🍴 and submit a Pull Request! 🚀

📜 License

This project is licensed under the MIT License.
