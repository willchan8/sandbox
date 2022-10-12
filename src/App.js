import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import logo from "./logo.svg";
import "./App.scss";

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>{!data ? "Loading..." : data}</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="locations" element={<Locations />} />
				</Routes>
			</header>
		</div>
	);
}

function Home() {
	return (
		<>
			<main>
				<h2>Welcome to the homepage!</h2>
			</main>
			<nav>
				<Link to="/locations">Locations</Link>
			</nav>
		</>
	);
}

const GET_LOCATIONS = gql`
	query GetLocations {
		locations {
			id
			name
			description
			photo
		}
	}
`;

function Locations() {
	const { loading, error, data } = useQuery(GET_LOCATIONS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<main>
				<h2>Locations Page</h2>
				<nav>
					<Link to="/">Home</Link>
				</nav>
				{data.locations.map(({ id, name, description, photo }) => (
					<div key={id}>
						<h3>{name}</h3>
						<img
							width="400"
							height="250"
							alt="location-reference"
							src={`${photo}`}
						/>
						<br />
						<b>About this location:</b>
						<p>{description}</p>
						<br />
					</div>
				))}
			</main>
		</>
	);
}

export default App;
