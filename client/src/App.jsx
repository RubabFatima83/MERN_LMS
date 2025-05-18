import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Signup from './pages/Singup';
import VerifyOtp from './pages/OTPVerify';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './auth/ProtectedRoute';
import StudentDashboard from './pages/Dashboards/StudentDashboard';
import MentorDashboard from './pages/Dashboards/MentorDashboard';
import AdminPanel from './pages/Dashboards/AdminPanel';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />


          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard/student' element={<StudentDashboard />}></Route>
            <Route path='/dashboard/mentor' element={<MentorDashboard />}></Route>
            <Route path='/dashboard/admin' element={<AdminPanel />}></Route>
            {/* Add more protected routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
