import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
});

export const addproduct = async (data, getToken) => {
    try {
        const token = await getToken();

        const response = await API.post("/products/add", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const addCategory = async (name, getToken) => {
    try {
        const token = await getToken();

        const response = await API.post(
            "/category/add",
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const deletecategory = async (name, getToken) => {
    try {
        const token = await getToken();

        const response = await API.delete(`/category/delete/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const deleteProduct = async (id, getToken) => {
    try {
        const token = await getToken();

        const response = await API.delete(`/products/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const updateProduct = async (id, data, getToken) => {
    try {
        const token = await getToken();

        const response = await API.put(`/products/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

export const getorders = async (getToken) => {
    try {
        const token = await getToken();

        const response = await API.get("/order/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const changeOrderStatus = async (orderId, status, getToken) => {
    try {
        const token = await getToken();

        const response = await API.put(
            `/order/status/${orderId}/${status}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getAllOrders = async (getToken) => {
    try {
        const token = await getToken();

        const response = await API.get("/order/rest", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const array = response.data.data;

        array.forEach((item) => {
            item.numberOfItems = item.item.reduce(
                (sum, product) => sum + product.quantity,
                0
            );
        });

        return array;
    } catch (err) {
        throw err;
    }
};

export const getTheinformation = async (getToken) => {
    try {
        const token = await getToken();

        const response = await API.get("/order/info", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};