import { ref, reactive, computed } from 'vue'
import { supabase } from '@/utils/supabase'

export function useAdminDashboardMedia({ form, formError }) {
  const uploadProgress = reactive({})
  const pendingGalleryIndex = ref(0)
  const pendingAchievementIndex = ref(0)
  const pendingTeamIndex = ref(0)
  const pendingTestimonialIndex = ref(0)

  const logoFileInput = ref(null)
  const galleryFileInput = ref(null)
  const achievementFileInput = ref(null)
  const teamFileInput = ref(null)
  const testimonialFileInput = ref(null)
  const eventImageFileInput = ref(null)
  const newsImageFileInput = ref(null)
  const mentorPhotoFileInput = ref(null)

  const currentUploads = computed(() => {
    const uploads = []
    if (form.logo) {
      uploads.push({ key: 'logo', url: form.logo, label: 'Logo' })
    }
    form.gallery.forEach((url, index) => {
      if (url) {
        uploads.push({ key: `gallery_${index}`, url, label: `Gallery ${index + 1}` })
      }
    })
    return uploads
  })

  function removeUpload(key) {
    if (key === 'logo') {
      form.logo = ''
      form.logoPreview = null
    } else if (key.startsWith('gallery_')) {
      const index = parseInt(key.split('_')[1])
      form.gallery[index] = ''
      form.galleryPreviews[index] = null
    }
  }

  const achievementPhotos = computed(() => {
    return form.achievements
      .map((ach, index) => {
        if (ach.photo) {
          return {
            key: `achievement_${index}`,
            url: ach.photo,
            label: ach.title || `Achievement ${index + 1}`,
            index,
          }
        }
        return null
      })
      .filter(Boolean)
  })

  function removeAchievementPhoto(index) {
    form.achievements[index].photo = ''
    form.achievements[index].photoPreview = null
  }

  function setFormError(message) {
    if (formError && 'value' in formError) {
      formError.value = message
    }
  }

  async function uploadToSupabase(file, bucket, folder, progressKey) {
    if (!file) return null

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      setFormError('Your session expired. Please log in again before uploading files.')
      uploadProgress[progressKey] = 0
      return null
    }

    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      setFormError(`File "${file.name}" exceeds 5MB limit.`)
      return null
    }

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const filePath = `${folder}/${fileName}`

    uploadProgress[progressKey] = 10

    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

    if (error) {
      const deniedByPolicy =
        error.message?.toLowerCase().includes('row-level security') ||
        error.message?.toLowerCase().includes('not allowed') ||
        error.statusCode === '403'

      const policyHint = deniedByPolicy
        ? ` Check Supabase Storage INSERT policy for bucket "${bucket}" and path "${folder}/*".`
        : ''

      setFormError(`Upload failed: ${error.message}${policyHint}`)
      uploadProgress[progressKey] = 0
      return null
    }

    uploadProgress[progressKey] = 90
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

    uploadProgress[progressKey] = 100
    setTimeout(() => {
      uploadProgress[progressKey] = 0
    }, 1200)

    return urlData?.publicUrl || null
  }

  async function handleFileUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    form.logoPreview = URL.createObjectURL(file)
    const url = await uploadToSupabase(file, 'incubatees', 'logos', 'logo')
    if (url) form.logo = url
    event.target.value = ''
  }

  function openGalleryUpload(index) {
    pendingGalleryIndex.value = index
    galleryFileInput.value?.click()
  }

  async function handleGalleryUpload(event, index) {
    const file = event.target.files?.[0]
    if (!file) return
    form.galleryPreviews[index] = URL.createObjectURL(file)
    const key = `gallery_${index}`
    const url = await uploadToSupabase(file, 'incubatees', 'gallery', key)
    if (url) form.gallery[index] = url
    event.target.value = ''
  }

  function openAchievementUpload(index) {
    pendingAchievementIndex.value = index
    achievementFileInput.value?.click()
  }

  async function handleAchievementPhotoUpload(event, index) {
    const file = event.target.files?.[0]
    if (!file) return
    form.achievements[index].photoPreview = URL.createObjectURL(file)
    const key = `achievement_${index}`
    const url = await uploadToSupabase(file, 'incubatees', 'achievements', key)
    if (url) form.achievements[index].photo = url
    event.target.value = ''
  }

  function openTeamUpload(index) {
    pendingTeamIndex.value = index
    teamFileInput.value?.click()
  }

  async function handleTeamPhotoUpload(event, index) {
    const file = event.target.files?.[0]
    if (!file) return
    form.team[index].photoPreview = URL.createObjectURL(file)
    const key = `team_${index}`
    const url = await uploadToSupabase(file, 'incubatees', 'team', key)
    if (url) form.team[index].photo = url
    event.target.value = ''
  }

  function openTestimonialUpload(index) {
    pendingTestimonialIndex.value = index
    testimonialFileInput.value?.click()
  }

  async function handleTestimonialPhotoUpload(event, index) {
    const file = event.target.files?.[0]
    if (!file) return
    form.testimonials[index].photoPreview = URL.createObjectURL(file)
    const key = `testimonial_${index}`
    const url = await uploadToSupabase(file, 'incubatees', 'testimonials', key)
    if (url) form.testimonials[index].photo = url
    event.target.value = ''
  }

  async function handleEventImageUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    form.eventImagePreview = URL.createObjectURL(file)
    const url = await uploadToSupabase(file, 'events', 'banners', 'event_image')
    if (url) form.image_event = url
    event.target.value = ''
  }

  async function handleNewsImageUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    form.newsImagePreview = URL.createObjectURL(file)
    const url = await uploadToSupabase(file, 'news', 'covers', 'news_image')
    if (url) form.image = url
    event.target.value = ''
  }

  async function handleMentorPhotoUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    form.mentorPhotoPreview = URL.createObjectURL(file)
    const url = await uploadToSupabase(file, 'mentors', 'photos', 'mentor_photo')
    if (url) form.photo = url
    event.target.value = ''
  }

  function clearNewsImage() {
    form.newsImagePreview = null
    form.image = ''
  }

  function clearEventImage() {
    form.eventImagePreview = null
    form.image_event = ''
  }

  function clearMentorPhoto() {
    form.mentorPhotoPreview = null
    form.photo = ''
  }

  function createGalleryImage() {
    return {
      image: '',
      imagePreview: null,
    }
  }

  function createDetailGalleryItem() {
    return {
      images: [createGalleryImage(), createGalleryImage(), createGalleryImage()],
      short_description: '',
      long_description: '',
    }
  }

  function normalizeDetailGalleryItems(items) {
    if (!Array.isArray(items)) return []

    const groupsMap = new Map()
    const fallbackRows = []

    items.forEach((item) => {
      const groupIndex = Number.isInteger(item?.group_index) ? item.group_index : null
      if (groupIndex === null) {
        fallbackRows.push(item)
        return
      }

      if (!groupsMap.has(groupIndex)) {
        groupsMap.set(groupIndex, {
          images: [],
          short_description: item?.short_description || item?.short || '',
          long_description: item?.long_description || item?.long || '',
        })
      }

      groupsMap.get(groupIndex).images.push({
        image: item?.image || '',
        imagePreview: null,
      })
    })

    if (fallbackRows.length) {
      for (let i = 0; i < fallbackRows.length; i += 3) {
        const chunk = fallbackRows.slice(i, i + 3)
        groupsMap.set(groupsMap.size, {
          images: chunk.map((item) => ({
            image: item?.image || '',
            imagePreview: null,
          })),
          short_description: chunk[0]?.short_description || chunk[0]?.short || '',
          long_description: chunk[0]?.long_description || chunk[0]?.long || '',
        })
      }
    }

    return Array.from(groupsMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([, group]) => group)
  }

  function addNewsGalleryItem() {
    form.news_gallery.push(createDetailGalleryItem())
  }

  function removeNewsGalleryItem(index) {
    form.news_gallery.splice(index, 1)
  }

  function addEventGalleryItem() {
    form.event_gallery.push(createDetailGalleryItem())
  }

  function removeEventGalleryItem(index) {
    form.event_gallery.splice(index, 1)
  }

  function addImageToNewsGalleryItem(itemIndex) {
    if (form.news_gallery[itemIndex]) {
      form.news_gallery[itemIndex].images.push(createGalleryImage())
    }
  }

  function removeImageFromNewsGalleryItem(itemIndex, imageIndex) {
    if (form.news_gallery[itemIndex]) {
      form.news_gallery[itemIndex].images.splice(imageIndex, 1)
    }
  }

  function addImageToEventGalleryItem(itemIndex) {
    if (form.event_gallery[itemIndex]) {
      form.event_gallery[itemIndex].images.push(createGalleryImage())
    }
  }

  function removeImageFromEventGalleryItem(itemIndex, imageIndex) {
    if (form.event_gallery[itemIndex]) {
      form.event_gallery[itemIndex].images.splice(imageIndex, 1)
    }
  }

  async function handleNewsGalleryImageUpload(event, itemIndex, imageIndex) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!form.news_gallery[itemIndex]) return

    form.news_gallery[itemIndex].images[imageIndex].imagePreview = URL.createObjectURL(file)
    const key = `news_gallery_${itemIndex}_${imageIndex}_${Date.now()}`
    const url = await uploadToSupabase(file, 'news', 'gallery', key)

    if (url) {
      form.news_gallery[itemIndex].images[imageIndex].image = url
      uploadProgress[`news_gallery_${itemIndex}_${imageIndex}`] = 0
    }

    event.target.value = ''
  }

  async function handleEventGalleryImageUpload(event, itemIndex, imageIndex) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!form.event_gallery[itemIndex]) return

    form.event_gallery[itemIndex].images[imageIndex].imagePreview = URL.createObjectURL(file)
    const key = `event_gallery_${itemIndex}_${imageIndex}_${Date.now()}`
    const url = await uploadToSupabase(file, 'events', 'gallery', key)

    if (url) {
      form.event_gallery[itemIndex].images[imageIndex].image = url
      uploadProgress[`event_gallery_${itemIndex}_${imageIndex}`] = 0
    }

    event.target.value = ''
  }

  return {
    uploadProgress,
    pendingGalleryIndex,
    pendingAchievementIndex,
    pendingTeamIndex,
    pendingTestimonialIndex,
    logoFileInput,
    galleryFileInput,
    achievementFileInput,
    teamFileInput,
    testimonialFileInput,
    eventImageFileInput,
    newsImageFileInput,
    mentorPhotoFileInput,
    currentUploads,
    removeUpload,
    achievementPhotos,
    removeAchievementPhoto,
    handleFileUpload,
    openGalleryUpload,
    handleGalleryUpload,
    openAchievementUpload,
    handleAchievementPhotoUpload,
    openTeamUpload,
    handleTeamPhotoUpload,
    openTestimonialUpload,
    handleTestimonialPhotoUpload,
    handleEventImageUpload,
    handleNewsImageUpload,
    handleMentorPhotoUpload,
    clearNewsImage,
    clearEventImage,
    clearMentorPhoto,
    normalizeDetailGalleryItems,
    addNewsGalleryItem,
    removeNewsGalleryItem,
    addEventGalleryItem,
    removeEventGalleryItem,
    addImageToNewsGalleryItem,
    removeImageFromNewsGalleryItem,
    addImageToEventGalleryItem,
    removeImageFromEventGalleryItem,
    handleNewsGalleryImageUpload,
    handleEventGalleryImageUpload,
  }
}
