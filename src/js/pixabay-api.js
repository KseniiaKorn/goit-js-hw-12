import axios from 'axios';

const API_KEY = '47286025-dcd3f7c6d98bacb5edade47ee';
const BASE_URL = 'https://pixabay.com/api/';

export default async function createHttpRequest(options) {
  try {
    const response = await axios.get(BASE_URL, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}