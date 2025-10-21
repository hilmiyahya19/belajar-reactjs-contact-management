import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import UserRegister from "./components/User/UserRegister.jsx";
import UserLogin from "./components/User/UserLogin.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import ContactCreate from "./components/Contact/ContactCreate.jsx";
import ContactList from "./components/Contact/ContactList.jsx";
import ContactEdit from "./components/Contact/ContactEdit.jsx";
import ContactDetail from "./components/Contact/ContactDetail.jsx";
import AddressCreate from "./components/Address/AddressCreate.jsx";
import AddressEdit from "./components/Address/AddressEdit.jsx";
import { useLocalStorage } from 'react-use';
import { Navigate } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
    const [token] = useLocalStorage("token");

    return (
    <>
    <Routes>
        {/* route "/" → cek token */}
        <Route path="/" element={ token ? (
            <Navigate to="/dashboard/contacts" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
        />

        <Route element={<Layout/>}>
            <Route path="/register" element={<UserRegister/>}/>
            <Route path="/login" element={<UserLogin/>}/>
        </Route>

        {/* Semua route dashboard dilindungi */}
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
        >
          <Route path="users">
            <Route path="profile" element={<UserProfile/>}/>
          </Route>

          <Route path="contacts">
            <Route index element={<ContactList/>}/>
            <Route path="create" element={<ContactCreate/>}/>
            <Route path=":id">
              <Route index element={<ContactDetail/>}/>
              <Route path="edit" element={<ContactEdit/>}/>
              <Route path="addresses">
                <Route path="create" element={<AddressCreate/>}/>
                <Route path=":addressId/edit" element={<AddressEdit/>}/>
              </Route>
            </Route>
          </Route>

        </Route>
    </Routes>
    </>
  )
}


