import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, radii, spacing, shadow } from '../theme';
import { useApp } from '../store';

export default function RecipeCard({ recipe, wide }) {
  const nav = useNavigation();
  const { favorites, toggleFav } = useApp();
  const isFav = favorites.includes(recipe.id);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => nav.navigate('RecipeDetail', { id: recipe.id })}
      style={[styles.card, wide && { width: 260 }]}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <TouchableOpacity onPress={() => toggleFav(recipe.id)} style={styles.fav}>
          <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={18} color={isFav ? colors.danger : colors.text} />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{recipe.category}</Text>
        </View>
      </View>
      <View style={{ padding: spacing.lg }}>
        <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.meta}>{recipe.time}</Text>
          <Ionicons name="flame-outline" size={12} color={colors.textSecondary} style={{ marginLeft: 8 }} />
          <Text style={styles.meta}>{recipe.calories} kcal</Text>
        </View>
        <View style={styles.macros}>
          {[['Protein', recipe.protein], ['Carbs', recipe.carbs], ['Fats', recipe.fats]].map(([l, v]) => (
            <View key={l} style={styles.macro}>
              <Text style={styles.macroLabel}>{l}</Text>
              <Text style={styles.macroValue}>{v}g</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radii.xxl, overflow: 'hidden', ...shadow.card },
  imageWrap: { height: 160, position: 'relative' },
  image: { width: '100%', height: '100%' },
  fav: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.95)', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.95)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.full },
  badgeText: { fontSize: 10, fontWeight: '700', color: colors.primaryDark },
  title: { fontSize: 16, fontWeight: '700', color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  meta: { fontSize: 12, color: colors.textSecondary, marginLeft: 2 },
  macros: { flexDirection: 'row', gap: 8, marginTop: 12 },
  macro: { flex: 1, backgroundColor: colors.primaryLight, borderRadius: radii.md, paddingVertical: 6, alignItems: 'center' },
  macroLabel: { fontSize: 10, color: colors.textSecondary },
  macroValue: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
});
