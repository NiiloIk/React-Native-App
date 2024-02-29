import { gql } from "@apollo/client";

import { REPOSITORY_BASE_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query fetchRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...repositoryBaseFields
        }
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query fetchRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...repositoryBaseFields
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REVIEWS = gql`
  query fetchReviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      fullName
      description
      id
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              username
              id
            }
          }
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query fetchUser($withReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $withReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
            }
            repositoryId
          }
        }
      }
    }
  }
`;
