import { RouterProvider, Outlet } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage.tsx';
import Upload from './pages/Upload.tsx';
import Jobs from './pages/Jobs.tsx';
import Cart from './pages/Cart.tsx';
import History from './pages/History.tsx';
import Checkout from './pages/Checkout.tsx';
import Order from './pages/Order.tsx';
import Login from './pages/Login.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Logout from './pages/Logout.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { AlertProvider } from './contexts/AlertContext.tsx';
import AlertContainer from './components/AlertContainer.tsx';
import DepartmentLayout from './layouts/DepartmentLayout.tsx';
import DeptLogin from './pages/department/DeptLogin.tsx';
import SemesterPage from './pages/department/Semester.tsx';
import ModulePage from './pages/department/Module.tsx';
import SubjectPage from './pages/department/Subject.tsx';
import DepartmentProtectedRoute from './components/DepartmentProtectedRoute.tsx';


function App() {

  const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AlertProvider>
        <CartProvider>
          <Navbar />
          <AlertContainer />
          <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 py-8 md:px-6 md:py-10">
            <Outlet />
          </main>
        </CartProvider>
      </AlertProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
        ],
      },

      { path: "logout", element: <Logout /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "upload", element: <Upload /> },
          { path: "jobs", element: <Jobs /> },
          { path: "cart", element: <Cart /> },
          { path: "checkout", element: <Checkout /> },
          { path: "history", element: <History /> },
          { path: "order", element: <Order /> },
        ],
      },
    ],
  },

  {
    path: "/department",
    element: <DepartmentLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "login",
        element: <DeptLogin />,
      },

      {
        element: <DepartmentProtectedRoute />,
        children: [
          {
            path: "semesters",
            element: <SemesterPage />,
          },
          {
            path: "semester/:semesterId/subjects",
            element: <SubjectPage />,
          },
          {
            path: "subject/:subjectId/modules",
            element: <ModulePage />,
          },
        ],
      },
    ],
  },
]);

  return (
    <div className="flex min-h-screen flex-col">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
