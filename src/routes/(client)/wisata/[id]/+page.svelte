<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getAttraction } from '$lib/api';
  import { fly } from 'svelte/transition';

  let id = $derived($page.params.id);

  const defaultAttraction = {
    id: 1,
    nama: 'Wisata Air Panas Mengeruda',
    lokasi: 'Kawasan Inti Desa Mengeruda, Soa, Ngada',
    harga: 'Rp 10.000',
    deskripsi: 'Sumber mata air panas alami bersuhu hangat konstan dengan kolam berundak yang indah serta aliran air terjun belerang yang menyehatkan kulit.',
    foto: '/hero-1.jpg'
  };

  let attraction = $state(defaultAttraction);
  let loading = $state(true);

  onMount(async () => {
    try {
      const res = await getAttraction(id);
      if (res) {
        attraction = {
          id: res.id,
          nama: res.name || 'Tempat Wisata Mengeruda',
          lokasi: res.address || 'Desa Mengeruda, Soa, Ngada',
          harga: res.price || 'Gratis',
          deskripsi: res.description || defaultAttraction.deskripsi,
          foto: res.image ? (res.image.startsWith('http') || res.image.startsWith('/') ? res.image : `/storage/${res.image}`) : '/hero-1.jpg'
        };
      }
    } catch (e) {
      console.error('Gagal memuat detail wisata:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{attraction.nama} - Tourism Information Center</title>
</svelte:head>

<main class="w-full bg-[#161311] min-h-screen text-gray-200">
  <!-- Hero Section dengan Background Image -->
  <div class="relative w-full h-[55vh] min-h-[420px] flex flex-col justify-end">
    <!-- Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <img 
        src={attraction.foto} 
        alt={attraction.nama} 
        class="w-full h-full object-cover"
      />
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#161311]/50 via-[#161311]/75 to-[#161311]"></div>
    </div>
    
    <!-- Konten Judul di Atas Gambar -->
    <div class="relative z-10 max-w-[1200px] mx-auto w-full px-6 pb-12">
      <!-- Tombol Kembali -->
      <a href="/" class="inline-flex items-center gap-2 text-[#C79F44] hover:text-white transition-colors mb-8 group bg-[#161311]/60 px-5 py-2.5 rounded-full backdrop-blur-md border border-[#C79F44]/30 w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span class="font-serif text-sm font-semibold tracking-wide">Kembali ke Beranda</span>
      </a>

      <!-- Kategori Badge & Lokasi -->
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <span class="bg-[#FACC15] text-[#1B120C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Tempat Wisata
        </span>
        <div class="flex items-center gap-1.5 text-sm text-[#B6A085]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-[#C79F44]">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          {attraction.lokasi}
        </div>
      </div>
      
      <!-- Judul Wisata -->
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
        {attraction.nama}
      </h1>
    </div>
  </div>

  <!-- Detail Content Section -->
  <div class="max-w-[1200px] mx-auto px-6 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      
      <!-- Kolom Kiri: Deskripsi -->
      <div class="lg:col-span-2 space-y-6">
        <h2 class="text-2xl font-serif font-bold text-[#FACC15] border-b border-[#332418] pb-3">
          Tentang Destinasi
        </h2>
        <div class="text-gray-300 font-sans text-base md:text-lg leading-relaxed whitespace-pre-line text-justify">
          {attraction.deskripsi}
        </div>
      </div>

      <!-- Kolom Kanan: Card Tiket / Harga -->
      <div class="bg-[#201813] border border-[#3A2D23] rounded-3xl p-8 shadow-2xl space-y-6">
        <h3 class="text-xl font-serif font-bold text-[#FACC15]">
          Informasi Tiket Masuk
        </h3>
        
        <div class="flex flex-col gap-2">
          <span class="text-xs text-[#B6A085] uppercase tracking-wider">Harga Tiket / Tarif</span>
          <span class="text-2xl font-bold text-white">{attraction.harga}</span>
        </div>

        <div class="border-t border-[#3A2D23] pt-6 space-y-3 text-sm text-gray-400">
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#FACC15]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Jam Operasional: 06:00 - 18:00 WITA</span>
          </div>
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#FACC15]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>Lokasi: {attraction.lokasi}</span>
          </div>
        </div>

        <a 
          href="https://maps.google.com/?q={encodeURIComponent(attraction.nama + ' ' + attraction.lokasi)}"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full inline-flex items-center justify-center gap-2 bg-[#FACC15] hover:bg-[#eab308] text-[#1B120C] font-bold py-3.5 px-6 rounded-full transition-transform hover:-translate-y-0.5 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          Buka di Google Maps
        </a>
      </div>

    </div>
  </div>
</main>
