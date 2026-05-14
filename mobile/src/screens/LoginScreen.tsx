import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

type Tab = 'login' | 'signup';

export default function LoginScreen({ navigation, route }: any) {
  const initialTab: Tab = route?.params?.tab === 'signup' ? 'signup' : 'login';
  const [tab, setTab] = useState<Tab>(initialTab);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', company: '', password: '' });

  const { login, signup } = useAuth();

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      Alert.alert('Error', 'Please fill in all fields.'); return;
    }
    setLoading(true);
    const ok = await login(loginForm.email, loginForm.password);
    setLoading(false);
    if (ok) navigation.goBack();
  };

  const handleSignup = async () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      Alert.alert('Error', 'Please fill in all required fields.'); return;
    }
    setLoading(true);
    const ok = await signup(signupForm.name, signupForm.email, signupForm.password, signupForm.company);
    setLoading(false);
    if (ok) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>

          {/* Brand */}
          <View style={styles.brand}>
            <View style={styles.brandLogo}>
              <MaterialIcons name="signpost" size={36} color={Colors.white} />
            </View>
            <Text style={styles.brandName}>Signage.com</Text>
            <Text style={styles.brandTagline}>Professional signage, on demand</Text>
          </View>

          {/* Tab Switch */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, tab === 'login' && styles.tabActive]}
              onPress={() => setTab('login')}
            >
              <Text style={[styles.tabText, tab === 'login' && styles.tabTextActive]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === 'signup' && styles.tabActive]}
              onPress={() => setTab('signup')}
            >
              <Text style={[styles.tabText, tab === 'signup' && styles.tabTextActive]}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Login Form */}
          {tab === 'login' && (
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Email</Text>
                <View style={styles.inputRow}>
                  <MaterialIcons name="email" size={18} color={Colors.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={loginForm.email}
                    onChangeText={v => setLoginForm(f => ({ ...f, email: v }))}
                  />
                </View>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Password</Text>
                <View style={styles.inputRow}>
                  <MaterialIcons name="lock" size={18} color={Colors.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={!showPassword}
                    value={loginForm.password}
                    onChangeText={v => setLoginForm(f => ({ ...f, password: v }))}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(s => !s)}>
                    <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={18} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, loading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.submitBtnText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Signup Form */}
          {tab === 'signup' && (
            <View style={styles.form}>
              {[
                { key: 'name', label: 'Full Name *', placeholder: 'John Smith', icon: 'person' },
                { key: 'email', label: 'Email *', placeholder: 'your@email.com', icon: 'email' },
                { key: 'company', label: 'Company', placeholder: 'Acme Corp (optional)', icon: 'business' },
              ].map(field => (
                <View key={field.key} style={styles.field}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <View style={styles.inputRow}>
                    <MaterialIcons name={field.icon as any} size={18} color={Colors.textMuted} />
                    <TextInput
                      style={styles.input}
                      placeholder={field.placeholder}
                      placeholderTextColor={Colors.textMuted}
                      keyboardType={field.key === 'email' ? 'email-address' : 'default'}
                      autoCapitalize={field.key === 'email' ? 'none' : 'words'}
                      value={(signupForm as any)[field.key]}
                      onChangeText={v => setSignupForm(f => ({ ...f, [field.key]: v }))}
                    />
                  </View>
                </View>
              ))}
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Password *</Text>
                <View style={styles.inputRow}>
                  <MaterialIcons name="lock" size={18} color={Colors.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={!showPassword}
                    value={signupForm.password}
                    onChangeText={v => setSignupForm(f => ({ ...f, password: v }))}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(s => !s)}>
                    <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={18} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.terms}>
                By creating an account you agree to our{' '}
                <Text style={{ color: Colors.accent }}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={{ color: Colors.accent }}>Privacy Policy</Text>.
              </Text>
              <TouchableOpacity
                style={[styles.submitBtn, loading && { opacity: 0.7 }]}
                onPress={handleSignup}
                disabled={loading}
              >
                <Text style={styles.submitBtnText}>{loading ? 'Creating account...' : 'Create Account'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 24, flexGrow: 1 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 8 },
  brand: { alignItems: 'center', marginBottom: 32 },
  brandLogo: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  brandName: { fontSize: 26, fontWeight: '800', color: Colors.text },
  brandTagline: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
  tabRow: {
    flexDirection: 'row', backgroundColor: Colors.surfaceAlt,
    borderRadius: 12, padding: 4, marginBottom: 28,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: Colors.surface, shadowColor: Colors.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  tabTextActive: { color: Colors.text },
  form: { gap: 4 },
  field: { marginBottom: 16 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  input: { flex: 1, fontSize: 15, color: Colors.text },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 20, marginTop: 4 },
  forgotText: { fontSize: 13, color: Colors.accent, fontWeight: '600' },
  terms: { fontSize: 12, color: Colors.textMuted, lineHeight: 18, marginBottom: 20 },
  submitBtn: {
    backgroundColor: Colors.accent, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 4,
  },
  submitBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
