import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors, radii, spacing, shadow } from '../theme';
import { recipes, categories } from '../data/recipes';
import { useApp } from '../store';
import RecipeCard from '../components/RecipeCard';

export default function HomeScreen({ navigation }) {
  const { user } = useApp();
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? recipes : recipes.filter((r) => r.category === cat);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greet}>Hi, {user.name.split(' ')[0]} 👋</Text>
            <Text style={styles.sub}>What would you like to cook today?</Text>
          </View>
          <TouchableOpacity style={styles.bell}>
            <Ionicons name="notifications-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Recipes')} style={styles.search}>
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Search 1000+ healthy recipes</Text>
        </TouchableOpacity>

        <View style={styles.intake}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ color: colors.white, opacity: 0.85, fontSize: 12 }}>Today's intake</Text>
              <Text style={styles.kcal}>1,420 <Text style={{ fontSize: 14, opacity: 0.85 }}>/ 2,100 kcal</Text></Text>
            </View>
            <View style={styles.flameIcon}><Ionicons name="flame" size={26} color={colors.white} /></View>
          </View>
          <View style={styles.progress}><View style={[styles.progressFill, { width: '68%' }]} /></View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            {[['Protein', '78g'], ['Carbs', '156g'], ['Fats', '42g']].map(([l, v]) => (
              <View key={l} style={styles.intakeStat}>
                <Text style={{ color: colors.white, fontWeight: '700' }}>{v}</Text>
                <Text style={{ color: colors.white, opacity: 0.8, fontSize: 10 }}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catsRow}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCat(c)}
              style={[styles.catBtn, cat === c && { backgroundColor: colors.primary }]}
            >
              <Text style={{ color: cat === c ? colors.white : colors.text, fontSize: 12, fontWeight: '700' }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recipes')}>
            <Text style={{ color: colors.primaryDark, fontSize: 12, fontWeight: '700' }}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
          {filtered.slice(0, 4).map((r) => (
            <RecipeCard key={r.id} recipe={r} wide />
          ))}
        </ScrollView>

        <View style={[styles.sectionHead, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Popular this week</Text>
        </View>
        <View style={{ paddingHorizontal: 20, gap: 16, marginTop: 12 }}>
          {recipes.slice(2, 5).map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.xxl, paddingTop: spacing.lg, paddingBottom: spacing.md },
  greet: { fontSize: 24, fontWeight: '800', color: colors.text },
  sub: { color: colors.textSecondary, marginTop: 2 },
  bell: { width: 44, height: 44, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  search: { marginHorizontal: spacing.xxl, height: 48, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  intake: { marginHorizontal: spacing.xxl, marginTop: spacing.xl, padding: 20, borderRadius: radii.xxl, backgroundColor: colors.primaryDark, ...shadow.button },
  kcal: { color: colors.white, fontSize: 28, fontWeight: '800', marginTop: 4 },
  flameIcon: { width: 56, height: 56, borderRadius: radii.lg, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  progress: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginTop: 16, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.white, borderRadius: 4 },
  intakeStat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: radii.md, paddingVertical: 8, alignItems: 'center' },
  catsRow: { paddingHorizontal: 20, gap: 8, marginTop: 20 },
  catBtn: { height: 36, paddingHorizontal: 16, borderRadius: radii.full, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
});
