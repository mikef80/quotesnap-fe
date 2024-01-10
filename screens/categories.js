import { StyleSheet, TouchableOpacity, View, Text, Button, Dimensions, Keyboard } from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { getCategories, getQoutesByUsername, postCategory, postNewQuote } from "../api/api";

import { useUserContext } from "../Contexts/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Login from "./login";
import Modal from "react-native-modal";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function Categories() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [categories, setCategories] = useState("");
  const [quotes, setQuotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [refresh, setRefresh] = useState(false);

  const addCategory = async () => {
    const ghostQuote = {
      quoteText: "ghost",
      quoteAuthor: "ghost",
      quoteOrigin: "ghost",
      quoteLocation: "ghost",
      quoteImage: "ghost",
      quoteIsPrivate: true,
      quoteCategory: newCategory,
      quoteUser: user.username,
    };

    await postNewQuote(ghostQuote);
    setModalVisible(!modalVisible);
    setNewCategory("");
    setRefresh(!refresh);
  };

  const handleTextChange = (input) => {
    setNewCategory(input);
    console.log(newCategory);
  };

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      if (user) {
        getQoutesByUsername(user.username).then((quotes) => {
          setCategories(["All", ...new Set(quotes.map((quote) => quote.quoteCategory))]);
          setQuotes(quotes);
          setIsLoading(false);
        });
      }
    }
  }, [user, isFocused, refresh]);

  const handleNewCategoryPress = async () => {
    setModalVisible(true);
    const newCategory = "Powerful";
    await postCategory(newCategory);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setNewCategory("");
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // if (!user) {
  //   return (
  //     <View>
  //       <Login />
  //     </View>
  //   );
  // }

  // if (isLoading) {
  //   if (isLoading) {
  //     return <LoadingSpinner />;
  //   }
  // }

  function handleCategoryPick(cat) {
    const filteredQuotes = quotes.filter((quote) => quote.quoteOrigin !== "ghost");
    if (cat === "All") {
      navigation.navigate("Homepage", { quotes: filteredQuotes });
    } else {
      navigation.navigate("Homepage", {
        quotes: filteredQuotes.filter((quote) => quote.quoteCategory === cat),
      });
    }
  }

  return (
    <View style={styles.categoriesContainer}>
      {modalVisible ? (
        <View>

          <Modal
            isVisible={modalVisible}
            style={{
              backgroundColor: "#5A5A5A",
              borderRadius: 20,
              marginTop: 200,
              marginBottom: isKeyboardVisible ? 120 : 400,
            }}
          >
            <View style={{ flex: 1, padding: 20 }}>
              <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>New Category </Text>
              <Text style={{ textAlign: "center", color: "white", marginBottom: 20 }}>
                Enter a name for this category.{" "}
              </Text>
              <TextInput
                value={newCategory}
                onChangeText={handleTextChange}
                style={{ borderWidth: 1, backgroundColor: "black", color: "white" }}
                placeholder="Title"
                // autoCorrect={true}
              ></TextInput>
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  bottom: 0,
                  marginTop: 20,
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{ height: 70, width: 180, borderRadius: 10, alignItems: "center", justifyContent: "center" }}
                  onPress={toggleModal}
                >
                  <Text style={{ fontSize: 40, color: "#5DB075" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ height: 70, width: 180, borderRadius: 10, alignItems: "center", justifyContent: "center" }}
                  onPress={addCategory}
                >
                  <Text style={{ fontSize: 40, color: "#5DB075" }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
      {/* <View style={styles.selectList}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />
      </View> */}
      <TouchableOpacity
        onPress={handleNewCategoryPress}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#5DB075",
          height: 40,
          width: 150,
          marginRight: 15,
          marginTop: 10,
          borderRadius: 5,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: 1.5, height: 1.5 },
            textShadowRadius: 5,
          }}
        >
          + New Category
        </Text>
      </TouchableOpacity>

      <Text style={styles.header}>Categories</Text>

      <FlatList
        data={categories}
        renderItem={({ item }) => {
          return (
            <ScrollView style={styles.items}>
              <TouchableOpacity
                onPress={() => {
                  handleCategoryPick(item);
                }}
              >
                <Text style={styles.listText} key={item}>
                  {item}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: { padding: 40 },
  searchQuotes: {
    marginBottom: 20,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 30,
    marginTop: 30,
  },
  items: {
    margin: 15,
  },
  listText: {
    fontSize: 15,
    padding: 8,
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
  },
});
