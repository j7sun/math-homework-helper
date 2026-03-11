import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { quizCategories, recentQuizResults } from "../data/placeholder";

const difficultyColors: Record<string, string> = {
  Easy: Colors.accentGreen,
  Medium: Colors.accentOrange,
  Hard: Colors.accentPink,
};

export default function QuizScreen() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filtered =
    selectedDifficulty === "All"
      ? quizCategories
      : quizCategories.filter((q) => q.difficulty === selectedDifficulty);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>Quiz</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="trophy-outline" size={20} color={Colors.accentOrange} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Stats Banner ── */}
        <Card style={styles.statsBanner} padding={16}>
          <Text style={styles.statsTitle}>Your Quiz Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>24</Text>
              <Text style={styles.statLbl}>Quizzes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: Colors.accentGreen }]}>78%</Text>
              <Text style={styles.statLbl}>Avg Score</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: Colors.accentOrange }]}>🏆 3</Text>
              <Text style={styles.statLbl}>Perfect</Text>
            </View>
          </View>
        </Card>

        {/* ── Daily Challenge ── */}
        <TouchableOpacity activeOpacity={0.85}>
          <View style={styles.dailyCard}>
            <View style={styles.dailyLeft}>
              <View style={styles.dailyBadge}>
                <Text style={styles.dailyBadgeText}>Daily Challenge</Text>
              </View>
              <Text style={styles.dailyTitle}>Mixed Topics Sprint</Text>
              <Text style={styles.dailyDesc}>20 questions · Refreshes in 6h 14m</Text>
            </View>
            <View style={styles.dailyRight}>
              <Text style={styles.dailyIcon}>🎯</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ── Difficulty Filter ── */}
        <View style={styles.filterRow}>
          {difficulties.map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => setSelectedDifficulty(d)}
              style={[
                styles.filterChip,
                selectedDifficulty === d && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedDifficulty === d && styles.filterTextActive,
                ]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Quiz Categories ── */}
        <Text style={styles.sectionLabel}>Choose a Quiz</Text>
        {filtered.map((quiz) => (
          <TouchableOpacity key={quiz.id} activeOpacity={0.8}>
            <Card style={styles.quizCard} padding={16}>
              <View style={styles.quizRow}>
                <View
                  style={[
                    styles.quizIconWrap,
                    { backgroundColor: quiz.color + "20" },
                  ]}
                >
                  <Text style={[styles.quizEmoji, { color: quiz.color }]}>
                    {quiz.icon}
                  </Text>
                </View>
                <View style={styles.quizInfo}>
                  <View style={styles.quizTitleRow}>
                    <Text style={styles.quizTitle}>{quiz.title}</Text>
                    <Badge
                      label={quiz.difficulty}
                      color={difficultyColors[quiz.difficulty]}
                    />
                  </View>
                  <Text style={styles.quizSubtitle}>{quiz.subtitle}</Text>
                  <Text style={styles.quizDesc}>{quiz.description}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.startBtn, { backgroundColor: quiz.color }]}
                activeOpacity={0.8}
              >
                <Text style={styles.startBtnText}>Start Quiz</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </Card>
          </TouchableOpacity>
        ))}

        {/* ── Recent Results ── */}
        <Text style={styles.sectionLabel}>Recent Results</Text>
        {recentQuizResults.map((r, i) => {
          const pct = Math.round((r.score / r.total) * 100);
          const color =
            pct >= 80
              ? Colors.accentGreen
              : pct >= 60
              ? Colors.accentOrange
              : Colors.error;
          return (
            <Card key={i} style={styles.resultCard} padding={14}>
              <View style={styles.resultRow}>
                <View>
                  <Text style={styles.resultTopic}>{r.topic}</Text>
                  <Text style={styles.resultDate}>{r.date}</Text>
                </View>
                <View style={styles.resultRight}>
                  <Text style={[styles.resultScore, { color }]}>
                    {r.score}/{r.total}
                  </Text>
                  <Text style={[styles.resultPct, { color }]}>{pct}%</Text>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "800", color: Colors.textPrimary },
  headerRight: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  statsBanner: {
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  statsRow: { flexDirection: "row", alignItems: "center" },
  statItem: { flex: 1, alignItems: "center" },
  statNum: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statLbl: { fontSize: 11, color: Colors.textSecondary },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },

  dailyCard: {
    backgroundColor: Colors.accentBlue,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: Colors.accentBlue,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  dailyLeft: { flex: 1 },
  dailyBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  dailyBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  dailyTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  dailyDesc: { color: "rgba(255,255,255,0.75)", fontSize: 12 },
  dailyRight: { paddingLeft: 12 },
  dailyIcon: { fontSize: 40 },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.accentPurple,
    borderColor: Colors.accentPurple,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  filterTextActive: { color: "#ffffff" },

  sectionLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
  },

  quizCard: { marginBottom: 10 },
  quizRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  quizIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quizEmoji: { fontSize: 22, fontWeight: "700" },
  quizInfo: { flex: 1 },
  quizTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 3,
    flexWrap: "wrap",
  },
  quizTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  quizSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  quizDesc: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 12,
    paddingVertical: 11,
  },
  startBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  resultCard: { marginBottom: 8 },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultTopic: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  resultDate: { fontSize: 12, color: Colors.textSecondary },
  resultRight: { alignItems: "flex-end" },
  resultScore: { fontSize: 18, fontWeight: "800" },
  resultPct: { fontSize: 12, fontWeight: "600" },
});
