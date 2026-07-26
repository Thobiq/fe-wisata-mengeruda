<script>
  import { onMount } from 'svelte';
  import { viewport } from '$lib/actions/viewport.js';
  import { fly } from 'svelte/transition';
  import { getGalleries } from '$lib/api';

  const defaultGallery = [
    {
      id: 1,
      judul: 'Kawah Utama Air Panas',
      foto: '/hero-1.jpg',
      gridClass: 'md:col-span-2 md:row-span-2'
    },
    {
      id: 2,
      judul: 'Desa Adat Bena',
      foto: '/hero-2.png',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 3,
      judul: 'Festival Budaya',
      foto: '/hero-1.jpg',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 4,
      judul: 'Aktivitas Tenun Ikat',
      foto: '/hero-2.png',
      gridClass: 'md:col-span-2 md:row-span-1'
    },
    {
      id: 5,
      judul: 'Lembah Hijau Mengeruda',
      foto: '/hero-1.jpg',
      gridClass: 'md:col-span-1 md:row-span-2'
    }
  ];

  let galleryData = $state(defaultGallery);

  const gridClasses = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-1 md:row-span-2'
  ];

  onMount(async () => {
    try {
      const res = await getGalleries('Semua');
      if (res && res.length > 0) {
        galleryData = res.map((item, idx) => ({
          id: item.id,
          judul: item.title || 'Foto Wisata',
          foto: item.image ? (item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/storage/${item.image}`) : '/hero-1.jpg',
          gridClass: gridClasses[idx % gridClasses.length]
        }));
      }
    } catch (e) {
      console.error('Gagal memuat galeri:', e);
    }
  });

  let isVisible = $state(false);
</script>

<section id="galeri" class="w-full py-24 bg-[#1B120C] border-t border-[#3A291D]">
  <div class="max-w-[1300px] mx-auto px-6">
    
    <!-- Header -->
    <div 
      class="text-center mb-16 flex flex-col items-center"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        <div in:fly={{ y: 30, duration: 1000 }} class="flex flex-col items-center">
          
          <!-- Top Icon & Lines -->
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-[1px] bg-[#FACC15]/50"></div>
            <div class="text-[#FACC15]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <div class="w-12 h-[1px] bg-[#FACC15]/50"></div>
          </div>

          <h2 class="text-3xl md:text-[40px] font-serif font-bold text-[#FACC15] mb-4">
            Galeri Geoheritage
          </h2>
          <p class="text-gray-300 font-sans text-base md:text-lg max-w-2xl mx-auto">
            Potret keindahan alam, jejak bumi, dan kehidupan masyarakat Desa Mengeruda yang terekam dalam lensa.
          </p>
        </div>
      {/if}
    </div>

    <!-- Gallery Grid -->
    <div 
      class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 min-h-[400px] md:h-[600px] lg:h-[800px]"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        {#each galleryData as item, i}
          <div 
            in:fly={{ y: 50, duration: 800, delay: i * 150 }}
            class="{item.gridClass} group relative rounded-[24px] overflow-hidden shadow-lg border border-[#3A291D]/50 bg-[#160E0A]"
          >
            <!-- Image -->
            <img 
              src={item.foto} 
              alt={item.judul} 
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center backdrop-blur-[2px]">
              <h3 class="text-white font-serif font-bold text-xl md:text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.judul}
              </h3>
            </div>
          </div>
        {/each}
      {/if}
    </div>

  </div>
</section>
