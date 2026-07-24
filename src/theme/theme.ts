// Grocify styles — colors, typography, spacing (Fresh & Minimal design)

export const colors = {
  background: '#f9f9ff',
  surface: '#ffffff',
  primary: '#14422d',
  onPrimary: '#ffffff',
  onSurface: '#141b2b',
  onSurfaceVariant: '#414943',
  secondaryContainer: '#d9e6da',
  onSecondaryContainer: '#5b675e',
  cardBorder: '#E5E7EB',
  outline: '#717973',
  error: '#ba1a1a',
} as const;

export const typography = {
  headlineMd: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySm: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  labelCaps: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
  priceDisplay: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 24,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  full: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
