import api from "./api";

export const getPurchases = async ({
    page = 0,
    size = 10,
    sort = [],
    category,
    brand,
    search,
} = {}) => {
    const params = new URLSearchParams({ page: String(page), size: String(size) });

    if (category) params.append("category", category);
    if (brand) params.append("brand", brand);
    if (search) params.append("search", search);

    const sortValues = Array.isArray(sort) ? sort : [sort];
    sortValues.filter(Boolean).forEach((value) => params.append("sort", value));

    const response = await api.get("/purchases", {
        params
    });

    return response.data;
};

export const createPurchase = async (purchase) => {

    const response = await api.post(
        "/purchases",
        purchase
    );

    return response.data;
};

export const updatePurchase = async (id, purchase) => {

    const response = await api.put(
        `/purchases/${id}`,
        purchase
    );

    return response.data;
};

export const deletePurchase = async (id) => {

    await api.delete(`/purchases/${id}`);

};

export const getPurchaseById = async (id) => {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
};
