import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors, radii, spacing, shadow } from '../theme';
import { recipes } from '../data/recipes';
import { useApp } from '../store';

export default function RecipeDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const recipe = recipes.find((r) => r.id === id);
  const { favorites, toggleFav, addToPlan } = useApp();
  const [tab, setTab] = useState('ingredients');
  if (!recipe) return null;
  const isFav = favorites.includes(recipe.id);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 290 }}>
          <Image source={{ uri: recipe.image }} style={StyleSheet.absoluteFill} />
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFav(recipe.id)} style={styles.iconBtn}>
              <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={22} color={isFav ? colors.danger : colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.tag}>
            <Text style={{ color: colors.primaryDark, fontWeight: '700', fontSize: 12 }}>{recipe.category}</Text>
          </View>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.desc}>{recipe.description}</Text>

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            <Info icon="time-outline" label={recipe.time} />
            <Info icon="flame-outline" label={`${recipe.calories} kcal`} />
            <Info icon="restaurant-outline" label={recipe.difficulty} />
          </View>

          <View style={styles.tabs}>
            {['ingredients', 'steps', 'nutrition'].map((t) => (
              <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
                <Text style={{ color: tab === t ? colors.primaryDark : colors.textSecondary, fontWeight: '700', fontSize: 12, textTransform: 'capitalize' }}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {tab === 'ingredients' && (
            <View style={{ gap: 8, marginTop: 16 }}>
              {recipe.ingredients.map((ing) => (
                <View key={ing.name} style={styles.ingRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={styles.ingIcon}><Ionicons name="leaf-outline" size={16} color={colors.primaryDark} /></View>
                    <View>
                      <Text style={{ fontWeight: '600', color: colors.text }}>{ing.name}</Text>
                      <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{ing.amount}</Text>
                    </View>
                  </View>
                  {ing.alt && (
                    <TouchableOpacity onPress={() => navigation.navigate('Alternatives', { ingredient: ing.name })} style={styles.swap}>
                      <Ionicons name="swap-horizontal" size={12} color={colors.primaryDark} />
                      <Text style={{ color: colors.primaryDark, fontWeight: '700', fontSize: 11 }}>Swap</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}
          {tab === 'steps' && (
            <View style={{ gap: 12, marginTop: 16 }}>
              {recipe.steps.map((s, i) => (
                <View key={i} style={styles.step}>
                  <View style={styles.stepNum}><Text style={{ color: colors.white, fontWeight: '700' }}>{i + 1}</Text></View>
                  <Text style={{ flex: 1, color: colors.text }}>{s}</Text>
                </View>
              ))}
            </View>
          )}
          {tab === 'nutrition' && (
            <View style={{ gap: 12, marginTop: 16 }}>
              {[
                ['Calories', recipe.calories, 'kcal', 2100],
                ['Protein', recipe.protein, 'g', 120],
                ['Carbs', recipe.carbs, 'g', 250],
                ['Fats', recipe.fats, 'g', 70],
              ].map(([l, v, u, max]) => (
                <View key={l} style={styles.nutr}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', color: colors.text }}>{l}</Text>
                    <Text style={{ fontWeight: '600', color: colors.text }}>{v}{u}</Text>
                  </View>
                  <View style={styles.bar}><View style={[styles.barFill, { width: `${Math.min((v / max) * 100, 100)}%` }]} /></View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cta}
          onPress={() => {
            addToPlan({ day: 'Mon', slot: recipe.category === 'Breakfast' ? 'Breakfast' : 'Lunch', recipeId: recipe.id });
            Alert.alert('Added', 'Recipe added to your meal plan');
          }}
        >
          <Ionicons name="add" size={18} color={colors.white} />
          <Text style={{ color: colors.white, fontWeight: '700' }}>Add to meal plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Info({ icon, label }) {
  return (
    <View style={styles.info}>
      <Ionicons name={icon} size={14} color={colors.primaryDark} />
      <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.95)', alignItems: 'center', justifyContent: 'center' },
  content: { backgroundColor: colors.background, marginTop: -32, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: spacing.xxl },
  tag: { alignSelf: 'flex-start', backgroundColor: colors.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: radii.full },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 12 },
  desc: { color: colors.textSecondary, marginTop: 6, lineHeight: 20 },
  info: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  tabs: { flexDirection: 'row', gap: 4, padding: 4, backgroundColor: '#F1F5F2', borderRadius: radii.lg, marginTop: 24 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: radii.md },
  tabActive: { backgroundColor: colors.card, ...shadow.card },
  ingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, padding: 12, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border },
  ingIcon: { width: 36, height: 36, borderRadius: radii.md, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  swap: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.primaryLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.full },
  step: { flexDirection: 'row', gap: 12, padding: 12, backgroundColor: colors.card, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border },
  stepNum: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  nutr: { padding: 14, backgroundColor: colors.card, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border },
  bar: { height: 8, backgroundColor: '#F1F5F2', borderRadius: 4, marginTop: 8, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border },
  cta: { flexDirection: 'row', height: 52, borderRadius: radii.lg, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', gap: 8, ...shadow.button },
});
