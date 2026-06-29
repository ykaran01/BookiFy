import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
});

export const placeorder = async (shippingAddress, phoneNumber, getToken) => {
    try {
        const token = await getToken();

        const response = await API.post(
            "/order/place",
            {
                shippingAddress,
                phoneNumber,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const order = response.data.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            handler: async (response) => {
                console.log(response);
                await verifyPayment(response, getToken);
            },
        };

        if (!window.Razorpay) {
            throw new Error(
                "Razorpay SDK failed to load. Check your index.html script tag."
            );
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (err) {
        throw err;
    }
};

const verifyPayment = async (details, getToken) => {
    try {
        const token = await getToken();

        const response = await API.post("/order/verify", details, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response.data.data);
    } catch (err) {
        throw err;
    }
};