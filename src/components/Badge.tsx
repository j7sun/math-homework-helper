import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
}

export default function Badge({
  label,
  color = "#7c3aed",
  textColor = "#ffffff",
}: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color + "22" }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
