import React, { useState } from 'react';
import {
  View, Text, TextInput, TextInputProps, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import SignageLogo from '../components/SignageLogo';

type Tab = 'login' | 'signup';

export default function LoginScreen({ navigation, route }: any) {
  const initialTab: Tab = route?.params?.tab === 'signup' ? 'signup' : 'login';
  const [tab,     setTab]     = useState<Tab>(initialTab);
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({ firstName: '', lastName: '', email: '', company: '', password: '', confirmPassword: '' });

  const { login: doLogin, signup: doSignup } = useAuth();

  const handleLogin = async () => {
    if (!login.email || !login.password) { Alert.alert('Please fill in all fields.'); return; }
    setLoading(true);
    const ok = await doLogin(login.email, login.password);
    setLoading(false);
    if (ok) navigation.goBack();
  };

  const handleSignup = async () => {
    if (!signup.firstName || !signup.email || !signup.password) { Alert.alert('Please fill in all required fields.'); return; }
    if (signup.password !== signup.confirmPassword) { Alert.alert('Passwords do not match.'); return; }
    if (signup.password.length < 8) { Alert.alert('Password must be at least 8 characters.'); return; }
    setLoading(true);
    const ok = await doSignup(`${signup.firstName} ${signup.lastName}`, signup.email, signup.password, signup.company);
    setLoading(false);
    if (ok) navigation.goBack();
  };

  return (
    <SafeAreaView style={s.root}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={s.closeBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="close" size={22} color={Colors.text} />
          </TouchableOpacity>

          {/* Logo */}
          <View style={s.brand}>
            <SignageLogo size="lg" />
            <Text style={s.brandSub}>Your custom signage, on demand</Text>
          </View>

          {/* Tab switcher */}
          <View style={s.tabs}>
            <TouchableOpacity style={[s.tab, tab === 'login' && s.tabActive]} onPress={() => setTab('login')}>
              <Text style={[s.tabText, tab === 'login' && s.tabTextActive]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.tab, tab === 'signup' && s.tabActive]} onPress={() => setTab('signup')}>
              <Text style={[s.tabText, tab === 'signup' && s.tabTextActive]}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {tab === 'login' ? (
            <View style={s.form}>
              <Field label="Email" icon="email" placeholder="you@example.com"
                keyboardType="email-address" autoCapitalize="none"
                value={login.email} onChangeText={v => setLogin(f => ({ ...f, email: v }))} />
              <Field label="Password" icon="lock" placeholder="Enter your password"
                secureTextEntry={!showPw}
                suffix={<TouchableOpacity onPress={() => setShowPw(v => !v)}>
                  <MaterialIcons name={showPw ? 'visibility-off' : 'visibility'} size={18} color={Colors.textMuted} />
                </TouchableOpacity>}
                value={login.password} onChangeText={v => setLogin(f => ({ ...f, password: v }))} />
              <TouchableOpacity style={s.forgotBtn}>
                <Text style={s.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.submitBtn, loading && s.submitBtnDisabled]} onPress={handleLogin} disabled={loading}>
                <Text style={s.submitBtnText}>{loading ? 'Signing in…' : 'Sign In'}</Text>
              </TouchableOpacity>
              <Divider />
              <SocialBtn icon="mail" label="Continue with Google" onPress={() => {}} />
              <SocialBtn icon="phone-iphone" label="Continue with Apple" onPress={() => {}} />
            </View>
          ) : (
            <View style={s.form}>
              <View style={s.nameRow}>
                <View style={{ flex: 1 }}>
                  <Field label="First Name *" icon="person" placeholder="John"
                    value={signup.firstName} onChangeText={v => setSignup(f => ({ ...f, firstName: v }))} />
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="Last Name" icon="person-outline" placeholder="Smith"
                    value={signup.lastName} onChangeText={v => setSignup(f => ({ ...f, lastName: v }))} />
                </View>
              </View>
              <Field label="Email *" icon="email" placeholder="you@example.com"
                keyboardType="email-address" autoCapitalize="none"
                value={signup.email} onChangeText={v => setSignup(f => ({ ...f, email: v }))} />
              <Field label="Company" icon="business" placeholder="Acme Corp (optional)"
                value={signup.company} onChangeText={v => setSignup(f => ({ ...f, company: v }))} />
              <Field label="Password *" icon="lock" placeholder="Min. 8 characters"
                secureTextEntry={!showPw}
                suffix={<TouchableOpacity onPress={() => setShowPw(v => !v)}>
                  <MaterialIcons name={showPw ? 'visibility-off' : 'visibility'} size={18} color={Colors.textMuted} />
                </TouchableOpacity>}
                value={signup.password} onChangeText={v => setSignup(f => ({ ...f, password: v }))} />
              <Field label="Confirm Password *" icon="lock-outline" placeholder="Repeat password"
                secureTextEntry={!showPw}
                value={signup.confirmPassword} onChangeText={v => setSignup(f => ({ ...f, confirmPassword: v }))} />

              {/* Password strength */}
              {signup.password.length > 0 && (
                <PasswordStrength pw={signup.password} />
              )}

              <Text style={s.terms}>
                By creating an account you agree to our{' '}
                <Text style={s.termsLink}>Terms of Service</Text> and{' '}
                <Text style={s.termsLink}>Privacy Policy</Text>.
              </Text>

              <TouchableOpacity style={[s.submitBtn, loading && s.submitBtnDisabled]} onPress={handleSignup} disabled={loading}>
                <Text style={s.submitBtnText}>{loading ? 'Creating account…' : 'Create Account'}</Text>
              </TouchableOpacity>
              <Divider />
              <SocialBtn icon="mail" label="Sign up with Google" onPress={() => {}} />
              <SocialBtn icon="phone-iphone" label="Sign up with Apple" onPress={() => {}} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type FieldProps = TextInputProps & {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  suffix?: React.ReactNode;
};

function Field({ label, icon, suffix, ...props }: FieldProps) {
  return (
    <View style={s.field}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.inputWrap}>
        <MaterialIcons name={icon} size={18} color={Colors.textMuted} />
        <TextInput style={s.input} placeholderTextColor={Colors.textMuted} {...props} />
        {suffix}
      </View>
    </View>
  );
}

function Divider() {
  return (
    <View style={s.divRow}>
      <View style={s.divLine} /><Text style={s.divText}>or</Text><View style={s.divLine} />
    </View>
  );
}

function SocialBtn({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={s.socialBtn} onPress={onPress}>
      <MaterialIcons name={icon} size={20} color={Colors.text} />
      <Text style={s.socialBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function PasswordStrength({ pw }: { pw: string }) {
  const checks = [pw.length >= 8, /[A-Z]/.test(pw), /[0-9]/.test(pw), /[^A-Za-z0-9]/.test(pw)];
  const score = checks.filter(Boolean).length;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = [Colors.error, Colors.warning, Colors.starYellow, Colors.success];
  return (
    <View style={s.strengthWrap}>
      <View style={s.strengthBars}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[s.strengthBar, i < score && { backgroundColor: colors[score - 1] }]} />
        ))}
      </View>
      <Text style={[s.strengthLabel, { color: colors[score - 1] ?? Colors.textMuted }]}>
        {score > 0 ? labels[score - 1] : ''}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  scroll: { padding: 24, flexGrow: 1 },
  closeBtn: { alignSelf: 'flex-start', marginBottom: 4, padding: 4 },
  brand: { alignItems: 'center', marginTop: 8, marginBottom: 28, gap: 10 },
  brandSub: { fontSize: 14, color: Colors.textMuted },
  tabs: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    borderRadius: 12, padding: 4, marginBottom: 28,
  },
  tab: { flex: 1, paddingVertical: 11, alignItems: 'center', borderRadius: 9 },
  tabActive: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  tabTextActive: { color: Colors.text, fontWeight: '700' },
  form: { gap: 6 },
  nameRow: { flexDirection: 'row', gap: 12 },
  field: { marginBottom: 12 },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary, marginBottom: 8 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  input: { flex: 1, fontSize: 15, color: Colors.text },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 8, marginTop: 2 },
  forgotText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  terms: { fontSize: 12, color: Colors.textMuted, lineHeight: 18, marginBottom: 8 },
  termsLink: { color: Colors.primary, fontWeight: '600' },
  submitBtn: {
    backgroundColor: Colors.primary, borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 4,
  },
  submitBtnDisabled: { opacity: 0.65 },
  submitBtnText: { color: Colors.white, fontSize: 16, fontWeight: '800' },
  divRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  divText: { fontSize: 13, color: Colors.textMuted },
  socialBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12,
    paddingVertical: 13, marginBottom: 10,
    backgroundColor: Colors.white,
  },
  socialBtnText: { fontSize: 14, fontWeight: '700', color: Colors.text },
  strengthWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: -4 },
  strengthBars: { flex: 1, flexDirection: 'row', gap: 4 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: Colors.border },
  strengthLabel: { fontSize: 12, fontWeight: '700', width: 50, textAlign: 'right' },
});
