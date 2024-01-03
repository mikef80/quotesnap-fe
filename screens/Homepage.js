import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Navigation from "../components/Navigation";

export default function Homepage() {
  const [selected, setSelected] = useState("");
  const [props, setProps] = useState({});

  const navigation = useNavigation();
  const updateProps = (newProps) => {
    setProps(newProps);
  };

  const data = [
    { key: "1", value: "Personal" },
    { key: "2", value: "Work" },
    { key: "3", value: "Holiday" },
  ];

  const quotes = [
    {
      quoteId: 1,
      quoteText: "a random quote",
      quoteAuthor: "a quote author",
      quoteOrigin: "fiction book",
      quoteLocation: "[10,10]",
      quoteImage: "apicturelink.jpg",
      quoteIsPrivate: Math.random() > 0.5 ? true : false,
      quoteCategory: "Book",
      quoteUser: "Hello",
    },
    {
      quoteId: 2,
      quoteText: "a random quotequotequotequote",
      quoteAuthor: "a quote author",
      quoteOrigin: "fiction book",
      quoteLocation: "[10,10]",
      quoteImage: "apicturelink.jpg",
      quoteIsPrivate: Math.random() > 0.5 ? true : false,
      quoteCategory: "Book",
      quoteUser: "Hello",
    },
    // {
    //   quoteId: 3,
    //   quoteText: "a quotequotequotequote  sdadas random quote",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Book",
    //   quoteUser: "Hello",
    // },
    // {
    //   quoteId: 4,
    //   quoteText:
    //     "Amet irure anim eu cillum dolore ullamco Lorem quis nisi aliquip proident consectetur cillum officia.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Billboard",
    //   quoteUser: "HeAworldllo",
    // },
    // {
    //   quoteId: 5,
    //   quoteText: "Lorem ex do ad esse fugiat do.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Book",
    //   quoteUser: "HeAworldllo",
    // },
    // {
    //   quoteId: 6,
    //   quoteText: "Ullamco deserunt cillum mollit commodo.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Book",
    //   quoteUser: "Aworld",
    // },
    // {
    //   quoteId: 7,
    //   quoteText:
    //     "Laborum eu esse ea laboris sit exercitation cupidatat velit reprehenderit et deserunt ullamco ipsum dolor.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Book",
    //   quoteUser: "Aworld",
    // },
    // {
    //   quoteId: 8,
    //   quoteText:
    //     "Consectetur eu nisi officia laboris do id dolore officia non consectetur.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Speech",
    //   quoteUser: "ASDvv",
    // },
    // {
    //   quoteId: 9,
    //   quoteText:
    //     "Ut aute quis aliquip fugiat Lorem excepteur esse ex sint minim.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Speech",
    //   quoteUser: "DSADSA",
    // },
    // {
    //   quoteId: 10,
    //   quoteText: "Amet labore laborum aliqua id do et.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Book",
    //   quoteUser: "ASKJHD",
    // },
    // {
    //   quoteId: 11,
    //   quoteText:
    //     "Cillum enim laborum sint nostrud enim labore duis labore non.",
    //   quoteAuthor: "a quote author",
    //   quoteOrigin: "fiction book",
    //   quoteLocation: "[10,10]",
    //   quoteImage: "apicturelink.jpg",
    //   quoteIsPrivate: Math.random() > 0.5 ? true : false,
    //   quoteCategory: "Book",
    //   quoteUser: "ASKJHD",
    // },
  ];

  const handleQuoteItem = (
    quoteId,
    quoteText,
    quoteAuthor,
    quoteOrigin,
    quoteLocation,
    quoteImage,
    quoteIsPrivate,
    quoteCategory,
    quoteUser
  ) => {
    navigation.navigate("QuoteItem", {
      id: quoteId,
      text: quoteText,
      author: quoteAuthor,
      origin: quoteOrigin,
      location: quoteLocation,
      image: quoteImage,
      isPrivate: quoteIsPrivate,
      category: quoteCategory,
      user: quoteUser,
    });
  };

  return (
    <View style={styles.homepageContainer}>
      <TextInput style={styles.searchQuotes} placeholder="Search quotes.." />

      <View style={styles.selectList}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />
      </View>

      <FlatList
        data={quotes}
        renderItem={({ item }) => {
          return (
            <View style={styles.items}>
              <TouchableOpacity
                onPress={handleQuoteItem.bind(
                  this,
                  item.quoteId,
                  item.quoteText,
                  item.quoteAuthor,
                  item.quoteOrigin,
                  item.quoteLocation,
                  item.quoteImage,
                  item.quoteIsPrivatesPrivate,
                  item.quoteCategory,
                  item.quoteUser
                )}
              >
                <Text style={styles.listText}>{item.quoteText}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />

      <View>
        <Navigation style={styles.naviagtionContainer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homepageContainer: { flex: 1 },
  searchQuotes: {
    marginBottom: 20,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    margin: 40,
  },
  items: {
    margin: 15,
    marginHorizontal: 40,
  },
  listText: {
    fontSize: 15,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  selectList: {
    marginBottom: 20,
    marginHorizontal: 40,
  },
  naviagtionContainer: {},
});
