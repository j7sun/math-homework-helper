import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { savedItems, savedFilters } from "../data/placeholder";

export default function SavedScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = savedItems.filter((item) => {
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Problems" && item.type === "problem") ||
      (activeFilter === "Notes" && item.type === "note") ||
      (activeFilter === "Reference" && item.tag === "Reference");
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.topic.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>Saved</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={22} color={Colors.accentPurple} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          {savedItems.length} saved items
        </Text>

        {/* ── Search ── */}
        <View style={styles.searchWrap}>
          <Ionicons
            name="search-outline"
            size={18}
            color={Colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search saved items..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* ── Filters ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {savedFilters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterChip,
                activeFilter === f && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Items ── */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubText}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          filtered.map((item) => (
            <TouchableOpacity key={item.id} activeOpacity={0.8}>
              <Card style={styles.itemCard} padding={16}>
                <View style={styles.itemTop}>
                  <View style={styles.typeIcon}>
                    <Ionicons
                      name={item.type === "problem" ? "calculator-outline" : "document-text-outline"}
                      size={18}
                      color={Colors.accentPurple}
                    />
                  </View>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemTopic}>{item.topic}</Text>
                    <Text style={styles.itemDate}>{item.savedAt}</Text>
                  </View>
                  <Badge label={item.tag} color={item.tagColor} />
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPreview}>{item.preview}</Text>
                <View style={styles.itemActions}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons
                      name="open-outline"
                      size={15}
                      color={Colors.accentPurple}
                    />
                    <Text style={styles.actionText}>Open</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons
                      name="share-outline"
                      size={15}
                      color={Colors.textSecondary}
                    />
                    <Text style={[styles.actionText, { color: Colors.textSecondary }]}>
                      Share
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons
                      name="trash-outline"
                      size={15}
                      color={Colors.error}
                    />
                    <Text style={[styles.actionText, { color: Colors.error }]}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
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
    marginBottom: 4,
  },
  title: { fontSize: 28, fontWeight: "800", color: Colors.textPrimary },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  filtersScroll: { marginBottom: 16 },
  filtersContent: { gap: 8 },
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

  itemCard: { marginBottom: 10 },
  itemTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.accentPurple + "18",
    alignItems: "center",
    justifyContent: "center",
  },
  itemMeta: { flex: 1 },
  itemTopic: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.accentPurple,
    marginBottom: 1,
  },
  itemDate: { fontSize: 11, color: Colors.textMuted },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemPreview: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
    fontFamily: "monospace",
  },
  itemActions: {
    flexDirection: "row",
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 10,
  },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.accentPurple,
  },

  empty: { alignItems: "center", paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  emptySubText: { fontSize: 13, color: Colors.textSecondary },
});
