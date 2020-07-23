import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "%ccc",
    width: "80%",
    marginBottom: 10
  },
  btnText: {
    color: "dark",
    fontSize: 20
  },

  userRow: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  chatView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5
  },
  messageText: {
    color: "#fff",
    padding: 7,
    fontSize: 16
  },

  messageTime: {
    color: "#eee",
    padding: 3,
    fontSize: 12
  }
});

export default styles;
