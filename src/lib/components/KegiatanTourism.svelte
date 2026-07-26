<script>
  import { onMount } from 'svelte';
  import { viewport } from '$lib/actions/viewport.js';
  import { fly } from 'svelte/transition';
  import { getEvents } from '$lib/api';

  const defaultData = [
    {
      id: 1,
      judul: 'Upacara Reba',
      tanggal: '30 Juli 2026',
      deskripsi: 'Perayaan tahun baru masyarakat Ngada untuk menghormati leluhur dan mensyukuri hasil panen. Ditandai dengan makan ubi bersama dan tarian massal.',
      foto: '/hero-1.jpg'
    },
    {
      id: 2,
      judul: "Tarian Ja'i Massal",
      tanggal: '10 Agustus 2026',
      deskripsi: 'Tarian kegembiraan yang dilakukan secara melingkar. Wisatawan sering diajak bergabung untuk merasakan kebersamaan dan ritme gong gendang khas Flores.',
      foto: '/hero-2.png'
    },
    {
      id: 3,
      judul: 'Ritual Pembersihan Mata Air',
      tanggal: '24 Desember 2026',
      deskripsi: 'Upacara sakral yang dipimpin oleh tetua adat di hulu sumber air panas Mengeruda sebagai bentuk penghormatan kepada alam yang memberikan kesembuhan.',
      foto: '/hero-1.jpg'
    }
  ];

  let kegiatanData = $state(defaultData);

  onMount(async () => {
    try {
      const res = await getEvents();
      if (res && res.length > 0) {
        kegiatanData = res.map((item) => ({
          id: item.id,
          judul: item.name || 'Kegiatan Wisata',
          tanggal: item.date || '',
          deskripsi: item.location ? `Lokasi: ${item.location}` : '',
          foto: item.image ? (item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/storage/${item.image}`) : '/hero-1.jpg'
        }));
      }
    } catch (e) {
      console.error('Gagal memuat kegiatan:', e);
    }
  });

  let isVisible = $state(false);
</script>

<section id="event" class="w-full py-24 bg-[#160E0A] border-t border-[#2a1d13]">
  <div class="max-w-[1300px] mx-auto px-6">
    
    <!-- Header -->
    <div 
      class="text-center mb-16"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        <div in:fly={{ y: 30, duration: 1000 }}>
          <h2 class="text-3xl md:text-[40px] font-serif font-bold text-[#FACC15] mb-4">
            Kegiatan & Upacara Adat
          </h2>
          <p class="text-gray-300 font-sans text-base md:text-lg max-w-2xl mx-auto">
            Saksikan dan rasakan langsung denyut nadi kebudayaan desa kami melalui berbagai ritual dan perayaan warisan leluhur.
          </p>
        </div>
      {/if}
    </div>

    <!-- Cards Grid -->
    <div 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        {#each kegiatanData as item, i}
          <div 
            in:fly={{ y: 50, duration: 800, delay: i * 150 }}
            class="bg-[#1F140D] rounded-[32px] overflow-hidden shadow-2xl flex flex-col group transition-all duration-300 border border-[#3A291D] hover:border-[#FACC15]/40 hover:-translate-y-2"
          >
            <!-- Image Area -->
            <div class="relative h-[240px] overflow-hidden">
              <img src={item.foto} alt={item.judul} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              <!-- Gradient Overlay for readability -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#1F140D] via-transparent to-transparent opacity-90"></div>
              
              <!-- Date Badge -->
              <div class="absolute bottom-4 left-6 bg-[#160E0A]/80 backdrop-blur-sm border border-[#FACC15]/30 text-[#FACC15] px-4 py-1.5 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                </svg>
                {item.tanggal}
              </div>
            </div>
            
            <!-- Content Area -->
            <div class="px-8 pb-8 pt-6 flex flex-col flex-grow">
              <!-- Horizontal Yellow Line -->
              <div class="w-12 h-[3px] bg-[#FACC15] mb-5 rounded-full"></div>
              
              <h3 class="text-2xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-[#FACC15] transition-colors">
                {item.judul}
              </h3>
              
              <p class="text-gray-400 font-sans text-[15px] leading-relaxed text-justify mb-8 flex-grow">
                {item.deskripsi}
              </p>
              
              <div class="mt-auto">
                <a href="/kegiatan/{item.id}" class="text-[#FACC15] font-sans font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Pelajari Lebih Lanjut
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>

  </div>
</section>
