# Sorrindo com Você — Landing Page Premium

Landing page odontológica de alto padrão. Mobile-first, sem dependências externas além das fontes Google Fonts.

---

## Estrutura de arquivos

```
sorrindocomvoce/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── favicon.svg
│       ├── hero-consultorio.jpg       ← Imagem principal do hero
│       ├── hero-detalhe.jpg           ← Imagem menor do hero (canto)
│       ├── clinic-main.jpg            ← Foto grande da seção "O consultório"
│       ├── clinic-detail-1.jpg        ← Recepção
│       ├── clinic-detail-2.jpg        ← Equipamento
│       ├── clinic-detail-3.jpg        ← Sala de espera
│       ├── differential-main.jpg      ← Foto do dentista (seção diferenciais)
│       ├── differential-detail.jpg    ← Detalhe técnico (seção diferenciais)
│       ├── dentist-profile.jpg        ← Foto de perfil do dentista
│       ├── treatment-clinica.jpg
│       ├── treatment-limpeza.jpg
│       ├── treatment-clareamento.jpg
│       ├── treatment-restauracoes.jpg
│       ├── treatment-implantes.jpg
│       ├── treatment-ortodontia.jpg
│       ├── treatment-proteses.jpg
│       ├── treatment-harmonizacao.jpg
│       └── og-image.jpg               ← Imagem para redes sociais (1200×630px)
└── README.md
```

---

## Personalização

### 1. Identidade visual (cores)

Edite as variáveis no início de `assets/css/style.css`:

```css
:root {
  --color-bg:          #f9f7f4;   /* fundo principal */
  --color-bg-alt:      #f2ede6;   /* seções alternadas */
  --color-bg-dark:     #1c1a17;   /* seção diferenciais */
  --color-text:        #1c1a17;   /* texto principal */
  --color-accent:      #b09a82;   /* cor de destaque — substitua pela cor da marca */
  --font-serif:        'Cormorant Garamond', Georgia, serif;
  --font-sans:         'Inter', sans-serif;
}
```

### 2. Logo

Substitua `<span class="header__logo-text">CLINIC_NAME</span>` por uma tag `<img>`:

```html
<a href="#inicio" class="header__logo">
  <img src="assets/images/logo.svg" alt="Nome do consultório" height="36" />
</a>
```

### 3. Placeholders de texto

Busque e substitua em `index.html`:

| Placeholder           | Substitua por                         |
|-----------------------|---------------------------------------|
| `CLINIC_NAME`         | Nome do consultório                   |
| `DENTIST_NAME`        | Nome do dentista                      |
| `DENTIST_SPECIALTY`   | Especialidade(s)                      |
| `DENTIST_DEGREE`      | Formação (ex: Cirurgiã-Dentista — USP)|
| `DENTIST_BIO_PLACEHOLDER` | Texto biográfico do dentista      |
| `CRO_NUMBER`          | Número do CRO                         |
| `CITY`                | Cidade                                |
| `NEIGHBORHOOD`        | Bairro                                |
| `CLINIC_ADDRESS`      | Endereço completo                     |
| `CLINIC_PHONE`        | Telefone formatado                    |
| `CLINIC_WHATSAPP`     | Número WhatsApp (somente dígitos)     |
| `INSTAGRAM_HANDLE`    | @ do Instagram                        |
| `CLINIC_DOMAIN`       | Domínio do site                       |
| `GOOGLE_MAPS_URL`     | URL do Google Maps para direções      |
| `GOOGLE_MAPS_EMBED_URL` | URL do embed do Google Maps         |
| `YEARS`               | Anos de experiência (badge hero)      |
| `YEARS_NUMBER`        | Número para animação do contador      |
| `PATIENTS_NUMBER`     | Número para animação do contador      |
| `SPECIALTIES_NUMBER`  | Número para animação do contador      |
| `COURSES_NUMBER`      | Número para animação do contador      |
| `CERT_1`, `CERT_2`, `CERT_3` | Certificações e cursos        |

### 4. Imagens

Todas as imagens estão em `assets/images/`. Substitua cada arquivo mantendo o mesmo nome, ou atualize os atributos `src` no HTML.

**Tamanhos recomendados:**
- Hero principal: 720×900px mínimo (proporção portrait)
- Hero detalhe: 280×340px mínimo
- Clínica principal: 560×680px mínimo
- Detalhes da clínica: 260×200px cada
- Perfil dentista: 380×460px mínimo
- Tratamentos: 400×300px cada
- OG Image (redes sociais): exatamente 1200×630px

**Formato recomendado:** WebP ou AVIF para melhor performance. JPG como fallback.

### 5. Número do WhatsApp

Substitua `CLINIC_WHATSAPP` pelo número com DDI sem espaços ou símbolos.  
Exemplo: `5511999999999`

### 6. Embed do Google Maps

1. Abra Google Maps e navegue até o endereço
2. Clique em "Compartilhar" → "Incorporar um mapa"
3. Copie apenas a URL do atributo `src` do iframe
4. Cole no lugar de `GOOGLE_MAPS_EMBED_URL`

---

## Seções da página

| ID             | Seção                  |
|----------------|------------------------|
| `#inicio`      | Hero                   |
| `#consultorio` | O consultório          |
| `#tratamentos` | Tratamentos            |
| `#diferenciais`| Diferenciais           |
| `#autoridade`  | Experiência / números  |
| `#depoimentos` | Depoimentos            |
| `#agendamento` | CTA de agendamento     |
| `#localizacao` | Localização            |

---

## Sem dependências

A página utiliza apenas:
- Google Fonts (Cormorant Garamond + Inter) — pode ser substituído por fontes locais
- CSS nativo (sem frameworks)
- JavaScript puro (sem jQuery, sem bibliotecas)

Para usar fontes locais, remova o `<link>` do Google Fonts e adicione `@font-face` no CSS.
