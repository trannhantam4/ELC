import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
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
import "expo-dev-client";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Login from "./screens/Login";
import { firebase } from "@react-native-firebase/auth";
import Info from "./screens/Info";
import StudentsContextProvider from "./store/student-context";
const firebaseConfig = {
  apiKey: "AIzaSyDrTya50T9W5mIHm0jlcOhDRDNyZQJBrk0",
  authDomain: "elcapp-66f08.firebaseapp.com",
  databaseURL:
    "https://elcapp-66f08-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elcapp-66f08",
  storageBucket: "elcapp-66f08.appspot.com",
  messagingSenderId: "28472300188",
  appId: "1:28472300188:web:05fabb72f3031567495359",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function StudentScreen() {
  const user = firebase.auth().currentUser;
  async function onSignOutPress() {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.primary30 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: colors.primary30 },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: colors.primary10,
        headerRight: ({ tintColor }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Info");
            }}
          >
            <Image
              style={{ width: 30, height: 30, margin: 24 }}
              source={{ uri: user.photoURL }}
            />
          </TouchableOpacity>
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="power"
            size={24}
            color={tintColor}
            onPress={onSignOutPress}
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
  GoogleSignin.configure({
    webClientId:
      "28472300188-e9fcbpk46vojrj1j1flgd04mq6unplk2.apps.googleusercontent.com",
  });
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential

    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (!user) {
    return (
      <Login>
        <GoogleSigninButton onPress={onGoogleButtonPress}></GoogleSigninButton>
      </Login>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <StudentsContextProvider>
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
            <Stack.Screen
              name="Info"
              component={Info}
              options={{ presentation: "modal", headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StudentsContextProvider>
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
