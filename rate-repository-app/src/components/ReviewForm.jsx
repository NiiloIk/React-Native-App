import { View, Pressable } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .min(0, "Value must be greater than or equal to 0")
    .max(100, "Value must be less than or equal to 100")
    .required("Password is required"),
  text: yup.string(),
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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewElement = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ query: GET_REPOSITORY }],
  });

  const onSubmit = async (values) => {
    console.log(values);

    try {
      await createReview({
        variables: {
          review: { ...values, rating: Number(values.rating) },
        },
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          ownerName: "",
          repositoryName: "",
          rating: "",
          text: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};

export default ReviewElement;
