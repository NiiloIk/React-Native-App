import { View, StyleSheet, Image, Pressable } from "react-native";
import Comments from "./Comments";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1071a7",
    padding: 5,
    borderRadius: 8,
    flexGrow: 0,
  },
  text: {
    color: "white",
  },
  button: {
    padding: 10,
    margin: 6,
    backgroundColor: "#2b4b8b",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  textStyle: {
    flexShrink: 1,
    paddingBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tinyImage: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  tinyFlexContent: {
    display: "flex",
    alignItems: "center",
  },
});

const TinyFlexContent = ({ content, text }) => {
  return (
    <View style={styles.tinyFlexContent}>
      <Text fontWeight="bold">{content}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const LanguageBox = ({ content }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View style={styles.container}>
        <Text style={styles.text}>{content}</Text>
      </View>
      <View style={{ flexGrow: 1 }}></View>
    </View>
  );
};

const SingleRepositoryElement = ({ url }) => {
  const onPressEvent = () => {
    console.log(url);
    Linking.openURL(url);
  };
  return (
    <Pressable onPress={onPressEvent} style={styles.button}>
      <Text style={styles.text}>Open in GitHub</Text>
    </Pressable>
  );
};

const RepositoryItem = ({ item, singleRepositoryView = false }) => {
  const navigate = useNavigate();
  const getImageUrl = () => {
    return item.ownerAvatarUrl;
  };

  const formatNum = (num) => {
    if (num > 1000) {
      const newNum = Math.round(num / 100);
      const start = Math.floor(newNum / 10);
      const remainder = newNum % 10;
      const end = remainder !== 0 ? `.${remainder}` : "";
      return `${start}${end}k`;
    }
    return num.toString();
  };

  const onPressEvent = async () => {
    navigate(`/${item.id}`);
  };

  return (
    <View>
      <Pressable onPress={onPressEvent}>
        <View testID="repositoryItem">
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View>
              <Image
                style={styles.tinyImage}
                source={{
                  uri: getImageUrl(),
                }}
              />
            </View>
            <View style={{ display: "flex", flex: 1 }}>
              <Text
                fontWeight="bold"
                fontSize="subheading"
                style={styles.textStyle}
              >
                {item.fullName}
              </Text>

              <Text color="textSecondary" style={styles.textStyle}>
                {item.description}
              </Text>
              <LanguageBox content={item.language} />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TinyFlexContent
              content={formatNum(item.stargazersCount)}
              text="stars"
            />
            <TinyFlexContent
              content={formatNum(item.forksCount)}
              text="forks"
            />
            <TinyFlexContent
              content={formatNum(item.reviewCount)}
              text="reviews"
            />
            <TinyFlexContent content={item.ratingAverage} text="rating" />
          </View>
        </View>
      </Pressable>
      {singleRepositoryView && (
        <>
          <SingleRepositoryElement url={item.url} />
          <Comments id={item.id} />
        </>
      )}
    </View>
  );
};

export default RepositoryItem;
