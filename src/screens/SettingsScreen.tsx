import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import Card from "../components/Card";
import { settingsProfile, settingsSections } from "../data/placeholder";

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    notifications: true,
    sound: true,
    haptics: false,
  });

  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Text style={styles.title}>Settings</Text>

        {/* ── Profile Card ── */}
        <Card style={styles.profileCard} padding={20}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{settingsProfile.avatar}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{settingsProfile.name}</Text>
              <Text style={styles.profileGrade}>{settingsProfile.grade}</Text>
              <Text style={styles.profileSchool}>{settingsProfile.school}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons
                name="pencil-outline"
                size={16}
                color={Colors.accentPurple}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileDivider} />
          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatNum}>128</Text>
              <Text style={styles.profileStatLbl}>Problems</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatNum}>7</Text>
              <Text style={styles.profileStatLbl}>Day Streak</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatNum}>24</Text>
              <Text style={styles.profileStatLbl}>Quizzes</Text>
            </View>
          </View>
        </Card>

        {/* ── Sections ── */}
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card padding={0}>
              {section.items.map((item: any, idx: number) => {
                const isLast = idx === section.items.length - 1;
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={item.type === "toggle" ? 1 : 0.7}
                    style={[styles.settingRow, !isLast && styles.settingRowBorder]}
                  >
                    <Text
                      style={[
                        styles.settingLabel,
                        item.destructive && styles.settingDestructive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <View style={styles.settingRight}>
                      {item.type === "toggle" && (
                        <Switch
                          value={toggles[item.id] ?? item.value}
                          onValueChange={() => handleToggle(item.id)}
                          trackColor={{
                            false: Colors.border,
                            true: Colors.accentPurple,
                          }}
                          thumbColor={"#ffffff"}
                        />
                      )}
                      {item.type === "select" && (
                        <>
                          <Text style={styles.settingValue}>{item.value}</Text>
                          <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={Colors.textMuted}
                          />
                        </>
                      )}
                      {item.type === "navigate" && (
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color={
                            item.destructive
                              ? Colors.error
                              : Colors.textMuted
                          }
                        />
                      )}
                      {item.type === "info" && (
                        <Text style={styles.settingInfo}>{item.value}</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Card>
          </View>
        ))}

        {/* ── Sign Out ── */}
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Joined {settingsProfile.joinedDate} · MathHelper v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingBottom: 40 },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 20,
  },

  profileCard: { marginBottom: 24 },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accentPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 20, fontWeight: "800" },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  profileGrade: {
    fontSize: 13,
    color: Colors.accentPurple,
    fontWeight: "600",
    marginBottom: 1,
  },
  profileSchool: { fontSize: 12, color: Colors.textSecondary },
  editBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.bgCardAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  profileStats: { flexDirection: "row" },
  profileStat: { flex: 1, alignItems: "center" },
  profileStatNum: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  profileStatLbl: { fontSize: 11, color: Colors.textSecondary },

  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
    marginLeft: 4,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingLabel: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  settingDestructive: { color: Colors.error },
  settingRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  settingValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  settingInfo: {
    fontSize: 14,
    color: Colors.textMuted,
  },

  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.error + "50",
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 20,
    backgroundColor: Colors.error + "08",
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.error,
  },

  footer: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: "center",
  },
});
