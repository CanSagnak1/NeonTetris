# 🎮 NEON TETRIS

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![ES6](https://img.shields.io/badge/ES6-Modules-yellow.svg)
![Status](https://img.shields.io/badge/status-stable-success.svg)

**Modern, neon temalı bir Tetris oyunu - Vanilla JavaScript ile geliştirildi**

[Özellikler](#-özellikler) • [Demo](#-demo) • [Kurulum](#-kurulum) • [Kullanım](#-kullanım) • [Yapı](#-proje-yapısı)

</div>

---

## 📖 Hakkında

Neon Tetris, klasik Tetris oyununun modern bir yorumudur. Glassmorphism tasarım, neon glow efektleri, smooth animasyonlar ve performans odaklı render sistemi ile geliştirilmiştir. Saf JavaScript (ES6+) kullanılarak, herhangi bir framework veya kütüphane olmadan yazılmıştır.

### ✨ Özellikler

#### 🎨 Görsel Tasarım
- **Neon Tema**: Canlı renkler ve glow efektleri
- **Glassmorphism**: Modern buzlu cam efektli UI panelleri
- **Smooth Animasyonlar**: CSS transitions ve keyframe animasyonları
- **Responsive Design**: Esnek grid sistemi
- **Gradient Effects**: Dinamik renk geçişleri
- **Particle System**: Satır silindiğinde patlayan parçacık efektleri

#### 🎯 Oyun Mekanikleri
- **Ghost Piece**: Parçanın düşeceği yeri gösteren hayalet önizleme
- **Hold System**: Parçaları saklama özelliği
- **Line Clear Effects**: Görsel efektler ve ekran sarsıntısı
- **Level Progression**: Otomatik zorluk artışı
- **Score System**: Puan, seviye ve satır takibi
- **Next Preview**: Gelecek 3 parçayı gösterme

#### 🛠️ Teknik Özellikler
- **ES6 Modules**: Modern JavaScript modül yapısı
- **OOP Design**: Sınıf tabanlı mimari
- **Canvas Rendering**: HTML5 Canvas API ile optimize edilmiş çizim
- **Wall Kick System**: SRS (Super Rotation System) standardına uygun rotasyon
- **Performans**: RequestAnimationFrame ile smooth 60 FPS
- **No Dependencies**: Framework veya kütüphane kullanılmadan geliştirildi

---

## 🎮 Demo

Oyunu yerel olarak çalıştırmak için:

```bash
# Proje dizinine gidin
cd "neon-tetris"

# HTTP sunucusunu başlatın
python3 -m http.server 8000

# Tarayıcınızda açın
# http://localhost:8000
```

---

## 🚀 Kurulum

### Gereksinimler
- Modern bir web tarayıcı (Chrome, Firefox, Safari, Edge)
- Python 3.x (yerel sunucu için)

### Adımlar

1. **Projeyi indirin**
   ```bash
   git clone <repository-url>
   cd neon-tetris
   ```

2. **HTTP sunucusunu başlatın**
   ```bash
   python3 -m http.server 8000
   ```
   
   > **Not**: ES6 modülleri CORS politikası nedeniyle doğrudan `file://` protokolü ile çalışmaz. Bu nedenle yerel bir HTTP sunucusu gereklidir.

3. **Oyunu açın**
   
   Tarayıcınızda `http://localhost:8000` adresine gidin.

---

## 🎯 Kullanım

### Kontroller

| Tuş | Aksiyon |
|-----|---------|
| `←` `→` | Parçayı sağa/sola hareket ettir |
| `↑` | Parçayı döndür (SRS) |
| `↓` | Soft drop (hızlı düşür) |
| `Space` | Hard drop (anında düşür) |
| `C` | Hold (parçayı sakla) |

### Oyun Kuralları

- **Hedef**: Düşen parçaları yerleştirerek tam satırlar oluşturun
- **Puan Sistemi**:
  - Single (1 satır): 100 × Level
  - Double (2 satır): 300 × Level
  - Triple (3 satır): 500 × Level
  - Tetris (4 satır): 800 × Level
- **Seviye Artışı**: Her 10 satırda bir seviye artar
- **Hız**: Seviye arttıkça parçalar daha hızlı düşer
- **Game Over**: Yeni parça ızgaranın üstüne taşarsa oyun biter

---

## 📁 Proje Yapısı

```
neon-tetris/
├── index.html                 # Ana HTML dosyası
├── style.css                  # Neon tema CSS stilleri
├── README.md                  # Bu dosya
└── src/
    ├── main.js               # Giriş noktası ve başlatma
    ├── game.js               # Ana oyun döngüsü ve mantık
    ├── board.js              # Oyun tahtası yönetimi
    ├── tetromino.js          # Tetromino sınıfı ve rotasyon
    ├── renderer.js           # Canvas rendering sistemi
    ├── input.js              # Klavye kontrolleri
    ├── particles.js          # Parçacık efekt sistemi
    └── constants.js          # Oyun sabitleri ve yapılandırma
```

### Modül Açıklamaları

#### `main.js`
Uygulama giriş noktası. Window load event'ini dinler ve Game instance'ını başlatır.

#### `game.js`
Ana oyun mantığı ve durum yönetimi:
- Oyun döngüsü (game loop)
- Skor, seviye, satır takibi
- Parça hareketi ve rotasyonu
- Hold ve next sistemi
- Game over kontrolü

#### `board.js`
Oyun tahtası yönetimi:
- Izgara yapısı (10×20)
- Çarpışma kontrolü
- Satır temizleme algoritması
- Parça dondurma (freeze)

#### `tetromino.js`
Tetromino parça yönetimi:
- 7 standart Tetris şekli (I, O, T, S, Z, J, L)
- SRS (Super Rotation System) rotasyon
- Wall kick testi
- Validasyon kontrolleri

#### `renderer.js`
Canvas çizim sistemi:
- Optimize edilmiş rendering
- 3D-style blok çizimi
- Ghost piece rendering
- Mini preview (hold/next)
- Parçacık sistemi entegrasyonu

#### `input.js`
Klavye girişi yönetimi:
- Event listener kayıtları
- Oyun durumu kontrolü
- Tuş mapping

#### `particles.js`
Görsel efekt sistemi:
- Parçacık oluşturma
- Fizik simülasyonu (hız, decay)
- Alpha blending
- Glow efektleri

#### `constants.js`
Oyun yapılandırması:
- Izgara boyutları
- Renk paleti
- Tetromino şekilleri
- Wall kick dataları
- Puan değerleri
- Seviye hızları

---

## 🎨 Tasarım Sistemi

### Renk Paleti

```css
/* Ana Renkler */
--bg-color: #050510           /* Koyu arka plan */
--text-primary: #ffffff       /* Beyaz metin */
--text-secondary: #00f0ff     /* Cyan aksanlar */

/* Tetromino Renkleri */
I-Piece: #00f0f0  /* Cyan */
J-Piece: #0000f0  /* Mavi */
L-Piece: #f0a000  /* Turuncu */
O-Piece: #f0f000  /* Sarı */
S-Piece: #00f000  /* Yeşil */
T-Piece: #a000f0  /* Mor */
Z-Piece: #f00000  /* Kırmızı */
```

### Tipografi
- **Font Family**: 'Outfit', sans-serif (Google Fonts)
- **Weights**: 300 (Light), 500 (Medium), 700 (Bold)

---

## ⚙️ Teknik Detaylar

### Rendering Pipeline

1. **Clear**: Canvas temizlenir
2. **Board**: Dondurulmuş bloklar çizilir
3. **Particles**: Aktif parçacıklar güncellenir ve çizilir
4. **Ghost**: Hayalet önizleme çizilir
5. **Active Piece**: Aktif tetromino çizilir
6. **UI Panels**: Hold ve next preview güncellenir

### Optimizasyonlar

- **Canvas Scaling**: Tek seferlik scale işlemi
- **RequestAnimationFrame**: Browser-optimized rendering
- **Object Pooling**: Parçacık yönetimi
- **Conditional Rendering**: Null check'ler ile gereksiz çizim engellenir
- **Shadow Control**: Shadow blur minimize edildi

### Browser Uyumluluğu

| Tarayıcı | Minimum Versiyon |
|----------|------------------|
| Chrome   | 61+ |
| Firefox  | 60+ |
| Safari   | 11+ |
| Edge     | 79+ |

---

## 🐛 Bilinen Sorunlar

- ~~CORS policy ile doğrudan dosya açma~~ ✅ Çözüldü (HTTP sunucu gerekli)
- ~~Space tuşu başlatma sorunu~~ ✅ Çözüldü (PLAY butonu eklendi)

---

## 🔮 Gelecek Geliştirmeler

- [ ] Mobil dokunmatik kontroller
- [ ] Ses efektleri ve müzik
- [ ] High score tablosu (LocalStorage)
- [ ] Replay sistemi
- [ ] Multiplayer mod
- [ ] Özelleştirilebilir temalar
- [ ] Touchscreen gesture desteği
- [ ] PWA (Progressive Web App) desteği

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

---

## 👨‍💻 Geliştirici

**Can Sağnak**

---

## 🙏 Teşekkürler

- Tetris™ - The Tetris Company
- SRS Rotasyon Sistemi
- HTML5 Canvas API
- Google Fonts (Outfit)

---

<div align="center">

**⭐ Beğendiyseniz yıldız vermeyi unutmayın! ⭐**

Yapım Yılı: 2025

</div>
