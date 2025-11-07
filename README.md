# Minur FitIn5 - Comprehensive Fitness Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Minur FitIn5 is a full-stack fitness management system designed to streamline gym operations, class scheduling, and member management. The platform offers a seamless experience for gym administrators, trainers, and members alike.

## 🏋️‍♂️ Key Features

### For Members
- User registration and profile management
- Class browsing and booking system
- Membership plans and subscription management
- Trainer profiles and booking
- Personal dashboard with activity tracking
- Secure payment processing

### For Trainers
- Profile management and availability settings
- Class scheduling and management
- Member progress tracking
- Attendance management

### For Administrators
- Comprehensive dashboard with analytics
- User and member management
- Class and trainer management
- Membership plan configuration
- Feedback and contact management
- System configuration

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js
- **UI Components**: React Bootstrap
- **State Management**: Context API
- **Routing**: React Router
- **Form Handling**: Formik
- **Charts**: Chart.js
- **Calendar**: FullCalendar
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer
- **Validation**: Express Validator

## 📂 Project Structure

```
Minur_fitin5/
├── client/                   # Frontend React application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin-specific pages
│   │   │   └── ...          # Other pages
│   │   └── services/        # API service layer
│   └── package.json         # Frontend dependencies
│
└── server/                  # Backend Node.js/Express server
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── middleware/         # Custom middleware
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── seeds/              # Database seeders
    └── server.js           # Server entry point
```

## 🔐 Admin Access

Default admin credentials (change these after first login):
- **Email**: admin@fitin5.com
- **Password**: Admin@123

> **Important**: Change these credentials immediately after your first login.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Minur_fitin5.git
   cd Minur_fitin5
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in the server directory
   - Update the environment variables with your configuration

4. **Start the application**
   ```bash
   # Start the backend server (from server directory)
   npm start
   
   # Start the frontend development server (from client directory)
   npm start
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the Minur FitIn5 team
- Special thanks to all contributors
- Icons by [React Icons](https://react-icons.github.io/react-icons/)

## 📧 Contact

For any inquiries or support, please contact [your-email@example.com].
