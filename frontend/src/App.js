import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import Elections from "./pages/Elections";
import ElectionDetails from "./pages/ElectionDetails";
import Candidates from "./pages/Candidates";
import Congrats from "./pages/Congrats";
import Logout from "./pages/Logout";
import { ToastContainer } from 'react-toastify';
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Works from "./pages/Works";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
// import 'react-toastify\dist\ReactToastify.css';
const router = createBrowserRouter([
  //emailV
  <ToastContainer />,
  {

    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },

      {
        path: "results",
        element: <Results />,
      },
      {
        path: "email-verify",
        element: <EmailVerify />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "works",
        element: <Works />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      // {
      //   path: "verify-otp",
      //   element: <VerifyOtp />,
      // },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      // {
      //   path: "send-otp",
      //   element: <SendOtp />,
      // },
      // {
      //   path: "verify-otp",
      //   element: <VerifyOtp />,
      // },
      {
        path: "elections",
        element: <Elections />,
      },
      {
        path: "elections/:id",
        element: <ElectionDetails />,
      },
      {
        path: "elections/:id/candidates",
        element: <Candidates />,
      },
      {
        path: "congrats",
        element: <Congrats />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
