import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from "../constants/styles";
import User from "../User";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

export default class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", null)
    };
  };

  //getting user info after navigation
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam("name"),
        phone: props.navigation.getParam("phone")
      },
      textMessage: "",
      messageList: []
    };
  }

  //Use unsafe_.. because componentEillMount not provided by latest versions of RN.
  UNSAFE_componentWillMount() {
    firebase
      .database()
      .ref("messages")
      .child(User.phone)
      .child(this.state.person.phone)
      .on("child_added", value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });
  }

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  // Used to show time as HH:SS
  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? "0" : "") + d.getHours(+":");
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + " " + d.getMonth() + " " + result;
    }
    return result;
  };

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      // Added sending message to db and return its id as 'msgId'
      let msgId = firebase
        .database()
        .ref("messages")
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;

      let updates = {};
      //create message object with informations
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone
      };

      //Saved changes in messaging to database with from-to info under 'messages'
      //updates is an object that containing the updated fields:
      updates[
        "messages/" + User.phone + "/" + this.state.person.phone + "/" + msgId
      ] = message;
      updates[
        "messages/" + this.state.person.phone + "/" + User.phone + "/" + msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ textMessage: "" });
    }
  };

  renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "60",
          alignSelf: item.from === User.phone ? "flex-end" : "flex-start",
          backgroundColor: item.from === User.phone ? "#00897b" : "#7cb342",
          borderRadius: 5,
          marginBottom: 10
        }}
      >
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageTime}>{this.convertTime(item.time)}</Text>
      </View>
    );
  };
  // Used FlatList to list each messages
  render() {
    //Used to rearrange chat area according to the window sizes.
    let { height, width } = Dimensions.get("window");
    return (
      <SafeAreaView>
        <FlatList
          style={{ padding: 10, height: height * 0.8 }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />

        <View sytle={styles.chatView}>
          <TextInput
            style={styles.input}
            value={this.state.textMessage}
            placeholder="Type message..."
            onChangeText={this.handleChange("textMessage")}
          />

          <TouchableOpacity
            onPress={this.sendMessage}
            style={{ padding: 10, marginLeft: 7 }}
          >
            <Text style={styles.btnText}> Send </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
