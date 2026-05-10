export const colors = {
  primary: '#4CAF50',
  primaryDark: '#2E7D32',
  primaryLight: '#E8F5E9',
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  background: '#FAFBF9',
  card: '#FFFFFF',
  border: '#ECEFF1',
  danger: '#E74C3C',
  warning: '#F39C12',
  white: '#FFFFFF',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };

export const radii = { sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, full: 999 };

export const typography = {
  h1: { fontSize: 28, fontWeight: '800', color: colors.text },
  h2: { fontSize: 20, fontWeight: '700', color: colors.text },
  h3: { fontSize: 16, fontWeight: '600', color: colors.text },
  body: { fontSize: 14, color: colors.text },
  caption: { fontSize: 12, color: colors.textSecondary },
};

export const shadow = {
  card: {
    shadowColor: '#2E7D32',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  button: {
    shadowColor: '#4CAF50',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
};
