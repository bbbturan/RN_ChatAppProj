import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import User from "../User";
import firebase from "firebase";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  UNSAFE_componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyBuWBlU3gi4P5cx_LbLgTIHwXnSgonTQuc",
      authDomain: "chatapp-9dda5.firebaseapp.com",
      databaseURL: "https://chatapp-9dda5.firebaseio.com",
      projectId: "chatapp-9dda5",
      storageBucket: "chatapp-9dda5.appspot.com",
      messagingSenderId: "353323498770",
      appId: "1:353323498770:web:f1f5450286fe83806e07cb",
      measurementId: "G-F6LKZCKJR8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getITem("userPhone");
    this.props.navigation.navigate(User.phone ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
