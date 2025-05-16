import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import AnimatedPage from './components/AnimatedPage.jsx'; // Import AnimatedPage
import HomePage from './pages/HomePage/HomePage.jsx'; // Import the actual HomePage
import BlogPage from './pages/BlogPage/BlogPage.jsx'; // Import the actual BlogPage
import BlogPostPage from './pages/BlogPostPage/BlogPostPage.jsx'; // Import the actual BlogPostPage
import ReviewsPage from './pages/ReviewsPage/ReviewsPage.jsx'; // Import the actual ReviewsPage
import ReviewDetailPage from './pages/ReviewDetailPage/ReviewDetailPage.jsx'; // Import the actual ReviewDetailPage
import AboutPage from './pages/AboutPage/AboutPage.jsx'; // Import the actual AboutPage
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'; // Import the actual NotFoundPage
import './App.css';

// Placeholder components for pages - will be replaced by actual page components
// const HomePage = () => <div>Home Page - Content TBD</div>; // Placeholder removed
// const BlogPage = () => <div>Blog Page - Content TBD</div>; // Placeholder removed
// const BlogPostPage = () => <div>Blog Post Page - Content TBD</div>; // Placeholder removed
// const ReviewsPage = () => <div>Reviews Page - Content TBD</div>; // Placeholder removed
// const ReviewDetailPage = () => <div>Review Detail Page - Content TBD</div>; // Placeholder removed
// const AboutPage = () => <div>About Page - Content TBD</div>; // Placeholder removed
// const NotFoundPage = () => <div>404 - Page Not Found</div>; // Placeholder removed

function App() {
  const location = useLocation(); // Get current location

  return (
    <>
      <Navbar />
      <main>
        {/* AnimatePresence is used to enable exit animations */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <HomePage />
                </AnimatedPage>
              }
            />
            <Route
              path="/blog"
              element={
                <AnimatedPage>
                  <BlogPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/blog/:postId"
              element={
                <AnimatedPage>
                  <BlogPostPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/reviews"
              element={
                <AnimatedPage>
                  <ReviewsPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/reviews/:reviewId"
              element={
                <AnimatedPage>
                  <ReviewDetailPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/about"
              element={
                <AnimatedPage>
                  <AboutPage />
                </AnimatedPage>
              }
            />
            <Route
              path="*"
              element={
                <AnimatedPage>
                  <NotFoundPage />
                </AnimatedPage>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
