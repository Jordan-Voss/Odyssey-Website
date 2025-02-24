import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@/config/env';
import { CoachDetail } from '@/types/coach';

// Add logging to verify configuration
console.log('Supabase URL:', SUPABASE_URL?.slice(0, 20) + '...');  // Don't log full URL
console.log('Supabase Key exists:', !!SUPABASE_KEY);

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Add function to create bucket if it doesn't exist
async function ensureBucketExists() {
  const { data: buckets } = await supabase.storage.listBuckets();
  
  if (!buckets?.find(b => b.name === 'Odyssey')) {
    const { error } = await supabase.storage.createBucket('Odyssey', {
      public: false,
      allowedMimeTypes: ['image/png', 'image/jpeg']
    });
    if (error) console.error('Error creating bucket:', error);
  }
}

// Simple function to get signed URL
export async function getImageUrl(filename: string) {
  if (!filename) return null;
  
  console.log('Getting signed URL for:', filename);
  
  const { data, error } = await supabase.storage
    .from('Odyssey')
    .createSignedUrl(filename, 3600); // 1 hour expiry

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }

  console.log('Signed URL:', data.signedUrl);
  return data.signedUrl;
}

// Load coach images
export async function loadCoachImages(coaches: CoachDetail[]) {
  const urls: Record<string, string> = {};
  
  for (const coach of coaches) {
    if (coach.image_url) {
      const publicUrl = getPublicUrl(coach.image_url);
      if (publicUrl) {
        urls[coach.id] = publicUrl;
      }
    }
  }
  
  return urls;
}

// Keep getSignedUrl for admin functions
export async function getSignedUrl(fullPath: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return getImageUrl(fullPath); // Fallback to image URL
  }

  const filename = fullPath.split('/').pop() || '';
  console.log('Getting signed URL for:', filename);
  
  const { data, error } = await supabase.storage
    .from('Odyssey')
    .createSignedUrl(filename, 3600);
  console.log('Signed URL:', data?.signedUrl);
  if (error) {
    console.error('Error getting signed URL:', error);
    return getImageUrl(fullPath); // Fallback to image URL
  }
  
  return data?.signedUrl;
}

export function getPublicUrl(filename: string) {
  if (!filename) return null;
  
  const { data } = supabase.storage
    .from('Odyssey')
    .getPublicUrl(filename);
    
  return data.publicUrl;
}

// Add this function to handle coach updates
export async function updateCoach(coach: CoachDetail) {
  console.log('Starting coach update for ID:', coach.id);

  try {
    // Prepare all fields for update
    const updateData = {
      name: coach.name,
      role: coach.role,
      bio: coach.bio,
      image_url: coach.image_url,
      qualifications: coach.qualifications,
      social_links: coach.social_links,
      full_bio: coach.full_bio,
      achievements: coach.achievements,
      images: coach.images,
      show: coach.show,
      order_index: coach.order_index,
      updated_at: new Date().toISOString()
    };

    // Perform the update
    const { error } = await supabase
      .from('coaches')
      .update(updateData)
      .eq('id', coach.id);

    if (error) {
      console.error('Update error:', error);
      throw error;
    }

    // Verify and return the updated record
    const { data: verified, error: fetchError } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', coach.id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    console.log('Update successful:', verified);
    return verified;

  } catch (error) {
    console.error('Error in updateCoach:', error);
    throw error;
  }
}

// Update the connection test function
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id');  // Just select id instead of count(*)
    
    console.log('Supabase connection test:', {
      success: !error,
      data,
      error: error?.message,
      count: data?.length || 0
    });
    
    return !error;
  } catch (e) {
    console.error('Connection test failed:', e);
    return false;
  }
}

// Call this when app starts
testConnection().then(success => {
  console.log('Initial connection test:', success);
}); 