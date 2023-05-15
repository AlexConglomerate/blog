import httpService from "./http.service";

const uploadEndpoint = '/upload';

const uploadService = {
    upload: async (formData) => {
        try {
            const {data} = await httpService.post(uploadEndpoint, formData);
            return data
        } catch (error) {
            console.error(error);
        }
    }
};

export default uploadService;