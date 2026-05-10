import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, shadow } from '../theme';
import { useApp } from '../store';

export default function ProfileScreen({ navigation }) {
  const { user, favorites, plan } = useApp();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ paddingHorizontal: spacing.xxl, paddingTop: spacing.lg }}>
          <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text }}>Profile</Text>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={styles.avatar}><Text style={{ fontSize: 24, color: colors.white, fontWeight: '800' }}>{user.name[0]}</Text></View>
            <View>
              <Text style={{ color: colors.white, fontSize: 18, fontWeight: '800' }}>{user.name}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{user.email}</Text>
              <View style={styles.goalPill}>
                <Ionicons name="trophy-outline" size={12} color={colors.white} />
                <Text style={{ color: colors.white, fontWeight: '700', fontSize: 11 }}>{user.goal}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            <Stat v={favorites.length} l="Favorites" />
            <Stat v={plan.length} l="Planned" />
            <Stat v="24" l="Cooked" />
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.xxl, marginTop: spacing.xl, gap: 8 }}>
          <Row icon="fitness-outline" label="Health goals" />
          <Row icon="notifications-outline" label="Notifications" />
          <Row icon="shield-checkmark-outline" label="Privacy" />
          <Row icon="settings-outline" label="Preferences" />
        </View>

        <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.signOut}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={{ color: colors.danger, fontWeight: '700' }}>Sign out</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', color: colors.textSecondary, fontSize: 12, marginTop: 16 }}>MealMate v1.0 · University Project</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ v, l }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: radii.md, paddingVertical: 8, alignItems: 'center' }}>
      <Text style={{ color: colors.white, fontWeight: '800' }}>{v}</Text>
      <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10 }}>{l}</Text>
    </View>
  );
}
function Row({ icon, label }) {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.rowIcon}><Ionicons name={icon} size={18} color={colors.primaryDark} /></View>
      <Text style={{ flex: 1, color: colors.text, fontWeight: '500' }}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { margin: spacing.xxl, padding: 20, borderRadius: radii.xxl, backgroundColor: colors.primaryDark, ...shadow.button },
  avatar: { width: 64, height: 64, borderRadius: radii.lg, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  goalPill: { flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: radii.full, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radii.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  rowIcon: { width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  signOut: { marginHorizontal: spacing.xxl, marginTop: 20, height: 56, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.danger, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
});
