import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme';
import { useApp } from '../store';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useApp();
  const list = recipes.filter((r) => favorites.includes(r.id));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: spacing.xxl, paddingTop: spacing.lg, paddingBottom: spacing.md }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text }}>Favorites</Text>
        <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{list.length} saved recipes</Text>
      </View>
      {list.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}><Ionicons name="heart" size={36} color={colors.primaryDark} /></View>
          <Text style={{ color: colors.textSecondary, marginTop: 12 }}>No favorites yet.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recipes')} style={styles.btn}>
            <Text style={{ color: colors.white, fontWeight: '700' }}>Browse recipes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(r) => r.id}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          contentContainerStyle={{ paddingHorizontal: spacing.xxl, gap: 16, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { width: 80, height: 80, borderRadius: 24, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  btn: { marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, borderRadius: radii.full, backgroundColor: colors.primary },
});
