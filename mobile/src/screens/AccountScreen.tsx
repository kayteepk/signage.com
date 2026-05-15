import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const menuSections = [
  {
    title: 'Orders',
    items: [
      { icon: 'receipt-long',   label: 'My Orders',          subtitle: 'Track and manage your orders', route: 'Orders' },
      { icon: 'replay',         label: 'Reorder',             subtitle: 'Quickly repeat a past order' },
      { icon: 'local-shipping', label: 'Shipment Tracking',  subtitle: 'Live shipping updates' },
    ],
  },
  {
    title: 'Design & Files',
    items: [
      { icon: 'photo-library',  label: 'Saved Artwork',      subtitle: 'Manage uploaded design files' },
      { icon: 'palette',        label: 'Brand Colors',       subtitle: 'Save your brand palette' },
      { icon: 'text-fields',    label: 'Saved Templates',    subtitle: 'Reuse your custom designs' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: 'person',         label: 'Profile',            subtitle: 'Edit personal info' },
      { icon: 'business',       label: 'Company Details',    subtitle: 'Billing and company info' },
      { icon: 'location-on',    label: 'Saved Addresses',    subtitle: 'Manage shipping addresses' },
      { icon: 'credit-card',    label: 'Payment Methods',    subtitle: 'Saved cards and billing' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications',  label: 'Notifications',      subtitle: 'Manage alerts and updates' },
      { icon: 'language',       label: 'Language & Region',  subtitle: 'English (US)' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-outline',   label: 'Help Center',        subtitle: 'FAQs and how-to guides' },
      { icon: 'chat',           label: 'Live Chat',          subtitle: 'Chat with our design experts' },
      { icon: 'star-outline',   label: 'Rate the App',       subtitle: 'Leave a review on the App Store' },
    ],
  },
];

export default function AccountScreen({ navigation }: any) {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={s.root}>
        <View style={s.guestContainer}>
          <View style={s.guestIcon}>
            <MaterialIcons name="person-outline" size={52} color={Colors.textMuted} />
          </View>
          <Text style={s.guestTitle}>Sign in to your account</Text>
          <Text style={s.guestSub}>Track orders, save artwork, and manage your brand assets</Text>
          <TouchableOpacity style={s.signInBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={s.signInBtnText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.createBtn} onPress={() => navigation.navigate('Login', { tab: 'signup' })}>
            <Text style={s.createBtnText}>Create Account</Text>
          </TouchableOpacity>
          {/* Guest menu */}
          <View style={s.guestMenu}>
            {[
              { icon: 'help-outline', label: 'Help Center' },
              { icon: 'chat', label: 'Live Chat' },
            ].map((item, i) => (
              <TouchableOpacity key={i} style={s.guestMenuItem}>
                <MaterialIcons name={item.icon as any} size={20} color={Colors.text} />
                <Text style={s.guestMenuText}>{item.label}</Text>
                <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const initials = user!.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <SafeAreaView style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={s.profileCard}>
          <View style={s.avatarCircle}>
            <Text style={s.avatarText}>{initials}</Text>
          </View>
          <View style={s.profileInfo}>
            <Text style={s.profileName}>{user!.name}</Text>
            <Text style={s.profileEmail}>{user!.email}</Text>
            {user!.company && <Text style={s.profileCompany}>{user!.company}</Text>}
          </View>
          <TouchableOpacity style={s.editBtn}>
            <MaterialIcons name="edit" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          {[
            { label: 'Orders',       value: '3' },
            { label: 'Saved Files',  value: '12' },
            { label: 'Total Spent',  value: '$634' },
          ].map((stat, i) => (
            <View key={i} style={[s.statItem, i < 2 && s.statBorder]}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick actions */}
        <View style={s.quickRow}>
          {[
            { icon: 'receipt-long',   label: 'Orders',   route: 'Orders' },
            { icon: 'photo-library',  label: 'Artwork',  route: null },
            { icon: 'favorite-border',label: 'Wishlist', route: null },
            { icon: 'local-offer',    label: 'Promos',   route: null },
          ].map((q, i) => (
            <TouchableOpacity
              key={i}
              style={s.quickItem}
              onPress={() => q.route && navigation.navigate(q.route)}
            >
              <View style={s.quickIcon}>
                <MaterialIcons name={q.icon as any} size={22} color={Colors.primary} />
              </View>
              <Text style={s.quickLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu sections */}
        {menuSections.map(section => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            <View style={s.menuCard}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[s.menuItem, i < section.items.length - 1 && s.menuBorder]}
                  onPress={() => (item as any).route && navigation.navigate((item as any).route)}
                  activeOpacity={0.7}
                >
                  <View style={s.menuIconWrap}>
                    <MaterialIcons name={item.icon as any} size={19} color={Colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.menuLabel}>{item.label}</Text>
                    <Text style={s.menuSub}>{item.subtitle}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={19} color={Colors.textLight} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <View style={s.section}>
          <TouchableOpacity
            style={s.signOutBtn}
            onPress={() => Alert.alert('Sign out', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: logout },
            ])}
          >
            <MaterialIcons name="logout" size={18} color={Colors.error} />
            <Text style={s.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={s.version}>Signage v1.0.0</Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  guestContainer: { flex: 1, alignItems: 'center', padding: 32, paddingTop: 60 },
  guestIcon: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.border, justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  guestTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, textAlign: 'center' },
  guestSub: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  signInBtn: {
    backgroundColor: Colors.primary, borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 40, marginTop: 28, width: '100%', alignItems: 'center',
  },
  signInBtnText: { color: Colors.white, fontWeight: '800', fontSize: 16 },
  createBtn: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 40, marginTop: 10, width: '100%', alignItems: 'center',
    backgroundColor: Colors.white,
  },
  createBtnText: { color: Colors.text, fontWeight: '700', fontSize: 16 },
  guestMenu: { width: '100%', marginTop: 32, gap: 0 },
  guestMenuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14,
    backgroundColor: Colors.white, borderRadius: 10, marginBottom: 8,
    borderWidth: 1, borderColor: Colors.border,
  },
  guestMenuText: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.text },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.white, margin: 16, borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: Colors.border,
  },
  avatarCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '900', color: Colors.white },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '800', color: Colors.text },
  profileEmail: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  profileCompany: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  editBtn: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 1.5, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.white,
    marginHorizontal: 16, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: Colors.border,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statBorder: { borderRightWidth: 1, borderRightColor: Colors.border },
  statValue: { fontSize: 22, fontWeight: '900', color: Colors.text },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  quickRow: {
    flexDirection: 'row', marginHorizontal: 16, marginTop: 12, gap: 10,
  },
  quickItem: { flex: 1, alignItems: 'center', gap: 6 },
  quickIcon: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  quickLabel: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: Colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8,
  },
  menuCard: {
    backgroundColor: Colors.white, borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { fontSize: 14, fontWeight: '600', color: Colors.text },
  menuSub: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 14,
    borderWidth: 1.5, borderColor: '#FECDD3',
  },
  signOutText: { fontSize: 15, fontWeight: '700', color: Colors.error },
  version: { fontSize: 12, color: Colors.textLight, textAlign: 'center', marginTop: 12 },
});
