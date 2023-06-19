import "./App.css";
import LoginPage from "./components/loginPage";
import RegistrationPage from "./components/registrationPage";
import UsersPage from "./components/usersPage";
import { Route, Routes } from "react-router-dom";

function App() {
     
    return (
        <div className="App">
            <Routes>
                <Route index element={<UsersPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
