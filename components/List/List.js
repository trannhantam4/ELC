import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Item from "./Item";
export default function List({ students }) {
  function renderItem(itemData) {
    return <Item {...itemData.item} />;
  }
  return (
    <FlatList
      style={styles.scrollview}
      data={students}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    ></FlatList>
  );
}
const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    height: "100%",
  },
});
