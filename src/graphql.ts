import axios from "axios";

// const API_URI = process.env.API_URI || 'http://localhost:3001/api/graphql';
const API_URI = process.env.API_URL || "http://localhost:3000/api/graphql";

export const gql = ([content]) => content;

export async function fetchGraphQL(query, variables?) {
  const apiResponse = await axios.post(API_URI, { query, variables });
  return apiResponse.data.data;
}
