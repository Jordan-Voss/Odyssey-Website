function handleAddNew() {
  const newCoach = {
    name: '',
    images: [],
    show: true,
    order_index: coaches.length,
    full_bio: {
      intro: '',
      background: '',
      present: ''
    },
    achievements: [],
    role: '',
    bio: '',
    image_url: '',
    qualifications: [],
    social_links: {}
  };
  setEditingCoach(newCoach as CoachDetail);
}

async function handleSave(coach: Partial<CoachDetail>) {
  try {
    // For new coaches
    if (!coach.id) {
      const newCoachData = {
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('coaches')
        .insert(newCoachData)
        .select()
        .single();
      
      if (error) {
        console.error('Insert error:', error);
        throw error;
      }
      console.log('Created new coach:', data);
    } else {
      await updateCoach(coach as CoachDetail);
    }
    
    await fetchAllCoaches();
    setEditingCoach(null);
  } catch (error) {
    console.error('Error saving coach:', error);
  }
} 