"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, Phone } from "lucide-react"

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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEventTypeChange = (value: "pessoal" | "empresarial") => {
    setFormData((prev) => ({ ...prev, eventType: value, eventTypeName: "" }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacy: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.privacy) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      // Placeholder: Replace with your actual form submission endpoint
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
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
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center mb-6 font-montserrat text-cream-50">Leve a Estação do Grão para seu Evento</h2>

        <p className="text-center text-lg text-cream-50 mb-16 font-montserrat">
          Café gourmet, baristas profissionais e personalização para sua marca. Atendimento rápido e sob medida para
          Recife, João Pessoa e região.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-cream-50 font-montserrat">Entre em Contato</h3>

            <a
              href="https://wa.me/55DDDNUMERO?text=Olá! Quero orçamento da estação de café."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
            >
              <Phone className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
              <div>
                <p className="font-semibold text-cream-50 font-montserrat">WhatsApp</p>
                <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat">Clique aqui para orçamento rápido</p>
              </div>
            </a>

            <a
              href="mailto:contato@estacaodograo.com.br"
              className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
            >
              <Mail className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
              <div>
                <p className="font-semibold text-cream-50 font-montserrat">E-mail</p>
                <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat">contato@estacaodograo.com.br</p>
              </div>
            </a>

            <div className="p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl">
              <p className="font-semibold text-cream-50 mb-3 font-montserrat">Atendimento Rápido</p>
              <p className="text-cream-50 text-sm font-montserrat">Resposta em até 2 horas durante o horário comercial</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-cream-50 font-montserrat">
                Nome * <span className="text-coffee-500">(obrigatório)</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-cream-50 font-montserrat mb-3">
                Tipo de Evento
              </label>
              <RadioGroup
                value={formData.eventType}
                onValueChange={(value) => handleEventTypeChange(value as "pessoal" | "empresarial")}
                className="flex gap-6"
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
              <div className="space-y-2">
                <label htmlFor="eventTypeName" className="block text-sm font-semibold text-cream-50 font-montserrat">
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
                  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-cream-50 font-montserrat">
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
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-cream-50 font-montserrat">
                E-mail * <span className="text-coffee-500">(obrigatório)</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="eventDescription" className="block text-sm font-semibold text-cream-50 font-montserrat">
                Descreva seu Evento
              </label>
              <Textarea
                id="eventDescription"
                name="eventDescription"
                placeholder="Data, Número de convidados, Requisitos especiais, etc."
                value={formData.eventDescription}
                onChange={handleChange}
                className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 resize-none min-h-24"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={formData.privacy}
                onCheckedChange={handleCheckboxChange}
                className="mt-1"
              />
              <label htmlFor="privacy" className="text-sm text-cream-50 cursor-pointer font-montserrat">
                Autorizo o contato para fins comerciais conforme a{" "}
                <a href="#" className="text-coffee-500 hover:text-accent underline font-montserrat">
                  Política de Privacidade
                </a>{" "}
                *
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-coffee-500 hover:bg-accent text-coffee-900 font-semibold py-3 rounded-lg transition-colors font-montserrat"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
