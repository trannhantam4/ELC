import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function List() {
  const [data, setData] = useState([]);
  function renderItem() {
    return <Item />;
  }
  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.screen}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
