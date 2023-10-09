import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import ManageScreen from "./screens/ManageScreen";
import IconButton from "./components/UI/IconButton";
import { colors } from "./constant/style";
import Classes from "./screens/Classes";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function StudentScreen() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.primary30 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: colors.primary30 },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: colors.primary10,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Classes"
        component={Classes}
        options={{
          title: "Classes",
          tabBarLabel: "Classes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StudentScreen"
          screenOptions={{
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ManageScreen"
            component={ManageScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="StudentScreen"
            component={StudentScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
