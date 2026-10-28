import { site } from '../config/site.ts'
import type { Dictionary } from '../types/site.ts'

// Draft copy pending owner and editorial approval (O-07).
export const id: Dictionary = {
  meta: {
    title: `${site.name} — Notaris & PPAT di Bali`,
    description: `Profil profesional ${site.name}, ${site.titles}, Notaris & PPAT di Kerobokan, Badung, Bali: bidang praktik, kantor, dan lokasi.`,
  },
  a11y: {
    skipToContent: 'Lewati ke konten utama',
    logoHome: 'beranda',
    mainNav: 'Navigasi utama',
    mobileNav: 'Navigasi seluler',
    footerNav: 'Navigasi kaki halaman',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    switchLanguage: 'Ganti bahasa ke English',
    newTab: '(membuka tab baru)',
    closeDialog: 'Tutup detail',
  },
  designSwitch: { label: 'Desain', v1: 'V1', v2: 'V2', v3: 'V3' },
  images: {
    headshot: `Potret ${site.name} mengenakan kemeja putih dan dasi gelap`,
    formal: `${site.name} mengenakan jas gelap di dalam kantor`,
    seated: `${site.name} duduk di meja kerja di depan laptop`,
    team: `${site.name} bersama tim kantor di depan dinding bertuliskan Notaris - PPAT`,
    writing: 'Tangan menulis di atas dokumen',
    exterior: 'Bagian depan gedung kantor dengan papan nama notaris',
    interior: 'Lorong kantor dengan karya seni di dinding',
  },
  logoSubtitle: 'Notaris · PPAT · Bali',
  languageCode: 'EN',
  languageName: 'English',
  nav: {
    home: 'Beranda',
    about: 'Tentang',
    practice: 'Bidang Praktik',
    office: 'Kantor',
    insights: 'Informasi',
  },
  officeLink: 'Lokasi Kantor',

  eyebrow: 'Praktik Notaris & PPAT di Bali',
  heroLead: 'Komitmen pada',
  heroAccent: 'ketelitian.',
  heroSecond: 'Berlandaskan',
  heroSecondAccent: 'kepercayaan.',
  heroDesc: `Mengenal lebih dekat ${site.name}, ${site.titles} serta informasi mengenai praktik kenotariatan dan pertanahan di Bali.`,
  heroAction: 'Tentang Saya',
  heroSecondAction: 'Bidang Praktik',
  photoSub: 'Notaris & PPAT',
  heroBadge: 'Notaris & PPAT · Bali',
  scroll: 'Gulir untuk menjelajah',

  aboutEyebrow: 'Tentang saya',
  aboutTitle: 'Profesionalisme yang berakar pada integritas.',
  aboutBody: 'Dalam setiap dokumen dan proses hukum, ketelitian dan tanggung jawab menjadi fondasi dari praktik kenotariatan. Halaman ini memperkenalkan latar belakang profesional dan bidang kewenangan yang dijalankan.',
  aboutBody2: 'Berbasis di Kabupaten Badung, Bali, kantor kami menjadi tempat berlangsungnya kegiatan kenotariatan dan pelayanan administrasi pertanahan sesuai ketentuan yang berlaku.',
  aboutExplore: 'Lihat Profil LinkedIn',
  credentials: [
    { title: site.titles, subtitle: 'Pendidikan teknik, hukum, dan kenotariatan' },
    { title: 'Praktik kenotariatan', subtitle: 'Akta autentik dan dokumen sesuai kewenangan notaris' },
    { title: 'Praktik pertanahan (PPAT)', subtitle: 'Akta terkait hak atas tanah sesuai kewenangan PPAT' },
    { title: 'Kantor di Badung, Bali', subtitle: 'Kerobokan, Kabupaten Badung' },
  ],

  principleEyebrow: 'Nilai profesional',
  principleTitle: 'Kepercayaan dibangun melalui setiap detail.',
  principleText: 'Ketelitian dalam dokumen, kerahasiaan informasi, dan kepatuhan pada ketentuan hukum menjadi bagian penting dari praktik notaris.',

  servicesEyebrow: 'Bidang praktik',
  servicesTitle: 'Ruang lingkup praktik profesional.',
  servicesText: 'Informasi umum mengenai bidang kewenangan notaris dan PPAT. Kewenangan dan layanan tertentu mengikuti pengangkatan serta peraturan yang berlaku.',
  servicesTextWithAuction: 'Informasi umum mengenai bidang kewenangan notaris, PPAT, dan pejabat lelang. Kewenangan dan layanan tertentu mengikuti pengangkatan serta peraturan yang berlaku.',
  more: 'Baca selengkapnya',
  services: {
    notary: {
      title: 'Kenotariatan',
      summary: 'Akta autentik, perjanjian, dan dokumen hukum sesuai kewenangan notaris.',
      detail: 'Bidang kenotariatan mencakup pembuatan akta autentik dan kegiatan lain yang diberikan kepada notaris berdasarkan peraturan perundang-undangan, termasuk aspek pendirian badan usaha dan perjanjian.',
    },
    ppat: {
      title: 'PPAT & Pertanahan',
      summary: 'Akta terkait hak atas tanah dan satuan rumah susun sesuai kewenangan PPAT.',
      detail: 'PPAT merupakan pejabat umum yang diberi kewenangan untuk membuat akta autentik mengenai perbuatan hukum tertentu atas tanah atau hak milik atas satuan rumah susun. Persyaratan ditentukan oleh jenis perbuatan hukum.',
    },
    auction: {
      title: 'Pejabat Lelang',
      summary: 'Informasi tentang pelelangan dan dokumentasi lelang sesuai ketentuan.',
      detail: 'Kegiatan pejabat lelang mengikuti peraturan dan batas kewenangan yang melekat pada pengangkatan pejabat yang bersangkutan.',
    },
  },
  modalTitle: 'Informasi Bidang Praktik',
  modalButton: 'Tutup',

  values: [
    { title: 'Integritas', desc: 'Menjunjung etika dan kewajiban profesional.' },
    { title: 'Ketelitian', desc: 'Memperhatikan detail dalam setiap dokumen.' },
    { title: 'Kerahasiaan', desc: 'Menghormati kerahasiaan informasi para pihak.' },
  ],

  teamEyebrow: 'Kantor kami',
  teamTitle: 'Lingkungan kerja yang profesional dan bersahabat.',
  teamText: `Dokumentasi kantor Notaris & PPAT ${site.name} di wilayah Kerobokan, Kabupaten Badung, Bali.`,
  locationText: 'Kerobokan, Kabupaten Badung, Bali, Indonesia',
  locationButton: 'Buka Google Maps',
  map: {
    note: 'Peta disediakan oleh Google Maps dan dimuat saat bagian ini ditampilkan.',
    iframeTitle: 'Peta lokasi kantor di Google Maps',
  },

  insightsEyebrow: 'Informasi',
  insightsTitle: 'Panduan singkat seputar dokumen hukum.',
  insightsBody: 'Pengetahuan dasar mengenai dokumen notarial dan pertanahan, untuk membantu memahami proses yang relevan.',
  insights: [
    {
      title: 'Apa itu akta autentik?',
      desc: 'Mengenal konsep akta autentik dalam hukum Indonesia.',
      detail: 'Akta autentik adalah akta yang dibuat dalam bentuk yang ditentukan undang-undang oleh atau di hadapan pejabat umum yang berwenang.',
    },
    {
      title: 'Peran Notaris dan PPAT',
      desc: 'Memahami perbedaan tugas dua jabatan publik tersebut.',
      detail: 'Notaris dan PPAT memiliki dasar kewenangan berbeda. Jenis dokumen dan tindakan hukum menentukan pejabat yang relevan.',
    },
    {
      title: 'Persiapan dokumen',
      desc: 'Mengapa kelengkapan dan keabsahan dokumen penting?',
      detail: 'Identitas, bukti kepemilikan, dan dokumen pendukung harus diperiksa sesuai kebutuhan setiap tindakan hukum.',
    },
  ],
  disclaimer: 'Konten bersifat informasi umum, bukan nasihat hukum untuk keadaan tertentu.',

  footerDescription: 'Informasi profil profesional dan praktik kenotariatan di Bali.',
  footerSite: 'Navigasi',
  footerConnect: 'Tautan',
  rights: 'Seluruh hak dilindungi.',
  footerTag: 'Notaris & PPAT · Bali',
}
