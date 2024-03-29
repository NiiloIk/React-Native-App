import { useQuery } from "@apollo/client";
import Text from "./Text";
import { FlatList, View, StyleSheet } from "react-native";
import { GET_REVIEWS } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    display: "flex",
    backgroundColor: "#eee",
  },
  rating: {
    margin: 6,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "#2b4b8b",
    height: 60,
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    flexShrink: 1,
    paddingBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review }) => {
  const getDate = () => {
    const dateList = review.createdAt.split("-");
    const year = dateList[0];
    const month = dateList[1];
    const day = dateList[2].split("T")[0];

    return `${day}.${month}.${year}`;
  };
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View style={styles.rating}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: "#2b4b8b" }}
        >
          {review.rating}
        </Text>
      </View>
      <View style={{ display: "flex", flex: 1 }}>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text color="textSecondary">{getDate()}</Text>
        <Text style={styles.textStyle}>{review.text}</Text>
      </View>
    </View>
  );
};

const Comments = ({ id }) => {
  const { data, error, loading } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id },
  });

  if (!data) return null;
  const reviews = data.repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
    />
  );
};

export default Comments;
