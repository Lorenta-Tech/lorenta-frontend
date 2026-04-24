import { RouterProvider, Outlet } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home.tsx';
import Upload from './pages/Upload.tsx';
import Cart from './pages/Cart.tsx';
import History from './pages/History.tsx';
import Checkout from './pages/Checkout.tsx';
import Order from './pages/Order.tsx';
import Login from './pages/Login.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from './pages/Logout.tsx';
import Footer from './components/Footer.tsx';


function App() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <div className="px-5 py-4">
            <Outlet />
          </div>
          <Footer/>
        </>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },

        // Protected group
        {
          element: <ProtectedRoute />,
          children: [
            { path: "upload", element: <Upload /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <Checkout /> },
            { path: "history", element: <History /> },
            { path: "order/:id", element: <Order /> },
            { path: "logout", element: <Logout/>}
          ],
        },
      ],
    },
  ]);

  return (
    <div className="min-h-100">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App