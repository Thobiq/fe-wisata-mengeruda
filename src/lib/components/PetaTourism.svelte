<script>
  import { onMount } from 'svelte';
  import { viewport } from '$lib/actions/viewport.js';
  import { fly } from 'svelte/transition';
  import { getAttractions, getUmkms } from '$lib/api';

  let mapElement;
  let isVisible = $state(false);
  let mapInitialized = false;

  onMount(async () => {
    // Preload leaflet CSS
    import('leaflet/dist/leaflet.css');
  });

  $effect(() => {
    if (isVisible && mapElement && !mapInitialized) {
      mapInitialized = true;
      import('leaflet').then(async L => {
        const map = L.map(mapElement, {
          center: [-8.7611, 121.0583],
          zoom: 14,
          scrollWheelZoom: false
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
          if (attractions && attractions.length > 0) {
            attractions.forEach((item) => {
              const offsetLat = baseLat + (index * 0.0025 - 0.002);
              const offsetLng = baseLng + ((index % 2 === 0 ? 1 : -1) * index * 0.003);
              const popupHtml = `
                <div style="font-family: serif; font-size: 14px;">
                  <strong style="color: #1B120C;">${item.name || 'Tempat Wisata'}</strong><br/>
                  <span style="font-size: 12px; color: #666;">${item.address || 'Desa Mengeruda'}</span><br/>
                  <a href="/wisata/${item.id}" style="display: inline-block; margin-top: 6px; color: #C79F44; font-weight: bold; text-decoration: none;">Lihat Detail →</a>
                </div>
              `;
              L.marker([offsetLat, offsetLng]).addTo(map).bindPopup(popupHtml);
              index++;
            });
          }

          if (umkms && umkms.length > 0) {
            umkms.forEach((item) => {
              const offsetLat = baseLat - (index * 0.002);
              const offsetLng = baseLng + ((index % 2 === 0 ? -1 : 1) * index * 0.0025);
              const popupHtml = `
                <div style="font-family: serif; font-size: 14px;">
                  <strong style="color: #1B120C;">${item.name || 'Toko UMKM'}</strong><br/>
                  <span style="font-size: 12px; color: #666;">${item.address || 'Desa Mengeruda'}</span><br/>
                  <a href="/store/${item.id}" style="display: inline-block; margin-top: 6px; color: #C79F44; font-weight: bold; text-decoration: none;">Kunjungi Toko →</a>
                </div>
              `;
              L.marker([offsetLat, offsetLng]).addTo(map).bindPopup(popupHtml);
              index++;
            });
          }

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
      });
    }
  });

</script>

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
      class="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl relative bg-[#2A1B12]"
    >
      {#if isVisible}
        <div in:fly={{ y: 40, duration: 1200, delay: 200 }} class="w-full h-full">
          <div bind:this={mapElement} class="w-full h-full z-0"></div>
        </div>
      {/if}
    </div>

  </div>
</section>
