import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as Linking from "expo-linking";

screenWidth = Dimensions.get("window").width;

let customFonts = {
  "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
  "Rubik-BlackItalic": require("../assets/fonts/Rubik-BlackItalic.ttf"),
  "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  "Rubik-BoldItalic": require("../assets/fonts/Rubik-BoldItalic.ttf"),
  "Rubik-Italic": require("../assets/fonts/Rubik-Italic.ttf"),
  "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
  "Rubik-LightItalic": require("../assets/fonts/Rubik-LightItalic.ttf"),
  "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
  "Rubik-MediumItalic": require("../assets/fonts/Rubik-MediumItalic.ttf"),
  "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
  "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  "Rubik-SemiBoldItalic": require("../assets/fonts/Rubik-SemiBoldItalic.ttf"),
};

export default class PopularArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLoaded: false,
      fontLoaded: false,
    };
  }

  async _loadFonts() {
    await Font.loadAsync(customFonts);
    this.setState({ fontLoaded: true });
  }
  componentDidMount() {
    this.getData();
    this._loadFonts();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getData = () => {
    const url = "http://65d3-175-110-219-73.ngrok.io/popular-articles";
    axios
      .get(url)
      .then(async (response) => {
        this.setState({ data: response.data.data });
        await this.setState({ dataLoaded: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    function toTitleCase(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }
    return (
      <View style={styles.cardContainer}>
        <Text
          style={{
            fontFamily: "Rubik-SemiBold",
            textAlign: "center",
            fontSize: RFValue(17),
            paddingHorizontal: RFValue(5),
            marginTop: RFValue(6),
          }}
          numberOfLines={2}
        >
          {`${toTitleCase(item.title)}`}
        </Text>
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            marginTop: RFValue(10),
            paddingHorizontal: RFValue(10),
          }}
          numberOfLines={3}
        >
          {`Description:- ${toTitleCase(item.text)}`}
        </Text>
        <View
          style={{
            width: "80%",
            height: 1,
            backgroundColor: "gray",
            marginTop: RFValue(5),
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#262636",
            width: RFValue(140),
            height: RFValue(40),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: RFValue(20),
            marginTop: RFValue(10),
            opacity: 0.9,
            alignSelf: "flex-end",
          }}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={{ fontFamily: "Rubik-Regular", color: "#fff" }}>
            Link To The Article
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { data } = this.state;
    const { fontLoaded } = this.state;
    const { dataLoaded } = this.state;
    if (fontLoaded && dataLoaded) {
      return (
        <View style={styles.container}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "Rubik-SemiBold",
              fontSize: RFValue(20),
            }}
          >
            Popular Articles
          </Text>
          <FlatList
            data={data}
            renderItem={this.renderItems}
            keyExtractor={this.keyExtractor}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.appLoadContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262636",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: RFValue(20),
    paddingBottom: RFValue(30),
  },
  appLoadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262636",
  },
  title: {
    color: "#000",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(10),
    fontFamily: "Rubik-Regular",
  },
  featuredTitle: {
    color: "#000",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(10),
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15),
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),

    marginTop: RFValue(30),
    marginBottom: RFValue(20),
    backgroundColor: "#fff",
    marginHorizontal: RFValue(10),
    padding: RFValue(10),
  },
});
