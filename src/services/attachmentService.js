import api from "./api";

export const getAttachments = async (purchaseId) => {
    const response = await api.get(`/${purchaseId}/attachments`);
    return response.data;
};

export const uploadAttachment = async (purchaseId, attachmentType, file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("type", attachmentType);

    const response = await api.post(`/${purchaseId}/attachments`, form);

    return response.data;
};

export const downloadAttachment = async (purchaseId, attachmentId) => {
    const response = await api.get(`/${purchaseId}/attachments/${attachmentId}/download`, { responseType: 'blob' });
    return response.data;
};

export const deleteAttachment = async (purchaseId, attachmentId) => {
    await api.delete(`/${purchaseId}/attachments/${attachmentId}`);
};
