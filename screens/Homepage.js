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
import QuoteItem from "./quoteItem";

export default function Homepage({ route }) {
  const [selected, setSelected] = useState("");
  const [props, setProps] = useState({});

  const navigation = useNavigation();
  const updateProps = (newProps) => {
    setProps(newProps);
  };

  const quotes = route.params.quotes;

  const data = [
    { key: "1", value: "Personal" },
    { key: "2", value: "Work" },
    { key: "3", value: "Holiday" },
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

      {quotes.length ? (
        <FlatList
          data={quotes}
          renderItem={({ item }) => {
            return (
              <View style={styles.items}>
                <TouchableOpacity
                  onPress={handleQuoteItem.bind(
                    this,
                    item._id,
                    item.quoteText,
                    item.quoteAuthor,
                    item.quoteOrigin,
                    item.quoteLocation,
                    item.quoteImage,
                    item.quoteIsPrivate,
                    item.quoteCategory,
                    item.quoteUser
                  )}
                >
                  <Text style={styles.listText} key={item.quoteId}>
                    {item.quoteText}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <View>
          <Text>No Quotes Found.</Text>
        </View>
      )}
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
