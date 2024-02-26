import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  default: {
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    margin: 6,
    borderRadius: 4,
    borderColor: "#777",
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.default, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
