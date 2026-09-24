<script>
  import { onMount } from 'svelte';
  import { viewport } from '$lib/actions/viewport.js';
  import { fly } from 'svelte/transition';
  import { getAttractions, getUmkms } from '$lib/api';

  let mapElement;
  let isVisible = $state(false);
  let mapInitialized = false;
  let listLokasi = $state([]);

  onMount(async () => {
    // Preload leaflet CSS and gesture handling CSS
    import('leaflet/dist/leaflet.css');
    import('leaflet-gesture-handling/dist/leaflet-gesture-handling.css');
  });

  $effect(() => {
    if (isVisible && mapElement && !mapInitialized) {
      mapInitialized = true;
      import('leaflet').then(async (leaflet) => {
        const L = leaflet.default || leaflet;
        window.L = L; // Make L global for leaflet-gesture-handling
        
        import('leaflet-gesture-handling').then(async (gestureHandling) => {
          const GestureHandling = gestureHandling.GestureHandling || gestureHandling.default;
          
          L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

          const map = L.map(mapElement, {
            center: [-8.7611, 121.0583],
            zoom: 14,
            gestureHandling: true // Mencegah scroll langsung tanpa CTRL / 2 jari
          });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        try {
          const [attractions, umkms] = await Promise.all([
            getAttractions().catch(() => []),
            getUmkms().catch(() => [])
          ]);

          const baseLat = -8.7611;
          const baseLng = 121.0583;
          let index = 0;
          let lokasi = [];

          if (attractions && attractions.length > 0) {
            attractions.forEach((item) => {
              // Gunakan koordinat asli dari database jika ada, jika tidak gunakan fallback
              let lat = item.latitude ? parseFloat(item.latitude) : baseLat + (index * 0.0025 - 0.002);
              let lng = item.longitude ? parseFloat(item.longitude) : baseLng + ((index % 2 === 0 ? 1 : -1) * index * 0.003);
              
              const popupHtml = `
                <div style="font-family: serif; font-size: 14px;">
                  <strong style="color: #1B120C;">${item.name || 'Tempat Wisata'}</strong><br/>
                  <span style="font-size: 12px; color: #666;">${item.address || 'Desa Mengeruda'}</span><br/>
                  <a href="/wisata/${item.id}" style="display: inline-block; margin-top: 6px; color: #C79F44; font-weight: bold; text-decoration: none;">Lihat Detail →</a>
                </div>
              `;
              L.marker([lat, lng]).addTo(map).bindPopup(popupHtml);
              
              lokasi.push({
                id: item.id,
                name: item.name,
                address: item.address,
                type: 'Wisata',
                link: `/wisata/${item.id}`,
                image: item.image
              });
              index++;
            });
          }

          if (umkms && umkms.length > 0) {
            umkms.forEach((item) => {
              // Gunakan koordinat asli dari database jika ada, jika tidak gunakan fallback
              let lat = item.latitude ? parseFloat(item.latitude) : baseLat - (index * 0.002);
              let lng = item.longitude ? parseFloat(item.longitude) : baseLng + ((index % 2 === 0 ? -1 : 1) * index * 0.0025);
              
              const popupHtml = `
                <div style="font-family: serif; font-size: 14px;">
                  <strong style="color: #1B120C;">${item.name || 'Toko UMKM'}</strong><br/>
                  <span style="font-size: 12px; color: #666;">${item.address || 'Desa Mengeruda'}</span><br/>
                  <a href="/store/${item.id}" style="display: inline-block; margin-top: 6px; color: #C79F44; font-weight: bold; text-decoration: none;">Kunjungi Toko →</a>
                </div>
              `;
              L.marker([lat, lng]).addTo(map).bindPopup(popupHtml);
              
              lokasi.push({
                id: item.id,
                name: item.name,
                address: item.address,
                type: 'UMKM',
                link: `/store/${item.id}`,
                image: item.logo
              });
              index++;
            });
          }

          listLokasi = lokasi;

          if (index === 0) {
            L.marker([baseLat, baseLng]).addTo(map)
              .bindPopup('Pemandian Air Panas Mengeruda')
              .openPopup();
          }
        } catch (e) {
          L.marker([-8.7611, 121.0583]).addTo(map)
            .bindPopup('Pemandian Air Panas Mengeruda')
            .openPopup();
        }
        }); // close gestureHandling import
      }); // close leaflet import
    }
  });

</script>

<style>
  /* Styling to ensure gesture handling overlay looks nice */
  :global(.leaflet-gesture-handling-warning) {
    font-family: 'Inter', sans-serif !important;
    background: rgba(0, 0, 0, 0.7) !important;
    color: white !important;
    font-weight: 600 !important;
    border-radius: 1rem !important;
  }
</style>

<section id="maps" class="w-full py-20 bg-[#160E0A] border-y border-[#332418]">
  <div class="max-w-[1300px] mx-auto px-6">
    
    <div 
      class="text-center mb-12"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        <div in:fly={{ y: 30, duration: 1000 }}>
          <h2 class="text-3xl md:text-[40px] font-serif font-bold text-[#FACC15] mb-4">
            Peta Wisata Air Panas Mengeruda
          </h2>
          <p class="text-gray-300 font-sans text-base md:text-lg max-w-xl mx-auto">
            Jelajahi zona kolam, fasilitas, dan rute trekking ekspedisi purba di area Pemandian Air Panas Soa.
          </p>
        </div>
      {/if}
    </div>

    <!-- Map Container -->
    <div 
      use:viewport
      onenterViewport={() => isVisible = true}
      class="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl relative bg-[#2A1B12] mb-12"
    >
      {#if isVisible}
        <div in:fly={{ y: 40, duration: 1200, delay: 200 }} class="w-full h-full">
          <div bind:this={mapElement} class="w-full h-full z-0"></div>
        </div>
      {/if}
    </div>

    <!-- List Lokasi Section -->
    {#if isVisible && listLokasi.length > 0}
      <div in:fly={{ y: 40, duration: 1200, delay: 400 }}>
        <h3 class="text-2xl font-serif font-bold text-white mb-6 border-b border-[#332418] pb-4 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#C79F44" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          Daftar Titik Lokasi
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {#each listLokasi as lokasi}
            <a href={lokasi.link} class="group bg-[#1F140D] hover:bg-[#2A1B12] border border-[#332418] hover:border-[#C79F44] rounded-2xl p-4 flex gap-4 transition-all duration-300 shadow-md hover:shadow-xl">
              <div class="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#332418] border border-[#332418]">
                {#if lokasi.image}
                  <img src={lokasi.image} alt={lokasi.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {:else}
                  <div class="w-full h-full flex items-center justify-center text-[#6D5D51]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                  </div>
                {/if}
              </div>
              <div class="flex flex-col justify-center overflow-hidden">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#C79F44] mb-1 px-2 py-0.5 bg-[#C79F44]/10 rounded-full w-max">{lokasi.type}</span>
                <h4 class="text-base font-serif font-bold text-gray-100 group-hover:text-white truncate">{lokasi.name}</h4>
                <p class="text-xs text-gray-400 truncate mt-0.5">{lokasi.address || 'Desa Mengeruda'}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

  </div>
</section>
