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

export default function Homepage() {
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Personal" },
    { key: "2", value: "Work" },
    { key: "3", value: "Holiday" },
  ];

  const quotes = [
    { id: 1, quote: "test1" },
    { id: 2, quote: "test1" },
    { id: 3, quote: "test1" },
  ];

  return (
    <View style={styles.homepageContainer}>
      <TextInput placeholder="Search quotes" />

      <View style={styles.selectList}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />
      </View>

      <SafeAreaView>
        <FlatList
          data={quotes}
          renderItem={({ item }) => {
            return (
              <View style={styles.items}>
                <Text style={styles.listText}>{item.quote}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  homepageContainer: { padding: 40 },
  items: {
    margin: 5,
  },
  listText: {
    fontSize: 15,
  },
  selectList: {
    marginBottom: 20,
  },
});
