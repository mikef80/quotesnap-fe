
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";

import { SelectList } from "react-native-dropdown-select-list";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useUserContext } from "../Contexts/UserContext";
import Login from "./login";
import { getQoutesByUsername } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Homepage({ route }) {
  const [selected, setSelected] = useState("");
  const [props, setProps] = useState({});
  const { user } = useUserContext();
  const [quotes, setQuotes] = useState(route.params?.quotes);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!route.params?.quotes) {
      if (isFocused) {
        setIsLoading(true);
        getQoutesByUsername(user.username).then((quotes) => {
          setQuotes(quotes);
          setIsLoading(false);
        });
      }
    } else {
      setQuotes(route.params?.quotes);
      setIsLoading(false);
    }
  }, [isFocused]);

  const navigation = useNavigation();
  const updateProps = (newProps) => {
    setProps(newProps);
  };


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

  if (!user) {
    return (
      <View>
        <Login />
      </View>
    );
  }

  return (
    <View style={styles.homepageContainer}>
      <Text style={styles.header}>Quotes</Text>

      {isLoading && (
        <View>
          <LoadingSpinner />
        </View>
      )}

      {quotes?.length ? (
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
                  )}>
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
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    margin: 30,
  },
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
    padding: 10,
    backgroundColor: "#5DB075",
    color: "white",
    textAlign: "justify",
    borderRadius: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 5,
  },
  selectList: {
    marginBottom: 20,
    marginHorizontal: 40,
  },
  naviagtionContainer: {},
});
