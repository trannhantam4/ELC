import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import React from "react";
import getDateFormat from "../../ulti/Date";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import { colors } from "../../constant/style";
export default function Item({
  id,
  DoB,
  classes,
  date,
  lastModifiedBy,
  name,
  parentEmail,
}) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("ManageScreen", { studentId: id });
  }
  return (
    <TouchableOpacity onPress={pressHandler} activeOpacity={0.7}>
      <View style={styles.item}>
        <View
          style={{
            width: "100%",
          }}
        >
          <Text style={[styles.textBase, styles.des]} adjustsFontSizeToFit>
            Name: {name}
          </Text>
          <Text style={styles.textBase} adjustsFontSizeToFit>
            Date of Birth: {DoB}
          </Text>
          <Text style={styles.textBase} adjustsFontSizeToFit>
            Class: {classes}
          </Text>

          <Text style={styles.textBase} adjustsFontSizeToFit>
            Email: {parentEmail}
          </Text>
          <Text style={styles.textBase} adjustsFontSizeToFit>
            Added by: {lastModifiedBy}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    padding: 16,
    margin: 8,
    backgroundColor: colors.primary60,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 24,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
  },
  textBase: {
    paddingLeft: 6,
    color: "white",
  },
  des: { fontSize: 16, marginBottom: 4, fontWeight: "bold" },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: width * 0.3,
    elevation: 7,
  },
  price: {
    color: colors.primary60,
    fontWeight: "bold",
    fontSize: 17,
  },
});
