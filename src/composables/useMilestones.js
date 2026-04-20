import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export function useMilestones() {
  const milestones = ref([])

  async function loadMilestones() {
    const { data, error } = await supabase
      .from('milestones')
      .select('id, label, value, desc, icon, color, status, sort_order, tbi_id')
      .eq('status', 'active')
      .eq('tbi_id', 'navigatu')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      milestones.value = []
      return
    }

    milestones.value = data.map((item) => ({
      label: item.label || 'Untitled',
      value: item.value || '',
      desc: item.desc || '',
      icon: item.icon || 'mdi-trophy-outline',
      color: item.color || '#1565C0',
    }))
  }

  return {
    milestones,
    loadMilestones,
  }
}
