import { migrateThemes } from '@/lib/supabase';

migrateThemes().then(() => {
  console.log('Migration complete');
  process.exit(0);
}).catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
}); 