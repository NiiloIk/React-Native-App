import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignIn from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      render(<SignIn />);

      // render the SignInContainer component, fill the text inputs and press the submit button

      fireEvent.changeText(screen.getByPlaceholderText("username"), "test");
      fireEvent.changeText(screen.getByPlaceholderText("password"), "password");

      fireEvent.press(screen.getByText("Sign in"));
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith({
          username: "test",
          password: "password",
        });
      });
    });
  });
});
