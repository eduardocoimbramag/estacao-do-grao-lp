import { useState, useEffect } from 'react'

interface IPDetectionResult {
  ip: string | null
  loading: boolean
  error: boolean
}

export const useIPDetection = (): IPDetectionResult => {
  const [ip, setIp] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const detectIP = async () => {
      try {
        // Serviço gratuito para detectar IP
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setIp(data.ip)
        setError(false)
      } catch (err) {
        console.error('Erro ao detectar IP:', err)
        setIp('IP_UNAVAILABLE')
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    detectIP()
  }, [])

  return { ip, loading, error }
}

