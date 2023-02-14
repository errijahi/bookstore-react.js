import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ThemeContext } from "./context/themeContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Single from "./pages/Single";
import { useContext } from "react";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";

const Layout = ( ) => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}> 
      <Scrollbars style={{ width: '100%', height: '100vh' }} autoHide >
      <Navbar/>
      <Outlet/>
      </Scrollbars>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/book/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
     <RouterProvider router={router} />
     </div>
    </div>
  );
}

export default App;
