import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import Constants from "expo-constants";

import { GET_USER } from "../graphql/queries";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import { useEffect, useState } from "react";

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

const SignOutElement = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onPressFunction = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <Pressable onPress={onPressFunction}>
      <Text style={styles.containerItems}>Sign Out</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const [user, setUser] = useState(null);
  const { data, loading, error } = useQuery(GET_USER);

  useEffect(() => {
    if (data) setUser(data.me);
  }, [data]);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} horizontal>
        <NameElement />
        {!user && <SignInElement />}
        {user && <SignOutElement />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
