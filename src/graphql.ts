import axios from "axios";

// let API_URI = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql";

export const gql = ([content]) => content;

export async function fetchGraphQL(query, variables?, buildQuery = false) {
  let apiResponse;
  if (buildQuery) {
    apiResponse = await axios.post(process.env.API_URL!, { query, variables });
  } else {
    apiResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL!, { query, variables });
  }
  return apiResponse.data.data;
}
