import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Layouts/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Layouts/Footer';
import Courses from './components/Courses/Courses';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import NotFound from './components/Layouts/NotFound';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import Users from './components/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/userAction'; //action
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layouts/Loader';
import Subscribe from './components/Payments/Subscribe';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';

function App() {

  const { isAuthenticated, user, error, message, loading } = useSelector(state => state.user)

  //Toaster
  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })  //so that the state will be empty
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })  //so that the state will be empty
    }
  }, [dispatch, error, message])

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  //profile route will be only accessable if isAuthenticated is true (if user is logged in) & it will be redirectd to "/profile" directly from "/login" if isAuthenticated is true (if user is logged in)
  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} user={user} loading={loading} />
        {
          loading ? (<Loader />) : (
            <>
              <Toaster />
              <Routes>
                <Route exact path='/' element={<Home isAuthenticated={isAuthenticated} loading={loading} />} />
                <Route exact path='/courses' element={<Courses />} />
                <Route exact path='/course/:id' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <CoursePage user={user} />
                  </ProtectedRoute>
                } />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/request' element={<Request />} />
                <Route exact path='/about' element={<About />} />

                <Route exact path='/profile' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <Profile user={user} />
                  </ProtectedRoute>
                } />
                <Route exact path='/changepassword' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <ChangePassword />
                  </ProtectedRoute>
                } />
                <Route exact path='/updateprofile' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <UpdateProfile user={user} />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route exact path='/admin/dashboard' element={
                  <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} >
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route exact path='/admin/createcourse' element={
                  <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} >
                    <CreateCourse />
                  </ProtectedRoute>
                } />
                <Route exact path='/admin/courses' element={
                  <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} >
                    <AdminCourses />
                  </ProtectedRoute>
                } />
                <Route exact path='/admin/users' element={
                  <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} >
                    <Users />
                  </ProtectedRoute>
                } />

                <Route exact path='/login' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <Login />
                  </ProtectedRoute>
                } />
                <Route exact path='/register' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <Register />
                  </ProtectedRoute>
                } />
                <Route exact path='/resetpassword/:token' element={
                  <ResetPassword />
                } />
                <Route exact path='/forgotpassword' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <ForgotPassword />
                  </ProtectedRoute>
                } />

                <Route
                  path="/subscribe"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Subscribe user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route exact path='*' element={<NotFound />} />

                <Route path="/paymentsuccess" element={<PaymentSuccess />} />

                <Route path="/paymentfail" element={<PaymentFail />} />

              </Routes>
              <Footer />
            </>
          )
        }
      </Router>
    </>
  );
}

export default App;