import { defineStore } from 'pinia'

export type ReviewStatus = 'idle' | 'listening' | 'transcribing' | 'completed'

export const useReviewStore = defineStore('review', {
  state: () => ({
    status: 'idle' as ReviewStatus,
    transcript: '',
    duration: 0
  }),
  actions: {
    startVoice() {
      this.status = 'listening'
    },
    updateTranscript(text: string) {
      this.status = 'transcribing'
      this.transcript += text
    },
    complete() {
      this.status = 'completed'
    }
  }
})
