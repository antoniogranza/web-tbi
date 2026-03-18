// src/composables/useAdminTable.js
// Place this file at:  src/composables/useAdminTable.js
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

export function useAdminTable(tableName) {
  const records = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const deleting = ref(false)
  const apiError = ref('')

  async function fetchAll(tbiFilter = null) {
    loading.value = true
    apiError.value = ''
    try {
      let query = supabase.from(tableName).select('*').order('created_at', { ascending: false })
      if (tbiFilter) query = query.eq('tbi_id', tbiFilter)
      const { data, error } = await query
      if (error) throw error
      records.value = data ?? []
    } catch (err) {
      apiError.value = err.message || 'Failed to load records.'
      console.error(`[${tableName}] fetchAll:`, err)
    } finally {
      loading.value = false
    }
  }

  async function insertRecord(payload) {
    saving.value = true
    apiError.value = ''
    try {
      const { data, error } = await supabase.from(tableName).insert([payload]).select().single()
      if (error) throw error
      records.value = [data, ...records.value]
      return { success: true, data }
    } catch (err) {
      apiError.value = err.message || 'Failed to save.'
      console.error(`[${tableName}] insertRecord:`, err)
      return { success: false, error: err }
    } finally {
      saving.value = false
    }
  }

  async function updateRecord(id, payload) {
    saving.value = true
    apiError.value = ''
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(payload)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      const idx = records.value.findIndex((r) => r.id === id)
      if (idx !== -1) records.value[idx] = data
      return { success: true, data }
    } catch (err) {
      apiError.value = err.message || 'Failed to update.'
      console.error(`[${tableName}] updateRecord:`, err)
      return { success: false, error: err }
    } finally {
      saving.value = false
    }
  }

  async function deleteRecord(id) {
    deleting.value = true
    apiError.value = ''
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', id)
      if (error) throw error
      records.value = records.value.filter((r) => r.id !== id)
      return { success: true }
    } catch (err) {
      apiError.value = err.message || 'Failed to delete.'
      console.error(`[${tableName}] deleteRecord:`, err)
      return { success: false, error: err }
    } finally {
      deleting.value = false
    }
  }

  const isEmpty = computed(() => !loading.value && records.value.length === 0)

  return {
    records,
    loading,
    saving,
    deleting,
    apiError,
    isEmpty,
    fetchAll,
    insertRecord,
    updateRecord,
    deleteRecord,
  }
}
