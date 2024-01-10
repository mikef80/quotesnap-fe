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
      <Text style={styles.header}>Qoutes</Text>
      <ScrollView>
        <Text style={styles.items_header}>Quote text</Text>
        <Text style={styles.items}>{text}</Text>
        <Text style={styles.items_header}>Author:</Text>
        <Text style={styles.items}>{author}</Text>
        <Text style={styles.items_header}>Origin:</Text>
        <Text style={styles.items}>{origin}</Text>
        <Text style={styles.items_header}>Is private?</Text>
        <Text style={styles.items}>
          Visibility: {isPrivate ? "Private" : "Public"}
        </Text>
        <Text style={styles.items_header}>Category</Text>
        <Text style={styles.items}>{category}</Text>
        <Text style={styles.items_header}>User</Text>
        <Text style={styles.items}>{user}</Text>
      </ScrollView>
    </View>
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
});
