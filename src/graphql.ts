import axios from "axios";

// const API_URI = process.env.API_URL || "http://localhost:3000/api/graphql";

export const gql = ([content]) => content;

export async function fetchGraphQL(query, variables?, buildQuery = false) {
  // console.log("bq", buildQuery);
  // const apiResponse = await axios.post(API_URI, { query, variables });
  let apiResponse;
  if (buildQuery) {
    console.log("Fetching GraphQL with buildQuery enabled:", process.env.API_URL);
    apiResponse = await axios.post(process.env.API_URL!, { query, variables });
  } else {
    apiResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL!, { query, variables });
  }

  return apiResponse.data.data;
}
