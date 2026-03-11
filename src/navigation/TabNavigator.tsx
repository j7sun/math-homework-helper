import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import LearnScreen from "../screens/LearnScreen";
import QuizScreen from "../screens/QuizScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

type TabIconName = React.ComponentProps<typeof Ionicons>["name"];

const TABS: {
  name: string;
  label: string;
  active: TabIconName;
  inactive: TabIconName;
}[] = [
  { name: "Home",     label: "Home",     active: "home",         inactive: "home-outline" },
  { name: "Saved",    label: "Saved",    active: "bookmark",     inactive: "bookmark-outline" },
  { name: "Learn",    label: "Learn",    active: "book",         inactive: "book-outline" },
  { name: "Quiz",     label: "Quiz",     active: "help-circle",  inactive: "help-circle-outline" },
  { name: "Settings", label: "Settings", active: "settings",     inactive: "settings-outline" },
];

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab, index) => {
        const focused = state.index === index;
        const color = focused ? Colors.tabActive : Colors.tabInactive;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <View style={focused ? styles.activeIconWrap : styles.iconWrap}>
              <Ionicons
                name={focused ? tab.active : tab.inactive}
                size={22}
                color={color}
              />
            </View>
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"     component={HomeScreen} />
      <Tab.Screen name="Saved"    component={SavedScreen} />
      <Tab.Screen name="Learn"    component={LearnScreen} />
      <Tab.Screen name="Quiz"     component={QuizScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.tabBg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 12,
  },
  iconWrap: {
    marginBottom: 3,
  },
  activeIconWrap: {
    backgroundColor: Colors.accentPurple + "18",
    borderRadius: 10,
    padding: 4,
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
});
