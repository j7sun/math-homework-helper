import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../theme/colors";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/Badge";
import SectionHeader from "../components/SectionHeader";
import PhotoPickerSheet from "../components/PhotoPickerSheet";
import PhotoPreviewModal from "../components/PhotoPreviewModal";
import SolutionModal from "../components/SolutionModal";
import { solveMathProblem, MathSolution } from "../services/claudeService";
import {
  recentProblems,
  streakData,
  progressTopics,
} from "../data/placeholder";

const difficultyColors: Record<string, string> = {
  Easy: Colors.accentGreen,
  Medium: Colors.accentOrange,
  Hard: Colors.accentPink,
};

export default function HomeScreen() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [previewBase64, setPreviewBase64] = useState<string | null>(null);
  const [previewMime, setPreviewMime] = useState<string>("image/jpeg");
  const [previewVisible, setPreviewVisible] = useState(false);

  const [solutionVisible, setSolutionVisible] = useState(false);
  const [solutionLoading, setSolutionLoading] = useState(false);
  const [solution, setSolution] = useState<MathSolution | null>(null);
  const [solutionError, setSolutionError] = useState<string | null>(null);
  const [solutionImageUri, setSolutionImageUri] = useState<string | null>(null);

  // ── Image picker helpers ──────────────────────────────────────────────────

  const requestAndLaunchCamera = async () => {
    setPickerVisible(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera access is required to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      quality: 0.85,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      setPreviewUri(result.assets[0].uri);
      setPreviewBase64(result.assets[0].base64 ?? null);
      setPreviewMime(result.assets[0].mimeType ?? "image/jpeg");
      setPreviewVisible(true);
    }
  };

  const requestAndLaunchLibrary = async () => {
    setPickerVisible(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Photo library access is required to upload a photo.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.85,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      setPreviewUri(result.assets[0].uri);
      setPreviewBase64(result.assets[0].base64 ?? null);
      setPreviewMime(result.assets[0].mimeType ?? "image/jpeg");
      setPreviewVisible(true);
    }
  };

  const handleConfirm = async (uri: string) => {
    setPreviewVisible(false);
    setSolutionImageUri(uri);
    setSolution(null);
    setSolutionError(null);
    setSolutionLoading(true);
    setSolutionVisible(true);

    try {
      if (!previewBase64) throw new Error("Image data is missing. Please try again.");
      const result = await solveMathProblem(previewBase64, previewMime);
      setSolution(result);
    } catch (err: any) {
      setSolutionError(err?.message ?? "An unexpected error occurred.");
    } finally {
      setSolutionLoading(false);
      setPreviewUri(null);
      setPreviewBase64(null);
    }
  };

  const handleRetry = async () => {
    if (!previewBase64 && !solutionImageUri) return;
    setSolution(null);
    setSolutionError(null);
    setSolutionLoading(true);
    try {
      const result = await solveMathProblem(previewBase64 ?? "", previewMime);
      setSolution(result);
    } catch (err: any) {
      setSolutionError(err?.message ?? "An unexpected error occurred.");
    } finally {
      setSolutionLoading(false);
    }
  };

  const handleRetake = () => {
    setPreviewVisible(false);
    setPreviewUri(null);
    setPreviewBase64(null);
    setPickerVisible(true);
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
    setPreviewUri(null);
    setPreviewBase64(null);
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening 👋</Text>
            <Text style={styles.name}>Alex Johnson</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Text style={styles.avatarText}>AJ</Text>
          </TouchableOpacity>
        </View>

        {/* ── Ask a Problem Banner ── */}
        <TouchableOpacity style={styles.askBanner} activeOpacity={0.85}>
          <View style={styles.askLeft}>
            <Text style={styles.askTitle}>Ask a Math Problem</Text>
            <Text style={styles.askSub}>
              Type, snap, or speak your question
            </Text>
          </View>
          <View style={styles.askIconWrap}>
            <Ionicons name="calculator" size={28} color="#ffffff" />
          </View>
        </TouchableOpacity>

        {/* ── Photo Scan Widget ── */}
        <SectionHeader title="Scan a Problem" />
        <Card style={styles.scanCard} padding={0}>
          {/* Dashed drop zone */}
          <TouchableOpacity
            style={styles.dropZone}
            onPress={() => setPickerVisible(true)}
            activeOpacity={0.75}
          >
            <View style={styles.dropZoneInner}>
              <View style={styles.cameraIconWrap}>
                <Ionicons name="camera" size={32} color={Colors.accentPurple} />
              </View>
              <Text style={styles.dropZoneTitle}>Upload or Take a Photo</Text>
              <Text style={styles.dropZoneSubtitle}>
                Snap your homework problem and get instant help
              </Text>
            </View>
          </TouchableOpacity>

          {/* Two quick-action buttons */}
          <View style={styles.scanActions}>
            <TouchableOpacity
              style={[styles.scanBtn, { borderRightWidth: 1, borderRightColor: Colors.border }]}
              onPress={requestAndLaunchCamera}
              activeOpacity={0.8}
            >
              <Ionicons name="camera-outline" size={20} color={Colors.accentPurple} />
              <Text style={styles.scanBtnText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.scanBtn}
              onPress={requestAndLaunchLibrary}
              activeOpacity={0.8}
            >
              <Ionicons name="image-outline" size={20} color={Colors.accentBlue} />
              <Text style={[styles.scanBtnText, { color: Colors.accentBlue }]}>Library</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard} padding={14}>
            <Text style={styles.statValue}>🔥 {streakData.current}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>
          <Card style={styles.statCard} padding={14}>
            <Text style={styles.statValue}>{streakData.solvedToday}</Text>
            <Text style={styles.statLabel}>Solved Today</Text>
          </Card>
          <Card style={styles.statCard} padding={14}>
            <Text style={styles.statValue}>{streakData.totalSolved}</Text>
            <Text style={styles.statLabel}>Total Solved</Text>
          </Card>
        </View>

        {/* ── Topic Progress ── */}
        <SectionHeader title="Topic Progress" actionLabel="See All" />
        <Card style={styles.progressCard} padding={16}>
          {progressTopics.map((t, i) => (
            <View
              key={t.topic}
              style={[
                styles.progressRow,
                i < progressTopics.length - 1 && styles.progressRowBorder,
              ]}
            >
              <View style={styles.progressMeta}>
                <Text style={styles.progressTopic}>{t.topic}</Text>
                <Text style={[styles.progressPct, { color: t.color }]}>
                  {Math.round(t.progress * 100)}%
                </Text>
              </View>
              <ProgressBar progress={t.progress} color={t.color} height={6} />
            </View>
          ))}
        </Card>

        {/* ── Recent Problems ── */}
        <SectionHeader
          title="Recent Problems"
          actionLabel="View All"
          onAction={() => {}}
        />
        {recentProblems.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.8}>
            <Card style={styles.problemCard} padding={14}>
              <View style={styles.problemTop}>
                <Badge label={item.topic} color={Colors.accentPurple} />
                <Badge label={item.difficulty} color={difficultyColors[item.difficulty]} />
              </View>
              <Text style={styles.problemText}>{item.problem}</Text>
              <View style={styles.problemBottom}>
                <View style={styles.answerRow}>
                  <Ionicons name="checkmark-circle" size={14} color={Colors.accentGreen} />
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
                <Text style={styles.timeText}>{item.solvedAt}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* ── Quick Actions ── */}
        <SectionHeader title="Quick Actions" />
        <View style={styles.quickRow}>
          {[
            { icon: "book-outline", label: "Learn", color: Colors.accentBlue },
            { icon: "help-circle-outline", label: "Quiz", color: Colors.accentPurple },
            { icon: "bookmark-outline", label: "Saved", color: Colors.accentOrange },
            { icon: "stats-chart-outline", label: "Progress", color: Colors.accentGreen },
          ].map((q) => (
            <TouchableOpacity key={q.label} style={styles.quickBtn} activeOpacity={0.75}>
              <View style={[styles.quickIcon, { backgroundColor: q.color + "18" }]}>
                <Ionicons name={q.icon as any} size={22} color={q.color} />
              </View>
              <Text style={styles.quickLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* ── Modals ── */}
      <PhotoPickerSheet
        visible={pickerVisible}
        onCamera={requestAndLaunchCamera}
        onLibrary={requestAndLaunchLibrary}
        onClose={() => setPickerVisible(false)}
      />
      <PhotoPreviewModal
        visible={previewVisible}
        uri={previewUri}
        onConfirm={handleConfirm}
        onRetake={handleRetake}
        onCancel={handleCancelPreview}
      />
      <SolutionModal
        visible={solutionVisible}
        imageUri={solutionImageUri}
        loading={solutionLoading}
        solution={solution}
        error={solutionError}
        onClose={() => setSolutionVisible(false)}
        onRetry={handleRetry}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingBottom: 32 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 20,
  },
  greeting: { fontSize: 14, color: Colors.textSecondary, marginBottom: 2 },
  name: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accentPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  // Ask banner
  askBanner: {
    backgroundColor: Colors.accentPurple,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: Colors.accentPurple,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  askLeft: { flex: 1 },
  askTitle: { color: "#fff", fontSize: 17, fontWeight: "800", marginBottom: 4 },
  askSub: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  askIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Scan widget
  scanCard: {
    marginBottom: 24,
    overflow: "hidden",
  },
  dropZone: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: 24,
  },
  dropZoneInner: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.accentPurple + "40",
    borderStyle: "dashed",
    borderRadius: 14,
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: Colors.accentPurple + "06",
  },
  cameraIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.accentPurple + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  dropZoneTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: "center",
  },
  dropZoneSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  scanActions: {
    flexDirection: "row",
  },
  scanBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  scanBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.accentPurple,
  },

  // Stats
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  statCard: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "800", color: Colors.textPrimary, marginBottom: 2 },
  statLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: "500" },

  // Progress
  progressCard: { marginBottom: 24 },
  progressRow: { paddingVertical: 10 },
  progressRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  progressMeta: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  progressTopic: { fontSize: 14, fontWeight: "600", color: Colors.textPrimary },
  progressPct: { fontSize: 13, fontWeight: "700" },

  // Problems
  problemCard: { marginBottom: 10 },
  problemTop: { flexDirection: "row", gap: 6, marginBottom: 8 },
  problemText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 20,
  },
  problemBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  answerRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  answerText: { fontSize: 12, color: Colors.accentGreen, fontWeight: "600" },
  timeText: { fontSize: 11, color: Colors.textMuted },

  // Quick actions
  quickRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  quickBtn: { alignItems: "center", flex: 1 },
  quickIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  quickLabel: { fontSize: 12, color: Colors.textSecondary, fontWeight: "600" },
});
