import axios from "axios";

export const createOrder = (orderData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Or use cookies if applicable
            },
        };

        // Debugging: Log the headers being sent
        console.log("API Request Headers:", config.headers);
        console.log("Order Data to be sent:", orderData);

        const { data } = await axios.post(
            "http://localhost:3000/api/v1/order/new",
            orderData,
            config
        );

        dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
    } catch (error) {
        console.error("Order API error:", error.response?.data || error.message);
        dispatch({ type: "CREATE_ORDER_FAIL", payload: error.message });
    }
};
