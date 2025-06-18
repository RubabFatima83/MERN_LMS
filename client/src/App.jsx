import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/common/Home';
import Signup from './auth/components/Singup';
import VerifyOtp from './auth/components/OTPVerify';
import Login from './auth/components/Login';
import ResetPassword from './auth/components/ResetPassword';
import ForgotPassword from './auth/components/ForgotPassword';
import StudentDashboard from './pages/Dashboards/StudentDashboard';
import MentorDashboard from './pages/Dashboards/MentorDashboard';
import AdminPanel from './pages/Dashboards/AdminPanel';
import ProtectedRoute from './auth/Protect/ProtectedRoutes';
import Unauthorized from './auth/components/Unauthorized';
import { useAuth } from './auth/context/AuthContext';
import UserManagement from './pages/admin/UserManagement'
import AnalyticsOverview from './pages/admin/AnalyticsOverview'
import SystemLogs from './pages/admin/SystemLogs'
import MyCourses from './pages/mentor/MyCourses';
// import ViewCourse from './pages/mentor/courses/ViewCourse'
import EditCourse from './pages/mentor/courses/EditCourse';
import StudentList from './pages/mentor/StudentList';
import MentorReports from './pages/mentor/Reports';
import MentorMessages from './pages/mentor/Messages';
import StudentCourses from './pages/student/StudentCourses';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentProgress from './pages/student/StudentProgress';
import Announcements from './pages/student/StudentAnnouncement';
// import AddLecture from './pages/mentor/lectures/AddLectures';
import EditLecture from './pages/mentor//lectures/EditLecture';
import LectureList from './pages/mentor/lectures/LectureList';
import CreateAssignment from './pages/mentor/Assignments/CreateAssignment';
import MyAssignments from './pages/mentor/Assignments/MyAssignments';
import CreateAnnouncement from './pages/mentor/Announcement/CreateAnnouncement';
import MentorAnnouncementList from './pages/mentor/Announcement/AnnouncementList';
import Courses from './pages/common/Courses';
import AboutPage from './pages/common/About';
import ContactPage from './pages/common/Contact';
import StudentCourseView from './pages/student/StudentCourseView';
import ProfileSettings from './pages/common/ProfileSettings';
import UpdatePassword from './auth/components/UpdatePassword';
import TermsOfService from './components/Home/TermsOfServices';
import PrivacyPolicy from './components/Home/PrivacyPolicy';
import FaqSection from './components/Home/FaqSection';
import GeneralCourseView from './pages/common/CourseViewPage';
import AddLecture from './pages/mentor/lectures/AddLectures';
import CreateCourse from './pages/mentor/courses/createCourse';
import SubscriptionPage from './pages/Subscription/SubscriptionPage';
import SuccessPage from './pages/Subscription/SuccessPage';
import CancelPage from './pages/Subscription/CancelPage';
import FaqList from './pages/admin/content/faqs/FaqList';
import AddFaq from './pages/admin/content/faqs/AddFaq';
import EditFaq from './pages/admin/content/faqs/EditFaq';
import TermsList from './pages/admin/content/terms/termsList';
import AddTerms from './pages/admin/content/terms/addTerms';
import EditTerms from './pages/admin/content/terms/editTerms';
import PrivacyList from './pages/admin/content/privacy-policy/policyList';
import AddPrivacy from './pages/admin/content/privacy-policy/addPolicy';
import EditPrivacy from './pages/admin/content/privacy-policy/editPolicy';
import ContactMessages from './pages/admin/contacts/ContactMessages';
import MessageDetails from './pages/admin/contacts/MessageDetail';
import MentorCourseView from './pages/mentor/CourseView';

function App() {
  const { user } = useAuth()

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/course/view/:id' element={<GeneralCourseView />}></Route>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path='/faqs' element={<FaqSection />}></Route>
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Stripe Payment */}
          <Route path='/subscription' element={<SubscriptionPage />}></Route>
          <Route path="/subscription-success" element={<SuccessPage />} />
          <Route path="/subscription-cancel" element={<CancelPage />} />

          {/* Auth Routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/update-password' element={<UpdatePassword />}></Route>

          {/* Role-Based Protected Routes */}
          <Route element={<ProtectedRoute user={user} allowedRoles={['Student']} />}>
            <Route path='/dashboard/student' element={<StudentDashboard />} />
            <Route path="/student/courses" element={<StudentCourses />} />
            <Route path="/student/course/:id" element={<StudentCourseView />} />
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/student/progress" element={<StudentProgress />} />
            <Route path="/student/announcements" element={<Announcements />} />
          </Route>

          <Route element={<ProtectedRoute user={user} allowedRoles={['Mentor']} />}>
            <Route path='/dashboard/mentor' element={<MentorDashboard />} />
            <Route path='/mentor/create-course' element={<CreateCourse />} />
            <Route path='/mentor/my-courses' element={<MyCourses />} />
            <Route path='/mentor/course-view/:id' element={<MentorCourseView />} />
            <Route path="/mentor/edit-course/:id" element={<EditCourse />} />
            <Route path='/mentor/course/:courseId/add-lectures' element={<AddLecture />}></Route>
            <Route path="/mentor/edit-lecture/:id" element={<EditLecture />} />
            <Route path="/mentor/lecture-list/:courseId" element={<LectureList />} />
            <Route path="/mentor/create-assignment" element={<CreateAssignment />} />
            <Route path="/mentor/my-assignments" element={<MyAssignments />} />
            <Route path="/mentor/create-announcement" element={<CreateAnnouncement />} />
            <Route path="/mentor/announcements" element={<MentorAnnouncementList />} />
            <Route path="/mentor/student-overview" element={<StudentList />} />
            <Route path="/mentor/reports" element={<MentorReports />} />
            <Route path="/mentor/messages" element={<MentorMessages />} />
          </Route>

          {/* <Route element={<ProtectedRoute user={user} allowedRoles={['Admin']} />}> */}
          <Route path="/dashboard/admin" element={<AdminPanel />}></Route>
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/analytics" element={<AnalyticsOverview />} />
          <Route path="/admin/logs" element={<SystemLogs />} />
          <Route path='/admin/messages' element={<ContactMessages />}></Route>
          <Route path='/admin/contact/:id' element={<MessageDetails />}></Route>
          <Route path="/admin/faqs-management" element={<FaqList />} />
          <Route path="/admin/faqs/add" element={<AddFaq />} />
          <Route path="/admin/faqs/edit/:id" element={<EditFaq />} />
          <Route path='/admin/terms-of-services' element={<TermsList />}></Route>
          <Route path="/admin/terms/add" element={<AddTerms />} />
          <Route path="/admin/terms/edit/:id" element={<EditTerms />} />
          <Route path='/admin/privacy-policy' element={<PrivacyList />}></Route>
          <Route path="/admin/privacy/add" element={<AddPrivacy />} />
          <Route path="/admin/privacy/edit/:id" element={<EditPrivacy />} />
          {/* </Route> */}

          {/* Unauthorized Page */}
          <Route path='/unauthorized' element={<Unauthorized />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
