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
import ProgressBar from "../components/ProgressBar";
import { learnTopics, featuredLesson } from "../data/placeholder";

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<"topics" | "lessons">("topics");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>Learn</Text>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* ── Featured Lesson ── */}
        <TouchableOpacity activeOpacity={0.85}>
          <View style={styles.featuredCard}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>⭐ Featured</Text>
            </View>
            <Text style={styles.featuredTopic}>{featuredLesson.topic}</Text>
            <Text style={styles.featuredTitle}>{featuredLesson.title}</Text>
            <Text style={styles.featuredDesc}>{featuredLesson.description}</Text>
            <View style={styles.featuredFooter}>
              <View style={styles.featuredMeta}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color="rgba(255,255,255,0.75)"
                />
                <Text style={styles.featuredMetaText}>
                  {featuredLesson.duration}
                </Text>
              </View>
              <View style={styles.startBtn}>
                <Text style={styles.startBtnText}>Start</Text>
                <Ionicons name="arrow-forward" size={14} color={Colors.accentPurple} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* ── Tab Toggle ── */}
        <View style={styles.tabToggle}>
          {(["topics", "lessons"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.toggleBtn, activeTab === t && styles.toggleBtnActive]}
              onPress={() => setActiveTab(t)}
            >
              <Text
                style={[
                  styles.toggleText,
                  activeTab === t && styles.toggleTextActive,
                ]}
              >
                {t === "topics" ? "Topics" : "All Lessons"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Topics List ── */}
        {activeTab === "topics" ? (
          learnTopics.map((topic) => {
            const pct = Math.round((topic.completed / topic.lessons) * 100);
            return (
              <TouchableOpacity key={topic.id} activeOpacity={0.8}>
                <Card style={styles.topicCard} padding={16}>
                  <View style={styles.topicRow}>
                    <View
                      style={[
                        styles.topicIconWrap,
                        { backgroundColor: topic.color + "20" },
                      ]}
                    >
                      <Text style={[styles.topicIcon, { color: topic.color }]}>
                        {topic.icon}
                      </Text>
                    </View>
                    <View style={styles.topicInfo}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      <Text style={styles.topicDesc} numberOfLines={1}>
                        {topic.description}
                      </Text>
                    </View>
                    <View style={styles.topicRight}>
                      <Text style={[styles.topicPct, { color: topic.color }]}>
                        {pct}%
                      </Text>
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={Colors.textMuted}
                      />
                    </View>
                  </View>
                  <View style={styles.topicProgress}>
                    <ProgressBar
                      progress={topic.completed / topic.lessons}
                      color={topic.color}
                      height={5}
                    />
                    <Text style={styles.topicLessons}>
                      {topic.completed}/{topic.lessons} lessons
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })
        ) : (
          // Lesson list placeholder
          <View>
            {[
              { id: "1", title: "What is Algebra?", topic: "Algebra", duration: "5 min", done: true },
              { id: "2", title: "Variables & Expressions", topic: "Algebra", duration: "6 min", done: true },
              { id: "3", title: "Solving Linear Equations", topic: "Algebra", duration: "8 min", done: false },
              { id: "4", title: "Inequalities", topic: "Algebra", duration: "7 min", done: false },
              { id: "5", title: "Points & Lines", topic: "Geometry", duration: "5 min", done: false },
              { id: "6", title: "Angles & Triangles", topic: "Geometry", duration: "9 min", done: false },
            ].map((lesson) => (
              <TouchableOpacity key={lesson.id} activeOpacity={0.8}>
                <Card style={styles.lessonCard} padding={14}>
                  <View style={styles.lessonRow}>
                    <View
                      style={[
                        styles.lessonDot,
                        {
                          backgroundColor: lesson.done
                            ? Colors.accentGreen
                            : Colors.border,
                        },
                      ]}
                    >
                      {lesson.done && (
                        <Ionicons name="checkmark" size={12} color="#fff" />
                      )}
                    </View>
                    <View style={styles.lessonInfo}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      <Text style={styles.lessonMeta}>
                        {lesson.topic} · {lesson.duration}
                      </Text>
                    </View>
                    <Ionicons
                      name={lesson.done ? "refresh-outline" : "play-circle-outline"}
                      size={24}
                      color={lesson.done ? Colors.textMuted : Colors.accentPurple}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── Formula Reference ── */}
        <View style={styles.formulaSection}>
          <Text style={styles.formulaTitle}>Formula Reference</Text>
          {[
            { label: "Quadratic Formula", formula: "x = (−b ± √(b²−4ac)) / 2a" },
            { label: "Pythagorean Theorem", formula: "a² + b² = c²" },
            { label: "Slope Formula", formula: "m = (y₂ − y₁) / (x₂ − x₁)" },
          ].map((f) => (
            <Card key={f.label} style={styles.formulaCard} padding={14}>
              <Text style={styles.formulaLabel}>{f.label}</Text>
              <Text style={styles.formula}>{f.formula}</Text>
            </Card>
          ))}
        </View>
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
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "800", color: Colors.textPrimary },
  searchBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  featuredCard: {
    backgroundColor: Colors.accentPurple,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.accentPurple,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  featuredBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  featuredBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  featuredTopic: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    lineHeight: 26,
  },
  featuredDesc: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featuredMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  featuredMetaText: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  startBtnText: {
    color: Colors.accentPurple,
    fontWeight: "700",
    fontSize: 13,
  },

  tabToggle: {
    flexDirection: "row",
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 9,
  },
  toggleBtnActive: { backgroundColor: Colors.accentPurple },
  toggleText: { fontSize: 14, fontWeight: "600", color: Colors.textSecondary },
  toggleTextActive: { color: "#fff" },

  topicCard: { marginBottom: 10 },
  topicRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  topicIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  topicIcon: { fontSize: 20, fontWeight: "700" },
  topicInfo: { flex: 1 },
  topicTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  topicDesc: { fontSize: 12, color: Colors.textSecondary },
  topicRight: { flexDirection: "row", alignItems: "center", gap: 2 },
  topicPct: { fontSize: 13, fontWeight: "700" },
  topicProgress: { gap: 6 },
  topicLessons: {
    fontSize: 11,
    color: Colors.textMuted,
    alignSelf: "flex-end",
  },

  lessonCard: { marginBottom: 8 },
  lessonRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  lessonDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonInfo: { flex: 1 },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  lessonMeta: { fontSize: 12, color: Colors.textSecondary },

  formulaSection: { marginTop: 24 },
  formulaTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  formulaCard: { marginBottom: 8 },
  formulaLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "600",
    marginBottom: 4,
  },
  formula: {
    fontSize: 16,
    color: Colors.accentPurple,
    fontWeight: "700",
    fontFamily: "monospace",
  },
});
