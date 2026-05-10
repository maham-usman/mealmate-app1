import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, shadow } from '../theme';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: spacing.xxl, flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.textSecondary }}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.h1}>Welcome back</Text>
        <Text style={styles.sub}>Sign in to continue your healthy journey.</Text>

        <View style={{ marginTop: 24, gap: 12 }}>
          <Field icon="mail-outline" placeholder="Email address" defaultValue="alex@mealmate.app" />
          <Field icon="lock-closed-outline" placeholder="Password" secureTextEntry defaultValue="password" />
        </View>

        <TouchableOpacity style={styles.cta} onPress={() => navigation.replace('Tabs')}>
          <Text style={styles.ctaText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divLine} />
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>or continue with</Text>
          <View style={styles.divLine} />
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity style={styles.socialBtn}><Text style={{ fontWeight: '600' }}>Google</Text></TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}><Text style={{ fontWeight: '600' }}>Apple</Text></TouchableOpacity>
        </View>

        <View style={{ marginTop: 'auto', alignItems: 'center', paddingBottom: 16 }}>
          <Text style={{ color: colors.textSecondary }}>
            New here?{' '}
            <Text onPress={() => navigation.navigate('Register')} style={{ color: colors.primaryDark, fontWeight: '700' }}>
              Create account
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
  cta: { marginTop: 20, height: 56, borderRadius: radii.xl, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...shadow.button },
  ctaText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 20 },
  divLine: { flex: 1, height: 1, backgroundColor: colors.border },
  socialBtn: { flex: 1, height: 48, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
});
