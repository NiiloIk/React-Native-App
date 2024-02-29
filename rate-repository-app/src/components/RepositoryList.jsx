import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import MenuComponent from "./MenuComponent";
import { useState } from "react";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    display: "flex",
    backgroundColor: "#eee",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
  setSearchText,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View style={{ zIndex: 999 }}>
          <TextInput
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search for a repository..."
          ></TextInput>
          <MenuComponent
            setOrderBy={setOrderBy}
            setOrderDirection={setOrderDirection}
          />
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { repositories } = useRepositories(
    orderBy,
    orderDirection,
    searchKeyword
  );

  const onEndReach = () => {
    console.log("You have reached the end of the list");
  };

  return (
    <>
      {repositories && (
        <RepositoryListContainer
          repositories={repositories}
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
          setSearchText={setSearchKeyword}
          onEndReach={onEndReach}
        />
      )}
    </>
  );
};

export default RepositoryList;
