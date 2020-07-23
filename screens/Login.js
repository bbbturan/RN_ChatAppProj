import React from "react";
import {
  Text,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";
import User from "../User";
import styles from "../constants/styles";
import firebase from "firebase";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    phone: "",
    name: ""
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  submitForm = async () => {
    // save user to database if valid
    if (this.state.phone.length < 10) {
      Alert.alert("error", "wrong phone number");
    } else {
      await AsyncStorage.setItem("userPhone", this.state.phone);
      User.phone = this.state.phone;
      firebase
        .database()
        .ref("users/" + User.phone)
        .set({ name: this.state.name });
      this.props.navigation.navigate("App");
    }
  };

  render() {
    return (
      // create login form with phone and name informations
      <View style={styles.container}>
        <TextInput>
          placeholder= "Phone Number" keyboardType= "number-pad" style=
          {styles.input}
          value= {this.state.phone}
          onChangeText= {this.handleChange("phone")}
        </TextInput>
        <TextInput>
          placeholder= "Name" style= {styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange("name")}
        </TextInput>
        <TouchableOpacity onPress={this.submitForm}>
          <Text styles={styles.btnText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
