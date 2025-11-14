# Pasta de Imagens (Poster)

## Asset Necessário

Adicione o poster (thumbnail) do vídeo nesta pasta:

### poster-estacao.webp (RECOMENDADO)
- **Formato**: WebP (ou JPG/PNG)
- **Resolução**: mesma do vídeo (1920x1080)
- **Tamanho**: < 500KB
- **Uso**: Aparece enquanto o vídeo carrega

**Dica SEO**: Renomeie para `poster-estacao-cafe-eventos-recife.webp` para melhor indexação.

## Como Criar o Poster

### Opção 1: Extrair frame do vídeo (aos 5 segundos)
```bash
ffmpeg -i ../videos/estacao.mp4 -ss 00:00:05 -vframes 1 -q:v 2 poster-estacao.webp
```

### Opção 2: Usar print screen
1. Abra o vídeo em um player
2. Pause no frame desejado (4-6 segundos)
3. Capture a tela
4. Recorte e salve como WebP

### Opção 3: Usar editor de imagem
- Photoshop: Exportar como WebP
- GIMP: Exportar como WebP
- Squoosh.app: Converter online

## Estrutura

```
public/img/
├── poster-estacao.webp  <- Adicione este arquivo
└── README.md            <- Este arquivo
```

## Otimização

Para comprimir a imagem:

```bash
# Usando cwebp (WebP encoder)
cwebp -q 85 poster-original.jpg -o poster-estacao.webp

# Ou usando ffmpeg
ffmpeg -i poster-original.jpg -q:v 85 poster-estacao.webp
```

