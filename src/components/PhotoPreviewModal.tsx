import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PREVIEW_SIZE = Math.min(SCREEN_WIDTH - 48, 380);

interface Props {
  visible: boolean;
  uri: string | null;
  onConfirm: (uri: string) => void;
  onRetake: () => void;
  onCancel: () => void;
}

export default function PhotoPreviewModal({
  visible,
  uri,
  onConfirm,
  onRetake,
  onCancel,
}: Props) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (uri) setLoading(true);
  }, [uri]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onCancel} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Preview</Text>
            <View style={styles.closeBtn} />
          </View>

          {/* Image Preview */}
          <View style={[styles.imageWrap, { width: PREVIEW_SIZE, height: PREVIEW_SIZE }]}>
            {uri ? (
              <>
                {loading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator color={Colors.accentPurple} size="large" />
                  </View>
                )}
                <Image
                  source={{ uri }}
                  style={styles.image}
                  resizeMode="contain"
                  onLoadEnd={() => setLoading(false)}
                />
              </>
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="image-outline" size={48} color={Colors.textMuted} />
              </View>
            )}
          </View>

          {/* Info */}
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.accentPurple} />
            <Text style={styles.infoText}>
              Make sure the problem is clearly visible and well-lit
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.retakeBtn} onPress={onRetake} activeOpacity={0.8}>
              <Ionicons name="refresh" size={18} color={Colors.textSecondary} />
              <Text style={styles.retakeBtnText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => uri && onConfirm(uri)}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={styles.confirmBtnText}>Use This Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: Colors.bgPrimary,
    borderRadius: 24,
    width: "100%",
    maxWidth: 440,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // Image
  imageWrap: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgCard,
    zIndex: 1,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  // Info
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },

  // Actions
  actions: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  retakeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retakeBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  confirmBtn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: Colors.accentPurple,
    shadowColor: Colors.accentPurple,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
});
