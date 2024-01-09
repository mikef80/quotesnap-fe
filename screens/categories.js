import { StyleSheet, TouchableOpacity, View, Text, Button, Dimensions } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { getCategories, getQoutesByUsername, postCategory } from "../api/api";

import { useUserContext } from "../Contexts/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Login from "./login";
// import Modal from "react-native-modal";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function Categories() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [categories, setCategories] = useState("");
  const [quotes, setQuotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();

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
  }, [user, isFocused]);

  // const handleNewCategoryPress = async () => {
  //   setModalVisible(true);
  //   const newCategory = "Powerful";
  //   await postCategory(newCategory);
  // };

  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };

  if (!user) {
    return (
      <View>
        <Login />
      </View>
    );
  }

  if (isLoading) {
    if (isLoading) {
      return <LoadingSpinner />;
    }
  }

  function handleCategoryPick(cat) {
    if (cat === "All") {
      navigation.navigate("Homepage", { quotes: quotes });
    } else {
      navigation.navigate("Homepage", {
        quotes: quotes.filter((quote) => quote.quoteCategory === cat),
      });
    }
  }

  return (
    <View style={styles.categoriesContainer}>
      {/* {modalVisible ? (
        <View style={{}}>
          <Button title="Show modal" onPress={toggleModal} />

          <Modal
            isVisible={modalVisible}
            style={{ backgroundColor: "gray", borderRadius: 20, marginTop: 250, marginBottom: 250 }}
          >
            <View style={{ flex: 1, padding: 20 }}>
              <Text>Hello!</Text>

              <View style={{ flexDirection: "row", position: "relative", bottom: 0 }}>
                <Button style={{ margin: 200 }} title="Hide modal" onPress={toggleModal} />
                <Button style={{ margin: 20 }} title="Hide modal" onPress={toggleModal} />
              </View>
            </View>
          </Modal>
        </View>
      ) : null} */}
      {/* <View style={styles.selectList}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />
      </View> */}
      {/* <TouchableOpacity onPress={handleNewCategoryPress} style={{ position: "absolute", top: 0, right: 0 }}>
        <Text>+ New Category</Text>
      </TouchableOpacity> */}

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
