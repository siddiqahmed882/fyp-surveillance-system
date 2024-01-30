import axios from "axios";
import { useState, useEffect } from "react";
import { getData, storeData } from "../utils";

const useFetch = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const options = {
		method: "GET",
		url: "https://jsonplaceholder.typicode.com/users",
	};

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await axios.request(options);
			setData(response.data);
			setIsLoading(false);
			setError("");
		} catch (error) {
			setError(error);
			alert("There is an error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const refetch = async () => {
		await fetchData();
	};

	return { data, isLoading, error, refetch };
};

export default useFetch;
