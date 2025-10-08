import { useState, useEffect, useRef } from 'react'

function StepCard({ children, stepNumber, title, icon, description }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])
  
  return (
    <div
      className={`max-w-2xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-white/10 border border-white/5 transition-all duration-500 hover:bg-white/10 hover:ring-white/20 hover:shadow-3xl hover:scale-[1.02] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Step header with icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500">
            {icon}
          </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
      
      {children}
    </div>
  )
}

export default function MainSection() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedClip, setRecordedClip] = useState(null)
  const [uploadedVoiceFile, setUploadedVoiceFile] = useState(null)
  const fileInputRef = useRef(null)
  const voiceUploadRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const duration = Math.floor(audioChunksRef.current.length / 2) // rough estimate
        setRecordedClip({ name: 'Recorded clip', duration: `00:${String(duration).padStart(2, '0')}`, blob: audioBlob })
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordedClip(null)
      setUploadedVoiceFile(null)
      setSelectedAvatarIndex(null)
    } catch (err) {
      console.error('Microphone access denied or error:', err)
      alert('Microphone permission is required to record audio.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleBrowseClick = () => fileInputRef.current?.click()

  const normalizeFiles = (fileList) => {
    return Array.from(fileList).map((f) => {
      const parts = f.name.split('.')
      const ext = parts.length > 1 ? parts.pop().toLowerCase() : ''
      return { file: f, name: f.name, size: f.size, ext }
    })
  }

  const handleFiles = (fileList) => {
    const accepted = normalizeFiles(fileList).filter(({ ext }) => ['pdf', 'docx', 'txt'].includes(ext))
    if (accepted.length > 0) {
      setUploadedFiles((prev) => [...prev, ...accepted])
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files)
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  const iconForExt = (ext) => {
    const base = 'inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold'
    if (ext === 'pdf') return <span className={`${base} bg-red-500/20 text-red-600 ring-1 ring-red-500/30`}>PDF</span>
    if (ext === 'docx') return <span className={`${base} bg-blue-500/20 text-blue-600 ring-1 ring-blue-500/30`}>DOC</span>
    return <span className={`${base} bg-slate-500/20 text-slate-700 ring-1 ring-slate-500/30`}>TXT</span>
  }

  const goNext = () => {
    if (step < 3) setStep(step + 1)
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/course-bg-dark.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-900/60"></div>
      
      {/* Animated wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute -bottom-10 left-0 w-full h-40 bg-gradient-to-t from-blue-500/20 to-transparent animate-pulse"></div>
        <div className="absolute -bottom-5 left-0 w-full h-32 bg-gradient-to-t from-indigo-400/30 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-2 left-0 w-full h-24 bg-gradient-to-t from-cyan-400/20 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6">
        {/* Horizontal timeline tracker */}
        <div className="mb-12 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 ${
                  step >= stepNum 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 ring-2 ring-cyan-400/30' 
                    : 'bg-white/10 backdrop-blur-sm ring-1 ring-white/20'
                }`}>
                  <span className={`text-sm font-bold ${
                    step >= stepNum ? 'text-white' : 'text-white/60'
                  }`}>
                    {stepNum}
                  </span>
                </div>
                {stepNum < 3 && (
                  <div className={`h-0.5 w-16 transition-all duration-500 ${
                    step > stepNum 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                      : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <StepCard
            stepNumber={1}
            title="Input Course Material"
            description="Upload documents or paste your content"
            icon={
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }
          >

            {/* Upload zone - only show when no files uploaded */}
            {uploadedFiles.length === 0 && (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`mt-4 rounded-xl border-2 border-dashed p-8 text-center transition ${
                  isDragging ? 'border-indigo-500 bg-indigo-50/60' : 'border-white/30 bg-white/5 backdrop-blur'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* Big gradient upload button */}
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-indigo-600"
                  >
                    {/* upload icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12 3a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 1 1 8.707 9.293L11 11.586V4a1 1 0 0 1 1-1z"/>
                      <path d="M5 15a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v2h2v-2a1 1 0 0 1 1-1z"/>
                    </svg>
                    Upload (.pdf, .docx, .txt)
                  </button>

                  <p className="text-xs text-white/80">or drag & drop files here</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                </div>
              </div>
            )}

            {/* Uploaded file cards */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                {uploadedFiles.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-white/10 p-4 ring-1 ring-white/20 shadow-sm backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      {iconForExt(f.ext)}
                      <div>
                        <p className="text-sm font-medium text-white">{f.name}</p>
                        <p className="text-xs text-white/70">{formatSize(f.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Replace
                      </button>
                      <button
                        className="rounded-md bg-red-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                        onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== idx))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Secondary textarea - only show when no files uploaded */}
            {uploadedFiles.length === 0 && (
              <textarea
                className="mt-6 w-full min-h-36 resize-y rounded-lg border border-white/20 bg-white/10 p-4 text-sm text-white placeholder-white/60 outline-none backdrop-blur-md focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40"
                placeholder="Paste your course text here…"
              />
            )}

            <div className="mt-8 flex justify-end">
              <button onClick={goNext} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-500 hover:to-blue-600 hover:scale-105">
                Next
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </StepCard>
        )}

        {step === 2 && (
          <StepCard
            stepNumber={2}
            title="Choose or Customize Voice"
            description="Select a character, record, or upload your voice"
            icon={
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            }
          >

            {/* Top: Character choices (circular avatars) */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { src: 'https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/char1.jpg', label: 'Character 1' },
                { src: 'https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/char2.jpg', label: 'Character 2' },
                { src: 'https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/char3.jpg', label: 'Character 3' },
                { src: 'https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/download+(1).jpg', label: 'Character 4' },
              ].map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setSelectedAvatarIndex(i); setRecordedClip(null); setUploadedVoiceFile(null) }}
                  className={`group flex flex-col items-center gap-2 rounded-xl p-3 transition ${
                    selectedAvatarIndex === i ? 'bg-white/10 ring-1 ring-cyan-400/40' : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`relative h-24 w-24 overflow-hidden rounded-full ring-2 ${
                    selectedAvatarIndex === i ? 'ring-cyan-400' : 'ring-white/20'
                  }`}>
                    <img src={c.src} alt={c.label} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-center text-xs font-medium text-white/90">{c.label}</div>
                </button>
              ))}
            </div>

            {/* OR divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/15" />
              <span className="text-xs font-semibold tracking-wide text-white/70">OR</span>
              <div className="h-px flex-1 bg-white/15" />
            </div>

            {/* Bottom: Record (left) and Upload (right) */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Record */}
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
                <p className="mb-3 text-sm font-medium text-white">Record</p>
                <button
                  onClick={() => {
                    if (isRecording) {
                      stopRecording()
                    } else {
                      startRecording()
                    }
                  }}
                  className={`relative w-full overflow-hidden rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                    isRecording ? 'bg-red-600' : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {/* mic icon */}
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3z" />
                      <path d="M19 11a7 7 0 01-14 0h2a5 5 0 0010 0h2zM11 18h2v3h-2z" />
                    </svg>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </span>
                  {isRecording && (
                    <span className="absolute inset-0 -z-0 animate-pulse bg-red-500/20" />
                  )}
                </button>
              </div>

              {/* Upload */}
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
                <p className="mb-3 text-sm font-medium text-white">Upload Voice Sample</p>
                <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                  <input
                    ref={voiceUploadRef}
                    type="file"
                    accept=".mp3,.wav"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) {
                        setUploadedVoiceFile({ name: f.name, size: f.size })
                        setRecordedClip(null)
                        setSelectedAvatarIndex(null)
                      }
                    }}
                  />
                  Upload MP3/WAV
                </label>
              </div>
            </div>

            {/* Sliders below */}
            <div className="mt-6 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-white">Pitch</label>
                  <input type="range" min="0" max="100" defaultValue="50" className="mt-2 w-full accent-indigo-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Speed</label>
                  <input type="range" min="0" max="100" defaultValue="50" className="mt-2 w-full accent-indigo-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Tone</label>
                  <input type="range" min="0" max="100" defaultValue="50" className="mt-2 w-full accent-indigo-400" />
                </div>
              </div>
            </div>

            {/* Selection summary chips */}
            {(recordedClip || uploadedVoiceFile || selectedAvatarIndex !== null) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {selectedAvatarIndex !== null && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                    Avatar {selectedAvatarIndex + 1}
                  </span>
                )}
                {recordedClip && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                    Recorded • {recordedClip.duration}
                  </span>
                )}
                {uploadedVoiceFile && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                    {uploadedVoiceFile.name}
                  </span>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button onClick={goNext} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-500 hover:to-blue-600 hover:scale-105">
                Next
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </StepCard>
        )}

        {step === 3 && (
          <StepCard
            stepNumber={3}
            title="Convert & Listen"
            description="Generate audio and preview it instantly"
            icon={
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V9a2 2 0 012-2h6a2 2 0 012 2v1M7 7h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
              </svg>
            }
          >

            <button
              onClick={() => {
                setIsGenerating(true)
                setTimeout(() => setIsGenerating(false), 1500)
              }}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
            >
              Generate Audio
            </button>

            {isGenerating && (
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></span>
                Generating…
              </div>
            )}

            <div className="mt-6 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Course Audio Preview</p>
                  <p className="text-xs text-gray-500">intro-lesson.mp3</p>
                </div>
                <div>
                  <select className="rounded-md border border-gray-200 bg-white p-2 text-xs text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                    <option>1x</option>
                    <option>1.5x</option>
                    <option>2x</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 h-20 w-full rounded-md bg-gradient-to-r from-indigo-100 via-indigo-50 to-indigo-100"></div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50">Prev</button>
                  <button className="rounded-md bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800">Play</button>
                  <button className="rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50">Next</button>
                </div>
                <button className="rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-indigo-600">
                  Download MP3
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-emerald-500 hover:to-green-600 hover:scale-105">
                Finish
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </StepCard>
        )}
      </div>
    </section>
  )
}

