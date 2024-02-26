import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#1b212d",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  containerItems: {
    padding: 10,
    paddingBottom: 20,
    color: "#eee",
    fontSize: 18,
  },
  header: {
    padding: 10,
    paddingBottom: 20,
    color: "#eee",
    fontWeight: "700",
    fontSize: 18,
  },
});

const NameElement = () => {
  const onPressFunction = () => {
    console.log("haloo");
  };
  return (
    <Pressable onPress={onPressFunction}>
      <Link to="/">
        <Text style={styles.header}>Repositories</Text>
      </Link>
    </Pressable>
  );
};

const SignInElement = () => {
  return (
    <Link to="/register">
      <Text style={styles.containerItems}>Sign in</Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} horizontal>
        <NameElement />
        <SignInElement />
      </ScrollView>
    </View>
  );
};

export default AppBar;
