import React from "react";
import "./App.css";

// Components
import Router from "./routes";

// Hooks
import useAuth from "./hooks/useAuth";

function App() {
	const { isInitialized } = useAuth();

	return <div>{isInitialized ? <Router /> : null}</div>;
}

export default App;
