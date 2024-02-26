import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";

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

const TinyFlexContent = ({ content }) => {
  return (
    <View style={styles.tinyFlexContent}>
      <Text fontWeight="bold">{content}</Text>
      <Text color="textSecondary">Stars</Text>
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

const RepositoryItem = ({ item }) => {
  const getImageUrl = () => {
    return item.ownerAvatarUrl;
  };

  const formatNum = (num) => {
    if (num > 1000) {
      const newNum = Math.round(num / 100).toString();
      const start = newNum.slice(0, 2);
      const end = newNum.slice(2);
      return `${start},${end}k`;
    }
    return num;
  };

  return (
    <>
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
        <TinyFlexContent content={formatNum(item.stargazersCount)} />
        <TinyFlexContent content={formatNum(item.forksCount)} />
        <TinyFlexContent content={formatNum(item.reviewCount)} />
        <TinyFlexContent content={item.ratingAverage} />
      </View>
    </>
  );
};

export default RepositoryItem;
