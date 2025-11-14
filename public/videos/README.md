# Pasta de Vídeos

## Assets Necessários

Adicione os seguintes arquivos nesta pasta:

### 1. estacao.mp4 (OBRIGATÓRIO)
- **Formato**: MP4 (H.264)
- **Resolução**: 1920x1080 ou 1280x720
- **Duração**: 8-15 segundos
- **Tamanho**: Idealmente < 5MB

### 2. estacao.webm (OPCIONAL)
- **Formato**: WebM (VP9)
- **Melhor compressão que MP4**
- **Suportado por navegadores modernos**

## Como Adicionar

Simplesmente coloque os arquivos aqui:

```
public/videos/
├── estacao.mp4   <- Adicione este arquivo
├── estacao.webm  <- Opcional
└── README.md     <- Este arquivo
```

## Comandos úteis

### Converter vídeo para MP4 otimizado:
```bash
ffmpeg -i seu-video.mov -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k -movflags +faststart estacao.mp4
```

### Reduzir tamanho do vídeo:
```bash
ffmpeg -i estacao.mp4 -vf "scale=1280:720" -c:v libx264 -crf 28 estacao-compressed.mp4
```

### Cortar vídeo (primeiros 10 segundos):
```bash
ffmpeg -i estacao.mp4 -t 10 -c copy estacao-short.mp4
```

