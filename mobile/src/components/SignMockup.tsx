import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Product } from '../constants/data';

export type FontChoice = 'script' | 'block' | 'sans' | 'serif';

interface Props {
  product: Product;
  customText: string;
  colorHex: string;
  font: FontChoice;
  logoUri?: string;
}

function getMockupTheme(category: string): {
  bg: string; frameBg: string; frameColor: string; isNeon: boolean; isLight: boolean;
} {
  switch (category) {
    case 'Neon Signs':
      return { bg: '#060810', frameBg: '#0D0F1A', frameColor: '#1A1D2E', isNeon: true,  isLight: false };
    case 'LED Signs':
    case 'Illuminated':
      return { bg: '#0A0A0A', frameBg: '#111111', frameColor: '#1F1F1F', isNeon: false, isLight: false };
    case 'Channel Letters':
      return { bg: '#1C1C1E', frameBg: '#2C2C2E', frameColor: '#3A3A3C', isNeon: false, isLight: false };
    case 'Lobby & Office':
      return { bg: '#F5F2EE', frameBg: '#E8E4DF', frameColor: '#D0CBC4', isNeon: false, isLight: true  };
    case 'Indoor Signs':
    case 'Custom Shapes':
      return { bg: '#FFFFFF', frameBg: '#F5F5F5', frameColor: '#E5E5E5', isNeon: false, isLight: true  };
    default: // Outdoor Signs
      return { bg: '#1A1A1A', frameBg: '#2A2A2A', frameColor: '#3A3A3A', isNeon: false, isLight: false };
  }
}

function getTextStyle(font: FontChoice) {
  switch (font) {
    case 'script':
      return {
        fontFamily: Platform.OS === 'ios' ? 'Palatino-Italic' : 'serif',
        fontStyle: 'italic' as const,
        fontSize: 38,
        fontWeight: '400' as const,
        letterSpacing: 1,
      };
    case 'block':
      return {
        fontSize: 32,
        fontWeight: '900' as const,
        letterSpacing: 3,
      };
    case 'serif':
      return {
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        fontSize: 34,
        fontWeight: '600' as const,
        letterSpacing: 0.5,
      };
    default: // sans
      return {
        fontSize: 32,
        fontWeight: '700' as const,
        letterSpacing: 1,
      };
  }
}

export default function SignMockup({ product, customText, colorHex, font, logoUri }: Props) {
  const theme  = getMockupTheme(product.category);
  const tStyle = getTextStyle(font);
  const hasContent = customText.trim().length > 0 || !!logoUri;

  return (
    <View style={[styles.outer, { backgroundColor: theme.bg }]}>
      {/* Subtle corner screws for realism */}
      {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
        <View key={pos} style={[styles.screw, (styles as any)[pos]]} />
      ))}

      <View style={[styles.inner, { backgroundColor: theme.frameBg, borderColor: theme.frameColor }]}>
        {/* PREVIEW watermark */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>MOCKUP PREVIEW</Text>
        </View>

        {!hasContent ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyIcon, { color: theme.isLight ? '#BBBBBB' : '#333333' }]}>✏️</Text>
            <Text style={[styles.emptyText, { color: theme.isLight ? '#AAAAAA' : '#3A3A3A' }]}>
              Enter your text below to see a preview
            </Text>
          </View>
        ) : (
          <View style={styles.designArea}>
            {logoUri && (
              <Image
                source={{ uri: logoUri }}
                style={styles.logoImg}
                resizeMode="contain"
              />
            )}
            {customText.trim().length > 0 && (
              theme.isNeon ? (
                // Neon glow effect — layered text shadow
                <View>
                  <Text
                    style={[
                      tStyle,
                      styles.neonOuter,
                      {
                        color: colorHex,
                        textShadowColor: colorHex,
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 24,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {customText}
                  </Text>
                  <Text
                    style={[
                      tStyle,
                      styles.neonInner,
                      {
                        color: '#FFFFFF',
                        textShadowColor: colorHex,
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 6,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {customText}
                  </Text>
                </View>
              ) : (
                <Text
                  style={[
                    tStyle,
                    styles.standardText,
                    {
                      color: theme.isLight ? '#1A1A1A' : colorHex !== '#FFFFFF' ? colorHex : '#FFFFFF',
                      textShadowColor: theme.isLight ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.6)',
                      textShadowOffset: { width: 1, height: 2 },
                      textShadowRadius: 4,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {customText}
                </Text>
              )
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 12,
    padding: 12,
    position: 'relative',
    minHeight: 180,
    overflow: 'hidden',
  },
  inner: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 156,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    overflow: 'hidden',
  },
  screw: {
    position: 'absolute',
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#555',
    zIndex: 2,
  },
  topLeft:     { top: 6, left: 6 },
  topRight:    { top: 6, right: 6 },
  bottomLeft:  { bottom: 6, left: 6 },
  bottomRight: { bottom: 6, right: 6 },
  badge: {
    position: 'absolute', top: 8, right: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
  },
  badgeText: { fontSize: 8, fontWeight: '700', color: 'rgba(255,255,255,0.25)', letterSpacing: 1 },
  emptyState: { alignItems: 'center', gap: 8 },
  emptyIcon:  { fontSize: 28 },
  emptyText:  { fontSize: 13, textAlign: 'center', lineHeight: 18 },
  designArea: { alignItems: 'center', gap: 12, width: '100%' },
  logoImg:    { width: '80%', height: 70 },
  neonOuter:  { textAlign: 'center' },
  neonInner:  { textAlign: 'center', position: 'absolute', top: 0, left: 0, right: 0 },
  standardText: { textAlign: 'center' },
});
