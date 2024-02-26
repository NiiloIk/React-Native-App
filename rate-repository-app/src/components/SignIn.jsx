import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
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
  const onSubmit = (values) => {
    console.log(values);
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
