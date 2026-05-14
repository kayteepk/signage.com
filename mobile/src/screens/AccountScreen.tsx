import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

interface MenuItem {
  icon: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  danger?: boolean;
}

export default function AccountScreen({ navigation }: any) {
  const { user, isAuthenticated, logout } = useAuth();

  const sections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Account',
      items: [
        { icon: 'person', label: 'Profile', subtitle: 'Edit your personal info' },
        { icon: 'business', label: 'Company', subtitle: user?.company || 'Add company details' },
        { icon: 'notifications', label: 'Notifications', subtitle: 'Manage alerts and updates' },
      ],
    },
    {
      title: 'Orders',
      items: [
        { icon: 'receipt-long', label: 'Order History', onPress: () => navigation.navigate('Orders') },
        { icon: 'local-shipping', label: 'Track Shipment', subtitle: 'View active shipments' },
        { icon: 'replay', label: 'Reorder', subtitle: 'Quickly repeat past orders' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'palette', label: 'Brand Colors', subtitle: 'Save your brand palette' },
        { icon: 'photo-library', label: 'Saved Artwork', subtitle: 'Manage uploaded files' },
        { icon: 'location-on', label: 'Saved Addresses', subtitle: 'Manage shipping addresses' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-outline', label: 'Help Center', subtitle: 'FAQs and guides' },
        { icon: 'chat', label: 'Live Chat', subtitle: 'Chat with our design team' },
        { icon: 'star-outline', label: 'Rate the App', subtitle: 'Leave us a review' },
      ],
    },
  ];

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.guestState}>
          <View style={styles.guestAvatar}>
            <MaterialIcons name="person" size={48} color={Colors.textMuted} />
          </View>
          <Text style={styles.guestTitle}>Sign in to your account</Text>
          <Text style={styles.guestSubtitle}>
            Track orders, save artwork, and manage your signage projects
          </Text>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.signInBtnText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => navigation.navigate('Login', { tab: 'signup' })}
          >
            <Text style={styles.signUpBtnText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {user!.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user!.name}</Text>
            <Text style={styles.profileEmail}>{user!.email}</Text>
            {user!.company && <Text style={styles.profileCompany}>{user!.company}</Text>}
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <MaterialIcons name="edit" size={18} color={Colors.accent} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Orders', value: '3' },
            { label: 'Saved Files', value: '12' },
            { label: 'Spent', value: '$255' },
          ].map((stat, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {sections.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.menuItem, i < section.items.length - 1 && styles.menuItemBorder]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuIcon, item.danger && { backgroundColor: Colors.error + '15' }]}>
                    <MaterialIcons
                      name={item.icon as any}
                      size={20}
                      color={item.danger ? Colors.error : Colors.accent}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.menuLabel, item.danger && { color: Colors.error }]}>
                      {item.label}
                    </Text>
                    {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={() => Alert.alert('Sign out', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: logout },
            ])}
          >
            <MaterialIcons name="logout" size={18} color={Colors.error} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  guestState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  guestAvatar: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  guestTitle: { fontSize: 22, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  guestSubtitle: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  signInBtn: {
    backgroundColor: Colors.accent, borderRadius: 14,
    paddingVertical: 14, paddingHorizontal: 40,
    marginTop: 28, width: '100%', alignItems: 'center',
  },
  signInBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  signUpBtn: {
    backgroundColor: Colors.surface, borderRadius: 14,
    paddingVertical: 14, paddingHorizontal: 40,
    marginTop: 10, width: '100%', alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border,
  },
  signUpBtnText: { color: Colors.text, fontWeight: '700', fontSize: 16 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.primary, padding: 20, margin: 20, borderRadius: 16,
  },
  avatarCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: Colors.white },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: '700', color: Colors.white },
  profileEmail: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  profileCompany: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  editBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    marginHorizontal: 20, borderRadius: 12, padding: 16,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  section: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  menuCard: {
    backgroundColor: Colors.surface, borderRadius: 12,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    overflow: 'hidden',
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.accent + '15',
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { fontSize: 15, fontWeight: '600', color: Colors.text },
  menuSubtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 1 },
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.surface, borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1.5, borderColor: Colors.error + '40',
  },
  signOutText: { fontSize: 15, fontWeight: '700', color: Colors.error },
});
