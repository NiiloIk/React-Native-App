import { GET_USER } from "../graphql/queries";
import Text from "./Text";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet, Alert, Button } from "react-native";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

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
  button: {
    padding: 4,
    margin: 2,
    backgroundColor: "#2b4b8b",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  redButton: {
    padding: 4,
    margin: 2,
    backgroundColor: "#d73a4a",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review, refetch }) => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const navigate = useNavigate();
  const getDate = () => {
    const dateList = review.createdAt.split("-");
    const year = dateList[0];
    const month = dateList[1];
    const day = dateList[2].split("T")[0];

    return `${day}.${month}.${year}`;
  };

  const createAlert = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteReview({ variables: { deleteReviewId: review.id } });
              refetch();
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

  const viewRepositoryEvent = () => {
    navigate(`/${review.repositoryId}`);
  };

  return (
    <View>
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
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary">{getDate()}</Text>
          <Text style={styles.textStyle}>{review.text}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          title="View repository"
          onPress={viewRepositoryEvent}
          style={styles.button}
          color="#2b4b8b"
        ></Button>
        <Button
          title="Delete review"
          onPress={createAlert}
          color="#d73a4a"
          style={styles.redButton}
        ></Button>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { withReviews: true },
  });

  useEffect(() => {
    if (data) {
      const reviews = data.me.reviews.edges.map((edge) => edge.node);
      setReviews(reviews);
    }
  }, [data]);

  return (
    <>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem review={item} refetch={refetch} />
        )}
      />
    </>
  );
};

export default MyReviews;
