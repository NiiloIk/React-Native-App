import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-native";

const useRepository = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });
  const [repository, setRepository] = useState();

  useEffect(() => {
    if (data) {
      setRepository(data.repository);
    }
  }, [data]);

  return { repository, loading };
};

export default useRepository;
