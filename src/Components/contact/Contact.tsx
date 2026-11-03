
import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { AiOutlineLoading } from 'react-icons/ai'
import { FiArrowUpRight, FiMail, FiCheck, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import Challenge from './Challenge'

interface FoundImages {
  smiskiFound: boolean;
  berryFound: boolean;
  watermelonFound: boolean;
}

interface Props {
  foundImages: FoundImages;
}

function ContactForm() {
  const form = useRef<HTMLFormElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [sendError, setSendError] = useState('')
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.current || isLoading) return

    const formElement = form.current
    const formData = new FormData(formElement)
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const newErrors: { email?: string; message?: string } = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!message) {
      newErrors.message = 'Message is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSent(false)
      return
    }

    setErrors({})
    setSendError('')
    setIsSent(false)
    setIsLoading(true)

    try {
      await emailjs.sendForm(
        'service_ib314qq',
        'template_0jc6g2a',
        formElement,
        { publicKey: 'g7icqAs-3k37I1YTh' }
      )

      formElement.reset()
      setIsSent(true)
    } catch (error) {
      console.error('EmailJS failed:', error)
      setSendError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFieldChange = (field: 'email' | 'message') => {
    setIsSent(false)
    setSendError('')
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border border-navy-blue/15 bg-cream/75 p-6 font-inter text-navy-blue shadow-[0_15px_45px_rgba(10,31,49,0.1)] backdrop-blur-md sm:p-8">

      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-blue to-transparent" />

      {/* Heading */}
      <div className="mb-8">

        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-navy-blue/15 bg-navy-blue text-cream shadow-sm">
            <FiMail size={21} />
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-blue/55">Let's connect</span>
            <span className="h-[2px] w-8 rounded-full bg-blue" />
          </div>
        </div>

        <h2 className="font-inter text-[clamp(2rem,5vw,2.8rem)] font-bold italic leading-tight tracking-tight text-navy-blue">
          Contact me<span className="text-blue">!</span>
        </h2>

        <p className="mt-3 max-w-sm font-inter text-[14px] leading-relaxed text-navy-blue/65">
          Want to get in touch? Send me a message!
        </p>
      </div>

      {/* Contact form */}
      <form ref={form} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-blue">
            Email <span className="text-blue">*</span>
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@email.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onChange={() => handleFieldChange('email')}
            className={`w-full rounded-xl border bg-white/70 px-4 py-3.5 font-inter text-[14px] text-navy-blue shadow-sm outline-none transition-all duration-200 placeholder:text-navy-blue/35 hover:border-navy-blue/30 focus:bg-white focus:ring-4 focus:ring-blue/15 ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-navy-blue/15 focus:border-blue'}`}
          />

          {errors.email && (
            <span id="email-error" className="flex items-center gap-1.5 font-inter text-[12px] text-red-600">
              <FiAlertCircle size={13} />
              {errors.email}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-blue">
            Message <span className="text-blue">*</span>
          </label>

          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your message here..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            onChange={() => handleFieldChange('message')}
            className={`w-full resize-none rounded-xl border bg-white/70 px-4 py-3.5 font-inter text-[14px] leading-relaxed text-navy-blue shadow-sm outline-none transition-all duration-200 placeholder:text-navy-blue/35 hover:border-navy-blue/30 focus:bg-white focus:ring-4 focus:ring-blue/15 ${errors.message ? 'border-red-400 focus:border-red-400' : 'border-navy-blue/15 focus:border-blue'}`}
          />

          {errors.message && (
            <span id="message-error" className="flex items-center gap-1.5 font-inter text-[12px] text-red-600">
              <FiAlertCircle size={13} />
              {errors.message}
            </span>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-navy-blue bg-navy-blue px-6 py-4 font-inter text-[13px] font-semibold uppercase tracking-[0.12em] text-cream shadow-[0_5px_15px_rgba(10,31,49,0.15)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue hover:bg-blue hover:text-navy-blue hover:shadow-[0_10px_25px_rgba(10,31,49,0.18)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading size={19} className="animate-spin" />
              Sending...
            </>
          ) : isSent ? (
            <>
              <FiCheckCircle size={19} />
              Sent!
            </>
          ) : (
            <>
              Send Message
              <FiArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </button>

        {/* Feedback */}
        <div aria-live="polite" role="status">
          {isSent && (
            <div className="flex items-center gap-2 rounded-xl border border-green-600/20 bg-green-600/10 px-4 py-3 font-inter text-[13px] text-green-800">
              <FiCheckCircle size={18} className="shrink-0" />
              Your message has been sent successfully!
            </div>
          )}

          {sendError && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-inter text-[13px] text-red-700">
              <FiAlertCircle size={18} className="shrink-0" />
              {sendError}
            </div>
          )}
        </div>

      </form>
    </div>
  )
}

export default function Contact({ foundImages }: Props) {  
  return (
    <section className="relative z-10 w-full px-5 pb-24 pt-28 font-inter text-navy-blue sm:px-8 sm:pt-36 lg:px-16 lg:py-40">

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">

        {/* Contact form */}
        <div className="pointer-events-auto relative z-10 flex w-full">
          <ContactForm />
        </div>

        {/* Challenge panel */}
        <Challenge foundImages={foundImages} />

      </div>

    </section>
  )
}
