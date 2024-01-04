import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";

export default function Categories() {
  const categories = [
    {
      categoryId: 1,
      categoryName: "Book",
      categoryDescription: "A collection of pages that can tell a story",
    },
    {
      categoryId: 2,
      categoryName: "Speech",
      categoryDescription: "A vocalisation of a story",
    },
    {
      categoryId: 3,
      categoryName: "Billboard",
      categoryDescription: "A sign that can be seen outside, usually used for marketing purposes",
    },
  ];

  const data = [
    { key: "1", value: categories[0].categoryName },
    { key: "2", value: categories[1].categoryName },
    { key: "3", value: categories[2].categoryName },
  ];

  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.selectList}>
        <SelectList setSelected={(val) => setSelected(val)} data={data} save="value" />
      </View>

      <FlatList
        data={categories}
        renderItem={({ item }) => {
          return (
            <View style={styles.items}>
              <TouchableOpacity>
                <Text style={styles.listText} key={item.categoryId}>
                  {item.categoryName}: {item.categoryDescription}
                </Text>
              </TouchableOpacity>
            </View>
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
  items: {
    margin: 15,
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
  },
});
