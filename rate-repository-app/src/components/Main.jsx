import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SingleRepositoryPage from "./SingleRepositoryPage";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/:id" element={<SingleRepositoryPage />} />
          <Route path="review" element={<ReviewForm />} />
          <Route path="/userReviews" element={<MyReviews />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/register" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
