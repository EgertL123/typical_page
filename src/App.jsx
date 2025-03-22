import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

import AuthContext from "./store/auth-context";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const storedUser = localStorage.getItem('isLoggedUser');
		return storedUser ? JSON.parse(storedUser).isLogged : false;
	});

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedUser');
		if (storedUserLoggedInInformation) {
			setIsLoggedIn(JSON.parse(storedUserLoggedInInformation).isLogged);
		}
	}, []);

	const loginHandler = (user, password) => {
		localStorage.setItem('isLoggedUser', JSON.stringify({ isLogged: true, user, password }));
		setIsLoggedIn(true);

		console.log('Login');
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedUser');
		setIsLoggedIn(false);

		console.log('Logout');
	};

	return (
		<AuthContext.Provider value={
      { 
        loggedIn: isLoggedIn,
        onLogout: logoutHandler
      }
        }>
			<MainHeader onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home />}
			</main>
		</AuthContext.Provider>
	);
}

export default App;