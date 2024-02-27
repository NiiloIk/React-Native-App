import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query fetchRepositories {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          name
          ratingAverage
          reviewCount
          stargazersCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query fetchUser {
    me {
      id
      username
    }
  }
`;
