import { useRoutes, Navigate } from 'react-router-dom';

// Components
import MuiDrawer from '../layouts/DashboardSidebar';
import FileCards from '../components/FileCards';

// Dashbaord layout
import DashboardLayout from '../layouts';

export default function Router() {
    return useRoutes([
      {
        path: 'auth',
        children: [
          // {
          //   path: 'login',
          //   element: (
          //     <GuestGuard>
          //       <Login />
          //     </GuestGuard>
          //   )
          // },
            // {
            //   path: 'register',
            //   element: (
            //   <GuestGuard>
            //       <Register />
            //   </GuestGuard>
            //   )
            // },
            // {
            //   path: 'logout',
            //   element: <Logout/>
            // },
          ]
        },
    
        // Dashboard Routes
        {
          path: 'dashboard',
          element: (
           // <AuthGuard>
              <DashboardLayout />
            //</AuthGuard>
          ),
          children: [
            // { path: '/dashboard', element: <RidesList /> },
            { path: 'test', element: <FileCards /> },
            // { path: 'profile', element: <UserDetails /> },
            // { path: 'rides/:rideId', element: <RideDetails /> },
            // { path: 'rides/edit/:rideId', element: <AddRoute mainText='Modifica tu ruta' secondaryText='Modifica los siguientes datos para actualizar tu ruta' /> },
            // { path: 'rides/addRoute', element: <AddRoute mainText='Agrega una nueva ruta' secondaryText='Ingresa los siguientes datos para crear tu nueva ruta' /> },
          ] 
        },
        { path: '/', element: <Navigate to="/auth/login" replace /> }
      ])
    }