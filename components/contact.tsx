"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react"
import { useIPDetection } from "@/hooks/useIPDetection"
import { getRemainingHours, isFormBlockedNow, markFormSubmittedNow } from "@/utils/formRateLimit"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    eventType: "" as "pessoal" | "empresarial" | "",
    eventTypeName: "",
    phone: "",
    email: "",
    eventDescription: "",
    privacy: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "rate_limit" | "validation_error">("idle")
  const [emailCopied, setEmailCopied] = useState(false)
  const [camposFaltantes, setCamposFaltantes] = useState<string[]>([])
  
  // Detecção de IP
  const { ip, loading: ipLoading, error: ipError } = useIPDetection()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
      setCamposFaltantes([])
    }
  }

  const handleEventTypeChange = (value: "pessoal" | "empresarial") => {
    setFormData((prev) => ({ ...prev, eventType: value, eventTypeName: "" }))
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
      setCamposFaltantes([])
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacy: checked }))
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
      setCamposFaltantes([])
    }
  }

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('estacaodograo.brasil@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar e-mail:', err)
      alert('Erro ao copiar e-mail. Por favor, copie manualmente: estacaodograo.brasil@gmail.com')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isFormBlockedNow()) {
      setSubmitStatus("rate_limit")
      return
    }

    const camposFaltantes: string[] = []
    
    if (!formData.name || formData.name.trim() === '') {
      camposFaltantes.push('Nome')
    }
    
    if (!formData.eventType) {
      camposFaltantes.push('Tipo de Evento')
    }
    
    if (!formData.phone || formData.phone.trim() === '') {
      camposFaltantes.push('Telefone')
    }
    
    if (!formData.email || formData.email.trim() === '') {
      camposFaltantes.push('E-mail')
    }
    
    if (!formData.eventDescription || formData.eventDescription.trim() === '') {
      camposFaltantes.push('Descrição do Evento')
    }
    
    if (!formData.privacy) {
      camposFaltantes.push('Autorização de Privacidade')
    }
    
    if (camposFaltantes.length > 0) {
      setSubmitStatus("validation_error")
      setCamposFaltantes(camposFaltantes)
      return
    }

    setIsSubmitting(true)

    try {
      // URL do Google Apps Script
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyAoVwIGNbs4Qh13PgKEBKCP5wEweYThUNSlegxF_s-L9KaqhbZ-G_T8b7Gp0o1GogX/exec'
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Importante para Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          eventType: formData.eventType || '',
          eventTypeName: formData.eventTypeName || '',
          eventDescription: formData.eventDescription || '',
          timestamp: new Date().toISOString(),
          userIP: ip || 'IP_UNAVAILABLE',
        }),
      })

      // Como usamos 'no-cors', não podemos verificar response.ok
      // Assumimos sucesso se não houver erro
      markFormSubmittedNow()
      setSubmitStatus("success")
      setFormData({
        name: "",
        eventType: "",
        eventTypeName: "",
        phone: "",
        email: "",
        eventDescription: "",
        privacy: false,
      })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contato" className="min-h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] flex flex-col justify-center bg-coffee-900 py-8 sm:py-4 lg:py-6 overflow-hidden w-full">
      <div className="w-full max-w-[100vw] sm:max-w-4xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-0 lg:py-0 box-border">
        <h2 className="text-center mb-4 sm:mb-3 font-montserrat text-cream-50">Leve a Estação do Grão para seu Evento</h2>

        <p className="text-center text-xs sm:text-base text-cream-50 mb-10 sm:mb-4 font-montserrat">
          Café gourmet, baristas profissionais e personalização para sua marca. Atendimento rápido e sob medida para
          Recife, João Pessoa e região.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-4">
          {/* Contact Methods */}
          <div className="space-y-3 lg:space-y-4 order-2 lg:order-1">
            <h3 className="text-lg lg:text-xl font-semibold text-cream-50 font-montserrat text-center">Entre em Contato</h3>

            {/* WhatsApp e E-mail lado a lado no mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-4">
              <a
                href="https://wa.me/5581994492277?text=Olá! Quero orçamento da estação de café."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-2.5 lg:p-4 lg:flex-row lg:items-start bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group text-center lg:text-left"
              >
                <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-coffee-500 group-hover:text-accent transition-colors" />
                <div className="flex-1">
                  <p className="font-semibold text-cream-50 font-montserrat text-xs lg:text-base">WhatsApp</p>
                  <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat text-[10px] lg:text-sm">
                    <span className="hidden lg:inline">Clique aqui para orçamento rápido</span>
                  </p>
                </div>
              </a>

              <button
                type="button"
                onClick={handleEmailCopy}
                className="flex flex-col items-center gap-1.5 p-2.5 lg:p-4 lg:flex-row lg:items-start bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group w-full text-center lg:text-left"
              >
                <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-coffee-500 group-hover:text-accent transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-cream-50 font-montserrat text-xs lg:text-base">E-mail</p>
                  <p className={`transition-colors font-montserrat text-[10px] lg:text-sm truncate lg:truncate-none ${emailCopied ? 'text-green-400' : 'text-coffee-500 hover:text-accent'}`}>
                    {emailCopied ? (
                      <>
                        <span className="lg:hidden">✓ Copiado!</span>
                        <span className="hidden lg:inline">✓ E-mail copiado!</span>
                      </>
                    ) : (
                      <>
                        <span className="lg:hidden">estacaodograo...</span>
                        <span className="hidden lg:inline">estacaodograo.brasil@gmail.com</span>
                      </>
                    )}
                  </p>
                </div>
              </button>
            </div>

            {/* Atendimento e Redes sociais - mobile compacto, desktop original */}
            <div className="p-2 lg:p-4 bg-coffee-700/40 border border-coffee-500/20 rounded-xl space-y-2">
              {/* Mobile: texto completo e redes sociais */}
              <div className="lg:hidden space-y-2">
                <p className="text-cream-50 text-xs font-montserrat text-center">
                  Resposta em até 2 horas durante o horário comercial
                </p>
                
                <div>
                  <p className="font-semibold text-cream-50 mb-1.5 font-montserrat text-center text-sm">
                    Conheça nossas redes sociais
                  </p>
                  <div className="flex flex-row gap-2">
                    <a
                      href="https://www.instagram.com/estacaodograo.eventos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center p-3 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
                    >
                      <Instagram className="w-4 h-4 text-coffee-500 flex-shrink-0 group-hover:text-accent transition-colors" />
                    </a>
                    
                    <a
                      href="https://www.facebook.com/estacaodograo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center p-3 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
                    >
                      <Facebook className="w-4 h-4 text-coffee-500 flex-shrink-0 group-hover:text-accent transition-colors" />
                    </a>
                    
                    <a
                      href="https://www.youtube.com/@estacaodograo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center p-3 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
                    >
                      <Youtube className="w-4 h-4 text-coffee-500 flex-shrink-0 group-hover:text-accent transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Desktop: estrutura original completa */}
              <div className="hidden lg:block">
                <div>
                  <p className="font-semibold text-cream-50 mb-1 font-montserrat text-center">Atendimento Rápido</p>
                  <p className="text-cream-50 text-xs font-montserrat">Resposta em até 2 horas durante o horário comercial</p>
                </div>
                
                <div>
                  <p className="font-semibold text-cream-50 mb-1.5 font-montserrat text-center">Conheça nossas redes sociais</p>
                  <div className="space-y-1.5">
                    <a
                      href="https://www.instagram.com/estacaodograo.eventos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-4 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
                    >
                      <Instagram className="w-5 h-5 text-coffee-500 flex-shrink-0 group-hover:text-accent transition-colors" />
                    </a>
                    
                    <a
                      href="https://www.facebook.com/estacaodograo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-4 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
                    >
                      <Facebook className="w-5 h-5 text-coffee-500 flex-shrink-0 group-hover:text-accent transition-colors" />
                    </a>
                    
                    <a
                      href="https://www.youtube.com/@estacaodograo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-4 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
                    >
                      <Youtube className="w-5 h-5 text-coffee-500 flex-shrink-0 group-hover:text-accent transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-2 order-1 lg:order-2">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-semibold text-cream-50 font-montserrat">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 h-8"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-cream-50 font-montserrat mb-1.5">
                Tipo de Evento
              </label>
              <RadioGroup
                value={formData.eventType}
                onValueChange={(value) => handleEventTypeChange(value as "pessoal" | "empresarial")}
                className="flex gap-6"
                required
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="pessoal" id="eventType-pessoal" className="text-coffee-500 border-coffee-700 data-[state=checked]:bg-coffee-500 data-[state=checked]:border-coffee-500" />
                  <label htmlFor="eventType-pessoal" className="text-cream-50 cursor-pointer font-montserrat">
                    Pessoal
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="empresarial" id="eventType-empresarial" className="text-coffee-500 border-coffee-700 data-[state=checked]:bg-coffee-500 data-[state=checked]:border-coffee-500" />
                  <label htmlFor="eventType-empresarial" className="text-cream-50 cursor-pointer font-montserrat">
                    Empresarial
                  </label>
                </div>
              </RadioGroup>
            </div>

            {formData.eventType && (
              <div className="space-y-1">
                <label htmlFor="eventTypeName" className="block text-xs font-semibold text-cream-50 font-montserrat">
                  Tipo de Evento
                </label>
                <Input
                  id="eventTypeName"
                  name="eventTypeName"
                  type="text"
                  placeholder={
                    formData.eventType === "pessoal"
                      ? "Tipo de evento, exemplo: Casamento, Aniversário, etc."
                      : "Tipo de evento, exemplo: Congresso, Feira, Coffee break, etc."
                  }
                  value={formData.eventTypeName}
                  onChange={handleChange}
                  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 h-8"
                />
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="phone" className="block text-xs font-semibold text-cream-50 font-montserrat">
                Telefone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="(81) 98765-4321"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 h-8"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold text-cream-50 font-montserrat">
                E-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 h-8"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="eventDescription" className="block text-xs font-semibold text-cream-50 font-montserrat">
                Descreva seu Evento
              </label>
              <Textarea
                id="eventDescription"
                name="eventDescription"
                placeholder="Data, Número de convidados, Requisitos especiais, etc."
                value={formData.eventDescription}
                onChange={handleChange}
                required
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 resize-none min-h-20"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={formData.privacy}
                onCheckedChange={handleCheckboxChange}
                className="mt-1"
                required
              />
              <label htmlFor="privacy" className="text-sm text-cream-50 cursor-pointer font-montserrat">
                Autorizo o contato para fins comerciais conforme a{" "}
                <a href="#" className="text-coffee-500 hover:text-accent underline font-montserrat">
                  Política de Privacidade
                </a>
              </label>
            </div>

            {submitStatus === "success" && (
              <div className="p-4 bg-coffee-700/40 border border-coffee-500 rounded-lg text-cream-50 text-sm font-montserrat">
                ✓ Mensagem enviada com sucesso! Retornaremos em breve.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-900/40 border border-red-700 rounded-lg text-cream-50 text-sm font-montserrat">
                ✗ Erro ao enviar. Verifique os campos obrigatórios.
              </div>
            )}

            {submitStatus === "rate_limit" && (
              <div className="p-4 bg-orange-900/40 border border-orange-700 rounded-lg text-cream-50 text-sm font-montserrat space-y-1">
                <p className="font-semibold">⏱️ Solicitação já registrada</p>
                <p>
                  Recebemos seu pedido recentemente. Para evitar duplicidade, você poderá enviar um novo orçamento em até{" "}
                  <strong>{Math.max(1, getRemainingHours())} hora(s)</strong>.
                </p>
                <p className="text-cream-50/90">Se for urgente, fale com a gente pelo WhatsApp.</p>
              </div>
            )}

            {submitStatus === "validation_error" && (
              <div className="p-4 bg-yellow-900/40 border-2 border-yellow-600 rounded-lg text-cream-50 text-sm font-montserrat space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 text-lg flex-shrink-0">⚠️</span>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">Por favor, preencha todos os campos obrigatórios:</p>
                    <ul className="list-disc list-inside space-y-1 text-yellow-100">
                      {camposFaltantes.map((campo, index) => (
                        <li key={index}>{campo}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-coffee-500 hover:bg-accent text-coffee-900 font-semibold py-2.5 rounded-lg transition-colors font-montserrat"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
