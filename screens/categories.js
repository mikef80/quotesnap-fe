import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { getCategories } from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState("");

  // const categories = [
  //   {
  //     categoryId: 1,
  //     categoryName: "Book",
  //     categoryDescription: "A collection of pages that can tell a story",
  //   },
  //   {
  //     categoryId: 2,
  //     categoryName: "Speech",
  //     categoryDescription: "A vocalisation of a story",
  //   },
  //   {
  //     categoryId: 3,
  //     categoryName: "Billboard",
  //     categoryDescription:
  //       "A sign that can be seen outside, usually used for marketing purposes",
  //   },
  // ];
  useEffect(() => {
    retrieveCategories();
  }, []);

  const retrieveCategories = async () => {
    const categoriesReceived = await getCategories();
    setCategories(categoriesReceived);
  };

  // const data = [
  //   { key: "1", value: categories[0].categoryName },
  //   { key: "2", value: categories[1].categoryName },
  //   { key: "3", value: categories[2].categoryName },
  // ];

  return (
    <View style={styles.categoriesContainer}>
      {/* <View style={styles.selectList}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />
      </View> */}
      <Text style={styles.header}>Categories</Text>

      <FlatList
        data={categories}
        renderItem={({ item }) => {
          return (
            <ScrollView style={styles.items}>
              <TouchableOpacity>
                <Text style={styles.listText} key={item.categoryId}>
                  {item.categoryName}: {item.categoryDescription}
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
