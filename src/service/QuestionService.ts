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