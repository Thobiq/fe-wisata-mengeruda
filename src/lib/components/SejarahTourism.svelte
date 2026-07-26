<script>
  import { onMount } from 'svelte';
  import { viewport } from '$lib/actions/viewport.js';
  import { fade, fly } from 'svelte/transition';
  import { getProfile } from '$lib/api';

  let isVisible = $state(false);
  let sejarahText = $state('Mengeruda merupakan kawasan geo-wisata yang terkenal dengan kolam pemandian air panas alami dan penemuan batuan purba. Desa ini telah menjadi titik kumpul masyarakat lokal dalam merayakan hasil bumi.');

  onMount(async () => {
    try {
      const res = await getProfile();
      if (res && res.sejarah) {
        sejarahText = res.sejarah;
      }
    } catch (e) {
      console.error('Gagal memuat sejarah wisata:', e);
    }
  });
</script>

<section id="sejarah" class="w-full py-24 bg-[#1B120C]">
  <div class="max-w-[1300px] mx-auto px-6">
    <div 
      class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      
      <!-- Kolom Teks -->
      {#if isVisible}
        <div class="flex flex-col items-start" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
          <h2 class="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Sejarah Sumber<br/>
            <span class="text-[#FACC15]">Air Panas Mengeruda</span>
          </h2>
          
          <p class="text-gray-300 font-sans text-base md:text-lg leading-relaxed mb-8 text-justify">
            {sejarahText}
          </p>
          
          <a href="#explore" class="bg-[#FACC15] hover:bg-[#eab308] text-[#1B120C] font-bold font-sans text-[15px] px-8 py-3 rounded-full transition-transform hover:-translate-y-1 shadow-md">
            Selengkapnya
          </a>
        </div>
      {/if}

      <!-- Kolom Gambar -->
      {#if isVisible}
        <div class="w-full rounded-2xl overflow-hidden shadow-2xl" in:fly={{ x: 50, duration: 1000, delay: 400 }}>
          <img 
            src="/hero-1.jpg" 
            alt="Sumber Air Panas Mengeruda" 
            class="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" 
          />
        </div>
      {/if}

    </div>
  </div>
</section>
