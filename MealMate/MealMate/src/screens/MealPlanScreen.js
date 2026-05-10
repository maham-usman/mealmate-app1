import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, shadow } from '../theme';
import { useApp } from '../store';
import { recipes } from '../data/recipes';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const slots = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function MealPlanScreen({ navigation }) {
  const { plan, removeFromPlan } = useApp();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.xxl, paddingTop: spacing.lg }}>
          <Text style={styles.h1}>Meal Plan</Text>
          <Text style={styles.sub}>This week at a glance</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
          {days.map((d, i) => (
            <View key={d} style={[styles.dayBtn, i === 0 && { backgroundColor: colors.primary, ...shadow.button }]}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: i === 0 ? colors.white : colors.textSecondary }}>{d}</Text>
              <Text style={{ fontSize: 16, fontWeight: '800', color: i === 0 ? colors.white : colors.text }}>{10 + i}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: spacing.xxl, gap: 16 }}>
          {slots.map((slot) => {
            const items = plan.filter((p) => p.slot === slot && p.day === 'Mon');
            return (
              <View key={slot} style={styles.slotCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 11, color: colors.textSecondary, letterSpacing: 1 }}>{slot.toUpperCase()}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text }}>{items.length} items</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Recipes')} style={styles.add}>
                    <Ionicons name="add" size={18} color={colors.primaryDark} />
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, gap: 8 }}>
                  {items.length === 0 ? (
                    <View style={styles.empty}><Text style={{ color: colors.textSecondary, fontSize: 12 }}>No meals planned</Text></View>
                  ) : (
                    items.map((item) => {
                      const r = recipes.find((x) => x.id === item.recipeId);
                      return (
                        <View key={item.recipeId} style={styles.mealItem}>
                          <Image source={{ uri: r.image }} style={styles.thumb} />
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '700', color: colors.text }} numberOfLines={1}>{r.title}</Text>
                            <Text style={{ fontSize: 12, color: colors.textSecondary }}>{r.calories} kcal · {r.protein}g protein</Text>
                          </View>
                          <TouchableOpacity onPress={() => removeFromPlan(item)} style={styles.trash}>
                            <Ionicons name="trash-outline" size={18} color={colors.danger} />
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: '800', color: colors.text },
  sub: { color: colors.textSecondary, marginTop: 4 },
  daysRow: { paddingHorizontal: spacing.xxl, gap: 8, marginTop: 16, marginBottom: 16 },
  dayBtn: { width: 56, height: 64, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  slotCard: { padding: 16, borderRadius: radii.xl, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  add: { width: 36, height: 36, borderRadius: radii.md, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  empty: { padding: 12, borderRadius: radii.md, backgroundColor: '#F5F7F5', alignItems: 'center' },
  mealItem: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 8, borderRadius: radii.md, backgroundColor: colors.primaryLight },
  thumb: { width: 48, height: 48, borderRadius: radii.md },
  trash: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
});
