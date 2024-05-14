import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">

			<div className="auto">
				<Link to="/demo">
					<button className="btn btn-secondary m-2">Create a New Contact</button>
				</Link>
			</div>
		</nav>
	);
};
