import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export function useFaqs() {
  const faqs = ref([])

  async function loadFaqs() {
    const { data, error } = await supabase
      .from('faqs')
      .select('id, question, answer, status, sort_order')
      .eq('status', 'active')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      faqs.value = []
      return
    }

    faqs.value = data.map((item) => ({
      q: item.question || 'Untitled question',
      a: item.answer || '',
    }))
  }

  return {
    faqs,
    loadFaqs,
  }
}
