import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
}

export default function ProgressBar({
  progress,
  color = Colors.accentPurple,
  height = 6,
}: ProgressBarProps) {
  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(100, Math.max(0, progress * 100))}%`,
            backgroundColor: color,
            height,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: Colors.border,
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});
