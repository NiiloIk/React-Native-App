import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";

const SingleRepositoryPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (!data) return null;

  return <RepositoryItem item={data.repository} singleRepositoryView={true} />;
};

export default SingleRepositoryPage;
