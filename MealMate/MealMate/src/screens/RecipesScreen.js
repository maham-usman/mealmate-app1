import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors, radii, spacing } from '../theme';
import { recipes, categories } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function RecipesScreen() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const filtered = recipes.filter(
    (r) => (cat === 'All' || r.category === cat) && r.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: spacing.xxl, paddingTop: spacing.lg }}>
        <Text style={styles.h1}>Recipes</Text>
        <Text style={styles.sub}>{filtered.length} healthy recipes</Text>
      </View>
      <View style={styles.searchRow}>
        <View style={styles.search}>
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search recipes, ingredients..."
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.filter}>
          <Ionicons name="options-outline" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cats}>
        {categories.map((c) => (
          <TouchableOpacity key={c} onPress={() => setCat(c)} style={[styles.catBtn, cat === c && { backgroundColor: colors.primary }]}>
            <Text style={{ color: cat === c ? colors.white : colors.text, fontWeight: '700', fontSize: 12 }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filtered}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentContainerStyle={{ paddingHorizontal: spacing.xxl, gap: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: '800', color: colors.text },
  sub: { color: colors.textSecondary, marginTop: 4 },
  searchRow: { flexDirection: 'row', gap: 8, paddingHorizontal: spacing.xxl, marginTop: 16 },
  search: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, height: 48, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16 },
  input: { flex: 1, color: colors.text, fontSize: 14 },
  filter: { width: 48, height: 48, borderRadius: radii.lg, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  cats: { paddingHorizontal: spacing.xxl, gap: 8, marginTop: 16, marginBottom: 8 },
  catBtn: { height: 36, paddingHorizontal: 16, borderRadius: radii.full, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
});
