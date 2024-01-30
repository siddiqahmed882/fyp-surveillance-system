import axios from "axios";
import { useState, useEffect } from "react";
import { getData, getURL, storeData } from "../utils";

const useNearbyFetch = (roomId) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const result = await getData(null);

			if (result != null) {
				const options = {
					method: "GET",
					url:
						roomId != null
							? `${getURL("room")}/${roomId}`
							: `${getURL("room")}/`,
					headers: {
						Authorization: `Bearer ${result.token}`,
					},
				};
				const response = await axios.request(options);
				setData(response.data.data);
				setError("");
			}
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

export default useNearbyFetch;
