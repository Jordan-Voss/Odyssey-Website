import { useEffect, useState } from 'react';
import { Stack, usePathname } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/context/ThemeContext';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function AdminLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }
    checkAuth();
  }, [pathname]);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin/login');
        return;
      }

      // Verify admin status
      const { data: profile } = await supabase
        .from('admin_users')
        .select('id')  // Just select id
        .eq('user_id', session.user.id)
        .single();

      if (!profile) {
        await supabase.auth.signOut();
        router.replace('/admin/login');
        return;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.replace('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack
          screenOptions={{ 
            headerShown: false,
          }}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
