import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors, radii, spacing, shadow } from '../theme';

export default function RegisterScreen({ navigation }) {
  const [goal, setGoal] = useState('Maintain');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: spacing.xxl, flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.textSecondary }}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.h1}>Create account</Text>
        <Text style={styles.sub}>Start your healthy lifestyle today.</Text>

        <View style={{ marginTop: 24, gap: 12 }}>
          <Field icon="person-outline" placeholder="Full name" />
          <Field icon="mail-outline" placeholder="Email address" />
          <Field icon="lock-closed-outline" placeholder="Create password" secureTextEntry />
        </View>

        <View style={styles.goalBox}>
          <Text style={styles.goalLabel}>Your goal</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {['Lose', 'Maintain', 'Gain'].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setGoal(g)}
                style={[styles.goalBtn, goal === g && { backgroundColor: colors.primary }]}
              >
                <Text style={{ color: goal === g ? colors.white : colors.text, fontWeight: '600', fontSize: 12 }}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.cta} onPress={() => navigation.replace('Tabs')}>
          <Text style={styles.ctaText}>Create Account</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 'auto', alignItems: 'center' }}>
          <Text style={{ color: colors.textSecondary }}>
            Already have an account?{' '}
            <Text onPress={() => navigation.navigate('Login')} style={{ color: colors.primaryDark, fontWeight: '700' }}>
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function Field({ icon, ...props }) {
  return (
    <View style={styles.field}>
      <Ionicons name={icon} size={18} color={colors.textSecondary} />
      <TextInput {...props} placeholderTextColor={colors.textSecondary} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 24 },
  sub: { color: colors.textSecondary, marginTop: 6 },
  field: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 56, borderWidth: 1, borderColor: colors.border, borderRadius: radii.xl, backgroundColor: colors.card, paddingHorizontal: 16 },
  input: { flex: 1, color: colors.text, fontSize: 14 },
  goalBox: { backgroundColor: colors.primaryLight, padding: 16, borderRadius: radii.xl, marginTop: 16 },
  goalLabel: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
  goalBtn: { flex: 1, height: 40, borderRadius: radii.md, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  cta: { marginTop: 20, height: 56, borderRadius: radii.xl, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...shadow.button },
  ctaText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
