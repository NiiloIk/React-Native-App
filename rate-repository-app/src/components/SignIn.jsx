import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
import Text from "./Text";

import { useNavigate } from "react-router-native";
import { View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be longer than 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must be longer than 4 characters")
    .required("Password is required"),
});

const styles = {
  button: {
    padding: 10,
    margin: 6,
    backgroundColor: "#2b4b8b",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ display: "flex" }}>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput
        name="password"
        placeholder="password"
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      const token = data.authenticate.accessToken;
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};

export default SignIn;
