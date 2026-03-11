import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";

interface Props {
  visible: boolean;
  onCamera: () => void;
  onLibrary: () => void;
  onClose: () => void;
}

export default function PhotoPickerSheet({
  visible,
  onCamera,
  onLibrary,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        <Text style={styles.title}>Scan a Math Problem</Text>
        <Text style={styles.subtitle}>
          Upload or photograph your problem and we'll help you solve it.
        </Text>

        {/* Camera Option */}
        <TouchableOpacity style={styles.option} onPress={onCamera} activeOpacity={0.8}>
          <View style={[styles.optionIcon, { backgroundColor: Colors.accentPurple + "18" }]}>
            <Ionicons name="camera" size={26} color={Colors.accentPurple} />
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Take a Photo</Text>
            <Text style={styles.optionDesc}>Use your camera to capture the problem</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Library Option */}
        <TouchableOpacity style={styles.option} onPress={onLibrary} activeOpacity={0.8}>
          <View style={[styles.optionIcon, { backgroundColor: Colors.accentBlue + "18" }]}>
            <Ionicons name="image" size={26} color={Colors.accentBlue} />
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Upload from Library</Text>
            <Text style={styles.optionDesc}>Choose an existing photo from your device</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: Colors.bgPrimary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 18,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: { flex: 1 },
  optionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  optionDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  cancelBtn: {
    marginTop: 6,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
});
