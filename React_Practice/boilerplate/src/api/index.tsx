// src/api/axios.ts
import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com',
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  headers: {
    'Content-Type': 'application/json',
  },
});
