import { computed } from 'vue'

export function useAdminDashboardMeta({
  activeSection,
  incubateesTable,
  newsTable,
  eventsTable,
  mentorsTable,
}) {
  const tbiOptions = [
    {
      id: 'navigatu',
      name: 'Navigatú TBI',
      shortName: 'NAV',
      color: '#1565C0',
      sub: 'Technology Business Incubator',
    },
    {
      id: 'tara',
      name: 'TARA ATBI',
      shortName: 'TARA',
      color: '#2E7D32',
      sub: 'Agri Technology Business Incubator',
    },
    {
      id: 'csutbi',
      name: 'CSU TBI',
      shortName: 'CSU',
      color: '#B71C1C',
      sub: 'Caraga State University TBI',
    },
  ]

  const categories = [
    {
      id: 'incubatees',
      name: 'Incubatees',
      singular: 'Incubatee',
      icon: 'mdi-rocket-launch-outline',
      color: '#1565C0',
      btnColor: 'primary',
      desc: 'Add, edit, and manage startup incubatees. Assign each to the TBI where it belongs.',
    },
    {
      id: 'news',
      name: 'News',
      singular: 'News Article',
      icon: 'mdi-newspaper-variant-outline',
      color: '#2E7D32',
      btnColor: 'success',
      desc: 'Publish news and announcements. Choose which TBI portal shows the article.',
    },
    {
      id: 'events',
      name: 'Events',
      singular: 'Event',
      icon: 'mdi-calendar-star-outline',
      color: '#E65100',
      btnColor: 'warning',
      desc: 'Create events and assign them to the correct TBI portal for display.',
    },
    {
      id: 'mentors',
      name: 'Mentors',
      singular: 'Mentor',
      icon: 'mdi-account-tie-outline',
      color: '#6A1B9A',
      btnColor: 'secondary',
      desc: 'Add, edit, archive, and delete mentor profiles for each TBI portal.',
    },
  ]

  const activeCategory = computed(() => categories.find((c) => c.id === activeSection.value))
  const activeCategoryName = computed(() => activeCategory.value?.name || 'Dashboard')
  const activeSingular = computed(() => activeCategory.value?.singular || '')
  const activeCategoryIcon = computed(
    () => activeCategory.value?.icon || 'mdi-view-dashboard-outline',
  )
  const activeCategoryColor = computed(() => activeCategory.value?.color || '#1565C0')
  const activeCategoryBtnColor = computed(() => activeCategory.value?.btnColor || 'primary')
  const appBarTitle = computed(() =>
    activeSection.value === 'home' ? 'Dashboard' : activeCategoryName.value,
  )

  const dashStats = computed(() => [
    {
      label: 'Total Incubatees',
      value: incubateesTable.records.value.length || '—',
      icon: 'mdi-rocket-launch-outline',
      color: '#1565C0',
      iconBg: '#E3F2FD',
      section: 'incubatees',
    },
    {
      label: 'Published News',
      value: newsTable.records.value.filter((n) => n.status === 'active').length || '—',
      icon: 'mdi-newspaper-variant-outline',
      color: '#2E7D32',
      iconBg: '#E8F5E9',
      section: 'news',
    },
    {
      label: 'Upcoming Events',
      value: eventsTable.records.value.filter((e) => e.status === 'upcoming').length || '—',
      icon: 'mdi-calendar-star-outline',
      color: '#E65100',
      iconBg: '#FFF3E0',
      section: 'events',
    },
    {
      label: 'Active Mentors',
      value: mentorsTable.records.value.filter((m) => m.status === 'active').length || '—',
      icon: 'mdi-account-tie-outline',
      color: '#6A1B9A',
      iconBg: '#F3E5F5',
      section: 'mentors',
    },
  ])

  const todayLabel = computed(() =>
    new Date().toLocaleDateString('en-PH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )

  const activeHeaders = computed(() => {
    if (activeSection.value === 'incubatees') {
      return [
        { title: '', key: 'thumb', sortable: false, width: '52px' },
        { title: 'Startup Name', key: 'name', sortable: true },
        { title: 'TBI', key: 'tbi_id', sortable: true },
        { title: 'Category', key: 'category', sortable: true },
        { title: 'Location', key: 'location', sortable: false },
        { title: 'Year', key: 'year_founded', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false },
      ]
    }

    if (activeSection.value === 'news') {
      return [
        { title: '', key: 'thumb', sortable: false, width: '52px' },
        { title: 'Title', key: 'title', sortable: true },
        { title: 'TBI', key: 'tbi_id', sortable: true },
        { title: 'Category', key: 'category', sortable: true },
        { title: 'Date', key: 'date', sortable: true },
        { title: 'Author', key: 'author', sortable: false },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false },
      ]
    }

    if (activeSection.value === 'mentors') {
      return [
        { title: '', key: 'thumb', sortable: false, width: '52px' },
        { title: 'Mentor Name', key: 'name', sortable: true },
        { title: 'TBI', key: 'tbi_id', sortable: true },
        { title: 'Role', key: 'role', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false },
      ]
    }

    return [
      { title: '', key: 'thumb', sortable: false, width: '52px' },
      { title: 'Title', key: 'title', sortable: true },
      { title: 'TBI', key: 'tbi_id', sortable: true },
      { title: 'Type', key: 'type', sortable: true },
      { title: 'Date', key: 'event_date', sortable: false },
      { title: 'Location', key: 'location', sortable: false },
      { title: 'Status', key: 'status', sortable: true },
      { title: 'Actions', key: 'actions', sortable: false },
    ]
  })

  const tbiShortName = (id) => tbiOptions.find((t) => t.id === id)?.shortName || id
  const tbiChipColor = (id) =>
    ({ navigatu: 'primary', tara: 'success', csutbi: 'error' })[id] || 'default'
  const statusChipColor = (s) =>
    ({
      active: 'success',
      draft: 'warning',
      graduated: 'info',
      upcoming: 'success',
      past: 'secondary',
      archived: 'secondary',
    })[s] || 'default'

  return {
    tbiOptions,
    categories,
    activeCategory,
    activeCategoryName,
    activeSingular,
    activeCategoryIcon,
    activeCategoryColor,
    activeCategoryBtnColor,
    appBarTitle,
    dashStats,
    todayLabel,
    activeHeaders,
    tbiShortName,
    tbiChipColor,
    statusChipColor,
  }
}
