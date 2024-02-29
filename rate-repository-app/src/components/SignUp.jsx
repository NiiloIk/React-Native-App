import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

import { useNavigate } from "react-router-native";
import { View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "username must be longer than 5 characters")
    .max(30, "username must be shorter than 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be longer than 5 characters")
    .max(50, "Password must be shorter than 60 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
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
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="password confirmation"
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirmation } = values;
    try {
      if (password === passwordConfirmation) {
        await signUp({
          variables: {
            user: { username, password },
          },
        });
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "", passwordConfirmation: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};

export default SignUp;
