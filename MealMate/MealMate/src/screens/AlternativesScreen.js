import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme';
import { recipes } from '../data/recipes';

export default function AlternativesScreen({ route, navigation }) {
  const { ingredient } = route.params;
  const found = recipes.flatMap((r) => r.ingredients).find((i) => i.name === ingredient);
  const alts = found?.alt ?? ['Tofu', 'Tempeh', 'Chickpeas', 'Lentils'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.xxl, paddingTop: spacing.lg }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Ingredient swap</Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text }}>{ingredient}</Text>
          </View>
        </View>

        <View style={styles.hint}>
          <View style={styles.hintIcon}><Ionicons name="swap-horizontal" size={22} color={colors.white} /></View>
          <Text style={{ color: colors.textSecondary, marginTop: 12, lineHeight: 20 }}>
            Got allergies, dietary restrictions or just out of stock? Try one of these healthy alternatives.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Alternatives</Text>
        <View style={{ paddingHorizontal: spacing.xxl, gap: 10 }}>
          {alts.map((alt) => (
            <TouchableOpacity key={alt} style={styles.altRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={styles.letter}><Text style={{ color: colors.primaryDark, fontWeight: '800' }}>{alt[0]}</Text></View>
                <View>
                  <Text style={{ fontWeight: '700', color: colors.text }}>{alt}</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Similar nutritional profile</Text>
                </View>
              </View>
              <View style={styles.checkBtn}><Ionicons name="checkmark" size={18} color={colors.white} /></View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  back: { width: 40, height: 40, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  hint: { margin: spacing.xxl, padding: 20, borderRadius: radii.xxl, backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: colors.border },
  hintIcon: { width: 48, height: 48, borderRadius: radii.lg, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, paddingHorizontal: spacing.xxl, marginBottom: 12 },
  altRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  letter: { width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  checkBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
