export interface VoiceCallbacks {
  onText?: (text: string) => void
  onStatus?: (status: string) => void
}

export function startRecord(callbacks?: VoiceCallbacks) {
  callbacks?.onStatus?.('listening')
}

export function stopRecord() {
  return Promise.resolve({ duration: 0 })
}

export function sendAudioChunk(buffer: ArrayBuffer) {
  return buffer
}
