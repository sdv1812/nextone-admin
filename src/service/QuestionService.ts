import axios from "axios";
import { IQuestion } from "interfaces";
import { getProperties } from "util/properties";

export const saveQuestion = async (question: IQuestion): Promise<IQuestion> => {
    const properties = getProperties();
    const url = `${properties.backend_url}/questions`;
    const response = await axios.post(url, question);
    return response.data;
}

export const getQuestions = async (): Promise<IQuestion[]> => {
    const properties = getProperties();
    const url = `${properties.backend_url}/questions`;
    const response = await axios.get(url);
    return response.data;
}

export const uploadQuestionImages = async (images: File[]): Promise<string[]> => {
    const properties = getProperties();
    const url = `${properties.backend_url}/questions/media/upload?type=question`;
    const formData = new FormData();
    images.forEach((image) => {
        formData.append("files", image);
    });
    const response = await axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("Uploaded question images:", response.data);
    return response.data?.urls ?? [];
}

export const uploadExplanationImages = async (images: File[]): Promise<string[]> => {
    const properties = getProperties();
    const url = `${properties.backend_url}/questions/media/upload?type=explanation`;
    const formData = new FormData();
    images.forEach((image) => {
        formData.append("files", image);
    });
    const response = await axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data?.urls ?? [];
}

export const deleteQuestion = async (id: string): Promise<void> => {
    const properties = getProperties();
    const url = `${properties.backend_url}/questions/${id}`;
    await axios.delete(url);
}

export const updateQuestion = async (question: IQuestion): Promise<IQuestion> => {
    const properties = getProperties();
    const url = `${properties.backend_url}/questions/${question.id}`;
    const response = await axios.put(url, question);
    return response.data;
}

export const getQuestionById = async (id: string): Promise<IQuestion> => {
    const properties = getProperties();
    const url = `${properties.backend_url}/questions/${id}`;
    const response = await axios.get(url);
    return response.data;
}