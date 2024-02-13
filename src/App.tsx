import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./ui/loader";
import SignUp from "./auth/signup/signup";
import { AuthLayout } from "./auth"; // Auth layout component

import { AppLayout } from "./applayout";
import { AppPage } from "./pages/app";

const SignIn = lazy(() => import("./auth/signin/signin"));
// const UserDashboard = lazy(() => import("./user/dashboard")); // Let's assume you have a UserDashboard component

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Loader />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route
              path="signin"
              element={
                <Suspense fallback={<Loader />}>
                  <SignIn />
                </Suspense>
              }
            />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* Application Routes */}
          <Route element={<AppLayout />}>
            <Route
              path="app"
              element={
                <Suspense fallback={<Loader />}>
                  <AppPage />
                </Suspense>
              }
            />
            {/* Add other AppLayout specific routes here */}
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
