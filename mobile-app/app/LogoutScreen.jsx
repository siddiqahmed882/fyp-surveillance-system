import { useEffect } from "react";

const LogoutScreen = ({ handleLogout }) => {
	useEffect(() => {
		handleLogout();
	}, []);

	return;
};

export default LogoutScreen;
