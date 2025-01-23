# Student-Tutor Matching Frontend

This repository hosts the frontend of the **Student-Tutor Matching** application, which connects students with tutors efficiently. The project features a modern user interface with seamless functionality to enhance the experience of both students and tutors.

---

## Table of Contents
1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
5. [File Structure](#file-structure)
6. [Screenshots](#screenshots)
7. [License](#license)

---

## About the Project

The **Student-Tutor Matching Frontend** is a platform designed for:
- Students to find and book sessions with qualified tutors.
- Tutors to list their services and manage their schedules.

This application ensures a smooth user experience through:
- Simple navigation.
- Efficient booking and scheduling tools.
- A responsive interface for accessibility across devices.

---

## Features

- **User Authentication**:
  - Secure sign-up and login for students and tutors.
- **Profile Management**:
  - Students and tutors can manage their personal information.
- **Tutor Search**:
  - Search and filter tutors based on expertise, ratings, and availability.
- **Session Management**:
  - Book, reschedule, or cancel tutoring sessions easily.
- **Responsive Design**:
  - Optimized for mobile and tablet.

---

## Technologies Used

The project leverages the following technologies:

-  **ReactNative.js**: Core frontend framework.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Expo**: Framework for building universal React apps.
- **JavaScript (ES6+)**: Main programming language.
- **Axios**: HTTP client for API interactions.
- **Node.js**: Backend runtime (for development tools).

---

## Getting Started

### Prerequisites

Ensure you have the following tools installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IttaySegal/student-tutor-matching-frontend.git

2. Installation:
   npm install

3.Running The Project:
  npx expo start -c

### File Structure

student-tutor-matching-frontend/
├── app/
│   ├── (auth)/       # Authentication pages (Sign-in, Sign-up)
│   ├── (tabs)/       # Main app sections (Home, Profile, etc.)
│   ├── index.jsx     # Main app entry point
│   └── _layout.jsx   # App layout configuration
├── assets/           # Fonts, icons, images, and other static assets
│   ├── fonts/        # Poppins font files
│   ├── icons/        # App icons (e.g., bookmark, search)
│   ├── images/       # App images (e.g., logo, thumbnails)
├── components/       # Reusable UI components (e.g., buttons, forms)
├── constants/        # Centralized constants for icons, images, etc.
├── services/         # API services (e.g., authService.js)
├── global.css        # Global styles
├── package.json      # Project dependencies
├── tailwind.config.js# Tailwind CSS configuration
└── README.md         # Project documentation


### Screenshots
Main Page:

![image](https://github.com/user-attachments/assets/d0aa3834-bef8-46fa-bfbd-c75b33a4db86)

Sign Up Page:

![WhatsApp Image 2025-01-14 at 09 25 36_418e27b3](https://github.com/user-attachments/assets/91fbd139-74d7-4088-93f3-fb7871a95c06)

Login Page:

![WhatsApp Image 2025-01-14 at 09 25 36_f13dccc4](https://github.com/user-attachments/assets/ede7b288-1ed0-48cc-be18-cfda42cb6c78)

### License
MIT License

Copyright (c) 2025
Ben-Gurion University of the Negev  
Department of Information Systems and Software Engineering

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

