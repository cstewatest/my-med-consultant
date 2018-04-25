import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  prompt: {
    fontFamily: "open-sans-bold",
    paddingBottom: 10,
    color: "#ffffff",
    fontSize: 20
  },
  whiteSpace: {
    height: 35
  },
  container: {
    padding: 20
  },
  buttonText: {
    alignSelf: "center",
    fontFamily: "open-sans-bold"
  },
  button: {
    marginTop: 12,
    height: 40,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderRadius: 4,
    alignSelf: "center",
    width: 80,
    borderWidth: 0.5,
    justifyContent: "center"
  }
}));
