import { ref, computed } from 'vue'

export function useAdminDashboardFilters({ activeSection, activeTable }) {
  const searchQuery = ref('')
  const tbiFilter = ref('')
  const statusFilter = ref('All')

  const activeStatusItems = computed(() => {
    if (activeSection.value === 'events') return ['All', 'upcoming', 'past', 'draft']
    if (activeSection.value === 'incubatees') return ['All', 'active', 'draft', 'graduated']
    if (activeSection.value === 'mentors') return ['All', 'active', 'draft', 'archived']
    return ['All', 'active', 'draft']
  })

  const filteredRecords = computed(() => {
    let list = activeTable.value.records.value
    if (statusFilter.value !== 'All') list = list.filter((r) => r.status === statusFilter.value)
    return list
  })

  return {
    searchQuery,
    tbiFilter,
    statusFilter,
    activeStatusItems,
    filteredRecords,
  }
}
