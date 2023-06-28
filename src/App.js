import "./App.css";
import Publicrouting from "./components/publicRouting";
import LoginPage from "./components/loginPage";
import PrivateRouting from "./components/privateRouting";
import RegistrationPage from "./components/registrationPage";
import UsersPage from "./components/usersPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    index
                    element={
                        <PrivateRouting>
                            <UsersPage />
                        </PrivateRouting>
                    }
                />
                <Route
                    path="registration"
                    element={
                        <Publicrouting>
                            <RegistrationPage />
                        </Publicrouting>
                    }
                />
                <Route
                    path="login"
                    element={
                        <Publicrouting>
                            <LoginPage />
                        </Publicrouting>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
