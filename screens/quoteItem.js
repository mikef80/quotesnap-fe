import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect } from "react";
import Homepage from "./Homepage";
import { deleteQuoteById } from "../api/api";

export default function QuoteItem({ route }) {
  const navigation = useNavigation();

  const {
    id,
    text,
    author,
    origin,
    location,
    image,
    isPrivate,
    category,
    user,
  } = route.params;

  const handlePressDelete = () => {
    console.log(id);
    deleteQuoteById(id);
    navigation.navigate("Homepage", { refresh: true });
  };

  return (
    <ScrollView style={styles.itemContainer}>
      <Text style={styles.header}>Quotes</Text>
      <View>
        <Text style={styles.items_header}>Quote text:</Text>
        <Text style={styles.items}>{text}</Text>
        <Text style={styles.items_header}>Author:</Text>
        <Text style={styles.items}>{author}</Text>
        <Text style={styles.items_header}>Origin:</Text>
        <Text style={styles.items}>{origin}</Text>
        <Text style={styles.items_header}>Visibility:</Text>
        <Text style={styles.items}>
          {isPrivate ? "Private" : "Public"}
        </Text>
        <Text style={styles.items_header}>Category:</Text>
        <Text style={styles.items}>{category}</Text>
        <Text style={styles.items_header}>User:</Text>
        <Text style={styles.items}>{user}</Text>
      </View>

      <View style={styles.deleteButton}>
        <TouchableOpacity onPress={handlePressDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 40,
  },
  header: {
    fontSize: 30,
    color: "black",
  },
  items_header: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "600",
  },
  items: {
    fontSize: 15,
    padding: 5,
    textAlign: "justify",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  deleteButton: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteText: {
    backgroundColor: "#e03131",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    borderColor: "#e03131",
    color: "#f8f9fa",
    fontWeight: "bold",
  },
});
