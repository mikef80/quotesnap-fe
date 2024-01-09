import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function QuoteItem({ route }) {
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
  return (
    <View style={styles.itemContainer}>
      <ScrollView>
        <Text style={styles.items}>Quote Item </Text>
        <Text style={styles.items}>Quote text: {text}</Text>
        <Text style={styles.items}>Author: {author}</Text>
        <Text style={styles.items}>Origin: {origin}</Text>
        <Text style={styles.items}>
          Visibility: {isPrivate ? "Private" : "Public"}
        </Text>
        <Text style={styles.items}>Category: {category}</Text>
        <Text style={styles.items}>User: {user}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 15,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
  },
  items: {
    fontSize: 16,
    margin: 5,
  },
});
