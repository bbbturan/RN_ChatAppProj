import React from "react";
import {
  SafeAreaView,
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from "react-native";
import User from "../User";
import styles from "../constants/styles";
import firebase from "firebase";

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Chats"
  };

  state = {
    users: []
  };

  //Use unsafe_.. because componentEillMount not provided by latest versions of RN.
  UNSAFE_componentWillMount() {
    //create user list withouth authenticated user
    let dbRef = firebase.database().ref("users");
    dbRef.on("child_added", val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person]
          };
        });
      }
    });
  }

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Char", item)}
        style={styles.userRow}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
        />
      </SafeAreaView>
    );
  }
}
