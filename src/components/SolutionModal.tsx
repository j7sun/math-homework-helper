import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import type { MathSolution } from "../services/claudeService";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Props {
  visible: boolean;
  imageUri: string | null;
  loading: boolean;
  solution: MathSolution | null;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
}

export default function SolutionModal({
  visible,
  imageUri,
  loading,
  solution,
  error,
  onClose,
  onRetry,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Solution</Text>
          <View style={styles.closeBtn} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image thumbnail */}
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.thumbnail}
              resizeMode="contain"
            />
          )}

          {/* Loading state */}
          {loading && (
            <View style={styles.loadingWrap}>
              <View style={styles.loadingCard}>
                <ActivityIndicator size="large" color={Colors.accentPurple} />
                <Text style={styles.loadingTitle}>Analyzing your problem…</Text>
                <Text style={styles.loadingSubtitle}>
                  Claude is reading the image and working through the solution
                </Text>
              </View>
            </View>
          )}

          {/* Error state */}
          {!loading && error && (
            <View style={styles.errorCard}>
              <Ionicons name="alert-circle" size={36} color={Colors.error} />
              <Text style={styles.errorTitle}>Something went wrong</Text>
              <Text style={styles.errorMessage}>{error}</Text>
              <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
                <Ionicons name="refresh" size={16} color="#fff" />
                <Text style={styles.retryBtnText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Solution */}
          {!loading && solution && (
            <>
              {/* Answer box */}
              <View style={styles.answerCard}>
                <View style={styles.answerHeader}>
                  <View style={styles.answerIconWrap}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={Colors.accentGreen}
                    />
                  </View>
                  <Text style={styles.answerLabel}>Answer</Text>
                </View>
                <Text style={styles.answerText}>{solution.answer}</Text>
              </View>

              {/* Step-by-step breakdown */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons
                    name="list-outline"
                    size={18}
                    color={Colors.accentPurple}
                  />
                  <Text style={styles.sectionTitle}>Solution Breakdown</Text>
                </View>
                <View style={styles.sectionCard}>
                  <Text style={styles.bodyText}>{solution.breakdown}</Text>
                </View>
              </View>

              {/* Concepts used */}
              {solution.concepts.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Ionicons
                      name="book-outline"
                      size={18}
                      color={Colors.accentBlue}
                    />
                    <Text style={[styles.sectionTitle, { color: Colors.accentBlue }]}>
                      Concepts Used
                    </Text>
                  </View>
                  <View style={styles.sectionCard}>
                    <Text style={styles.bodyText}>{solution.concepts}</Text>
                  </View>
                </View>
              )}

              {/* Powered-by tag */}
              <View style={styles.poweredBy}>
                <Ionicons
                  name="sparkles"
                  size={13}
                  color={Colors.textMuted}
                />
                <Text style={styles.poweredByText}>
                  Solved by Claude Opus (Anthropic)
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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

  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 48 },

  // Thumbnail
  thumbnail: {
    width: "100%",
    height: Math.min(SCREEN_WIDTH - 40, 280),
    borderRadius: 16,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  // Loading
  loadingWrap: { alignItems: "center", paddingVertical: 32 },
  loadingCard: {
    alignItems: "center",
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 32,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  loadingTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 8,
  },
  loadingSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },

  // Error
  errorCard: {
    alignItems: "center",
    backgroundColor: Colors.error + "10",
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.error + "30",
    gap: 10,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  errorMessage: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.accentPurple,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 6,
  },
  retryBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // Answer box
  answerCard: {
    backgroundColor: Colors.accentGreen + "12",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.accentGreen + "30",
    marginBottom: 20,
  },
  answerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  answerIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.accentGreen + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.accentGreen,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  answerText: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    lineHeight: 26,
  },

  // Sections
  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.accentPurple,
  },
  sectionCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },

  // Powered by
  poweredBy: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 8,
  },
  poweredByText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
