// src/composables/useAdminTable.js
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export function useAdminTable(tableName) {
  const records = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const deleting = ref(false)
  const apiError = ref('')

  async function fetchAll(tbiId = null) {
    loading.value = true
    apiError.value = ''
    let query = supabase.from(tableName).select('*').order('created_at', { ascending: false })
    if (tbiId) query = query.eq('tbi_id', tbiId)
    const { data, error } = await query
    loading.value = false
    if (error) {
      apiError.value = error.message
      return
    }
    records.value = data ?? []
  }

  async function insertRecord(payload) {
    saving.value = true
    const { data, error } = await supabase.from(tableName).insert(payload).select().single()
    saving.value = false
    if (error) return { success: false, error }
    records.value.unshift(data)
    return { success: true, data }
  }

  async function updateRecord(id, payload) {
    saving.value = true
    const { data, error } = await supabase
      .from(tableName)
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    saving.value = false
    if (error) return { success: false, error }
    const idx = records.value.findIndex((r) => r.id === id)
    if (idx !== -1) records.value[idx] = data
    return { success: true, data }
  }

  async function deleteRecord(id) {
    deleting.value = true
    const { error } = await supabase.from(tableName).delete().eq('id', id)
    deleting.value = false
    if (error) return { success: false, error }
    records.value = records.value.filter((r) => r.id !== id)
    return { success: true }
  }

  return {
    records,
    loading,
    saving,
    deleting,
    apiError,
    fetchAll,
    insertRecord,
    updateRecord,
    deleteRecord,
  }
}
