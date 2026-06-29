import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
});

export const fetchProducts = async () => {
    try {
        const response = await API.get("/products/all");
        return response.data.data;
    } catch (err) {
        throw err;
    }
};

export const putelemtincart = async (data, getToken) => {
    try {
        const token = await getToken();

        const items = data.map((item) => ({
            product: item._id,
            quantity: item.quantity,
        }));

        const totalPrice = data.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const response = await API.patch(
            "/cart/additems",
            { items, totalPrice },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data;
    } catch (err) {
        throw err;
    }
};

export const userHistory = async (getToken) => {
    try {
        const token = await getToken();

        const response = await API.get("/order/history", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (err) {
        throw err;
    }
};

export const search = async ({ query, selectedCategory, sortOrder }) => {
    try {
        const response = await API.get("/products/search", {
            params: {
                category: selectedCategory,
                sortOrder: sortOrder || null,
                query: query || null,
            },
        });

        return response.data.data;
    } catch (err) {
        throw err;
    }
};

export const bookById = async (id, getToken) => {
    try {
        const token = await getToken();

        const { data } = await API.get(`/products/getproduct/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data.data;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

export const addreview = async (comment, rating, id, getToken) => {
    try {
        const token = await getToken();

        const response = await API.post(
            `/review/${id}`,
            { comment, rating },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

export const getReviews = async (id) => {
    try {
        const { data } = await API.get(`/review/getreview/${id}`);
        return data.data;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};