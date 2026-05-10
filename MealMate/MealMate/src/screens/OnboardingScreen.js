import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii, shadow } from '../theme';

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.center}>
        <View style={styles.logo}>
          <Ionicons name="leaf" size={48} color={colors.white} />
        </View>
        <Text style={styles.title}>MealMate</Text>
        <Text style={styles.subtitle}>
          Your daily companion for healthy eating. Discover recipes tailored to your goals.
        </Text>
        <View style={{ width: '100%', marginTop: 36, gap: 10 }}>
          {[
            { t: 'Personalized recipes', d: 'Curated to match your nutritional goals.' },
            { t: 'Smart meal plans', d: 'Build weekly plans in seconds.' },
            { t: 'Track macros easily', d: 'Calories, protein, carbs and fats.' },
          ].map((f) => (
            <View key={f.t} style={styles.feature}>
              <View style={styles.check}><Text style={{ color: colors.primaryDark, fontWeight: '700' }}>✓</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fTitle}>{f.t}</Text>
                <Text style={styles.fDesc}>{f.d}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={{ padding: spacing.xxl }}>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.ctaText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'center', color: colors.textSecondary }}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primaryLight },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxl },
  logo: {
    width: 96, height: 96, borderRadius: 28, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', ...shadow.button, marginBottom: 24,
  },
  title: { fontSize: 36, fontWeight: '800', color: colors.primaryDark },
  subtitle: { textAlign: 'center', color: colors.textSecondary, marginTop: 8, lineHeight: 22 },
  feature: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.85)', padding: 12, borderRadius: radii.lg, gap: 12, alignItems: 'flex-start' },
  check: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  fTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
  fDesc: { fontSize: 12, color: colors.textSecondary },
  cta: {
    height: 56, borderRadius: radii.xl, backgroundColor: colors.primary,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, ...shadow.button,
  },
  ctaText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
