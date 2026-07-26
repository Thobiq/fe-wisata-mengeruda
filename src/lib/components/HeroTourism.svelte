<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { getProfile } from '$lib/api';

  let currentImageIndex = $state(0);
  const images = [
    '/hero-1.jpg',
    '/hero-2.png'
  ];

  let isLoaded = $state(false);
  let slogan = $state('Eksplorasi keajaiban geoheritage Desa Mengeruda. Dari vulkanisme purba hingga hangatnya mata air penyembuh.');

  onMount(async () => {
    isLoaded = true;
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 5000);

    try {
      const res = await getProfile();
      if (res) {
        if (res.deskripsi_singkat) {
          slogan = res.deskripsi_singkat;
        }
        if (res.hero_images && Array.isArray(res.hero_images) && res.hero_images.length > 0) {
          images.length = 0;
          res.hero_images.forEach(img => {
            const url = img.startsWith('http') || img.startsWith('/') ? img : `${import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/storage/${img.replace('/storage/', '')}`;
            images.push(url);
          });
        } else if (res.hero_image || res.banner_url || res.foto) {
          const img = res.hero_image || res.banner_url || res.foto;
          const url = img.startsWith('http') || img.startsWith('/') ? img : `${import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/storage/${img.replace('/storage/', '')}`;
          images[0] = url;
        }
      }
    } catch (e) {
      console.error('Gagal mengambil profil hero:', e);
    }

    return () => clearInterval(interval);
  });
</script>

<section class="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
  
  <!-- Image Slider Background -->
  {#each images as image, i}
    {#if i === currentImageIndex}
      <img 
        src={image} 
        alt="Hero Background {i}" 
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        transition:fade={{ duration: 1000 }}
      />
    {/if}
  {/each}

  <!-- Dark Overlay to ensure text readability -->
  <div class="absolute inset-0 bg-[#1B120C]/60"></div>

  <!-- Hero Content -->
  {#if isLoaded}
    <div class="relative z-10 flex flex-col items-center text-center max-w-4xl px-6" in:fly={{ y: 30, duration: 1500, delay: 300 }}>
      
      <h3 class="text-white tracking-[0.2em] uppercase text-sm md:text-base font-medium mb-4">
        Tourism Information Center
      </h3>
      
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
        Jelajahi Jejak <span class="text-[#FACC15]">Geologi Purba</span><br/>
        di Desa Mengeruda
      </h1>
      
      <p class="text-gray-200 text-lg md:text-xl font-sans max-w-2xl mb-10 leading-relaxed">
        {slogan}
      </p>
      
      <a href="#sejarah" class="bg-[#FACC15] hover:bg-[#eab308] text-[#1B120C] font-bold font-sans text-[15px] md:text-base px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
        Selengkapnya
      </a>

    </div>
  {/if}

</section>
