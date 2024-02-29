import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation signIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      createdAt
      repositoryId
      rating
      text
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;
export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
