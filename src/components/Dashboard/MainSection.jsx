import { useState, useEffect } from 'react'

function StepCard({ children }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      className={`max-w-lg mx-auto rounded-xl bg-white p-6 shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {children}
    </div>
  )
}

export default function MainSection() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)

  const goNext = () => {
    if (step < 3) setStep(step + 1)
  }

  return (
    <section className="w-full min-h-screen bg-blue-600 py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Step indicator */}
        <div className="mb-6 text-center text-sm font-medium text-white/90">
          Step {step} of 3
        </div>

        {step === 1 && (
          <StepCard>
            <h2 className="text-lg font-semibold text-gray-900">Step 1: Input Course Material</h2>
            <p className="mt-1 text-sm text-gray-500">Paste, upload, or drag & drop your content.</p>

            <textarea
              className="mt-4 w-full min-h-40 resize-y rounded-lg border border-gray-200 p-4 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Paste your course text here…"
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600">
                <input type="file" accept=".pdf,.docx,.txt" className="hidden" />
                Upload (.pdf, .docx, .txt)
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={goNext} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                Next
              </button>
            </div>
          </StepCard>
        )}

        {step === 2 && (
          <StepCard>
            <h2 className="text-lg font-semibold text-gray-900">Step 2: Choose or Customize Voice</h2>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Preset voice</label>
                <select className="mt-2 w-full rounded-md border border-gray-200 bg-white p-2.5 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Narrator</option>
                  <option>Energetic</option>
                </select>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800">
                    Record Voice
                  </button>
                  <label className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50">
                    <input type="file" accept=".mp3,.wav" className="hidden" />
                    Upload Voice Sample (MP3/WAV)
                  </label>
                </div>
              </div>

              <div>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Pitch</label>
                    <input type="range" min="0" max="100" defaultValue="50" className="mt-2 w-full accent-indigo-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Speed</label>
                    <input type="range" min="0" max="100" defaultValue="50" className="mt-2 w-full accent-indigo-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tone</label>
                    <input type="range" min="0" max="100" defaultValue="50" className="mt-2 w-full accent-indigo-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={goNext} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                Next
              </button>
            </div>
          </StepCard>
        )}

        {step === 3 && (
          <StepCard>
            <h2 className="text-lg font-semibold text-gray-900">Step 3: Convert & Listen</h2>
            <p className="mt-1 text-sm text-gray-500">Generate audio and preview it instantly.</p>

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

            <div className="mt-6 flex justify-end">
              <button onClick={() => setStep(1)} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                Finish
              </button>
            </div>
          </StepCard>
        )}
      </div>
    </section>
  )
}

