import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./ui/loader";
import SignUp from "./auth/signup/signup";
import { AuthLayout } from "./auth"; // Auth layout component

import { AppLayout } from "./applayout";
import { AppPage } from "./pages/app";
import { Post } from "./pages/post/post";
import { PostOverview } from "./pages/postOverview/postOverview";
import client from "./services/client";
import { UserDetails } from "./pages/profile/UserDetail";
import { Category } from "./pages/categories/categories";
import { Bookmarks } from "./pages/bookmarks/bookmarks";
import { Analytics } from "./pages/analytics/analytics";

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
            />{" "}
            <Route
              path="post"
              element={
                <Suspense fallback={<Loader />}>
                  <Post />
                </Suspense>
              }
            />
            <Route
              path="blog/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <PostOverview />
                </Suspense>
              }
            />
            <Route
              path="category/:category"
              element={
                <Suspense fallback={<Loader />}>
                  <Category />
                </Suspense>
              }
            />
            <Route
              path="bookmarks"
              element={
                <Suspense fallback={<Loader />}>
                  <Bookmarks />
                </Suspense>
              }
            />
            <Route
              path="analytics"
              element={
                <Suspense fallback={<Loader />}>
                  <Analytics />
                </Suspense>
              }
            />{" "}
            <Route
              path="myprofile"
              element={
                <Suspense fallback={<Loader />}>
                  <UserDetails />
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
