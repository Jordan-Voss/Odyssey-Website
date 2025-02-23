import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <div className="container">
      <ThemedText style={styles.title}>Admin Dashboard</ThemedText>
      
      <div className="grid">
        <Link href="/admin/coaches" className="card">
          <ThemedText style={styles.cardTitle}>Manage Coaches</ThemedText>
          <ThemedText>Add, edit, or remove coaches</ThemedText>
        </Link>

        <Link href="/admin/theme" className="card">
          <ThemedText style={styles.cardTitle}>Theme Settings</ThemedText>
          <ThemedText>Customize website appearance</ThemedText>
        </Link>
      </div>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.buttonText}>Logout</ThemedText>
      </TouchableOpacity>
    </div>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    maxWidth: 200,
  },
  buttonText: {
    color: '#FFFFFF',
  },
}); 