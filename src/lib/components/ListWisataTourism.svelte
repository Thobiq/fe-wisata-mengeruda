<script>
  import { onMount } from 'svelte';
  import { viewport } from '$lib/actions/viewport.js';
  import { fly } from 'svelte/transition';
  import { getAttractions, getUmkms } from '$lib/api';

  const defaultData = [
    {
      id: 'wisata-1',
      nama: 'Wisata Air Panas Mengeruda',
      kategori: 'Wisata',
      lokasi: 'Mengeruda',
      harga: 'Rp10.000',
      foto: '/hero-1.jpg',
      href: '/wisata/1'
    },
    {
      id: 'wisata-2',
      nama: 'Taman Ziarah Maria Fatima',
      kategori: 'Wisata',
      lokasi: 'Mengeruda',
      harga: 'Gratis',
      foto: '/hero-2.png',
      href: '/wisata/2'
    },
    {
      id: 'umkm-1',
      nama: 'Restaurant Khas Mengeruda',
      kategori: 'Restaurant',
      lokasi: 'Mengeruda',
      harga: 'Bervariasi',
      foto: '/hero-1.jpg',
      href: '/store/1'
    }
  ];

  let dataWisata = $state(defaultData);

  onMount(async () => {
    try {
      const [attractions, umkms] = await Promise.all([
        getAttractions().catch(() => []),
        getUmkms().catch(() => [])
      ]);

      let combined = [];

      if (attractions && attractions.length > 0) {
        combined.push(
          ...attractions.map((item) => ({
            id: `wisata-${item.id}`,
            originalId: item.id,
            nama: item.name || 'Tempat Wisata',
            kategori: 'Wisata',
            lokasi: item.address || 'Mengeruda',
            harga: item.price || 'Gratis',
            foto: item.image ? (item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/storage/${item.image}`) : '/hero-1.jpg',
            href: `/wisata/${item.id}`
          }))
        );
      }

      if (umkms && umkms.length > 0) {
        combined.push(
          ...umkms.map((item) => ({
            id: `umkm-${item.id}`,
            originalId: item.id,
            nama: item.name || 'Toko UMKM',
            kategori: 'Restaurant',
            lokasi: item.address || 'Mengeruda',
            harga: 'Bervariasi',
            foto: item.logo ? (item.logo.startsWith('http') || item.logo.startsWith('/') ? item.logo : `/storage/${item.logo}`) : '/hero-2.png',
            href: `/store/${item.id}`
          }))
        );
      }

      if (combined.length > 0) {
        dataWisata = combined;
      }
    } catch (e) {
      console.error('Gagal mengambil data wisata dan UMKM:', e);
    }
  });

  let selectedCategory = $state('Semua');
  const categories = ['Semua', 'Wisata', 'Restaurant', 'Kerajinan', 'Penginapan'];

  let filteredData = $derived(
    dataWisata.filter(item => {
      return selectedCategory === 'Semua' || item.kategori === selectedCategory;
    })
  );

  let isVisible = $state(false);
</script>

<section id="wisata" class="w-full py-24 bg-[#1B120C]">
  <div class="max-w-[1300px] mx-auto px-6">
    
    <!-- Header -->
    <div id="umkm" class="scroll-mt-24"></div>
    <div 
      class="text-center mb-16"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        <div in:fly={{ y: 30, duration: 1000 }}>
          <h2 class="text-3xl md:text-[40px] font-serif font-bold text-[#FACC15] mb-4">
            Akomodasi & Jelajah Kuliner
          </h2>
          <p class="text-gray-300 font-sans text-base md:text-lg max-w-xl mx-auto">
            Jelajahi zona kolam, fasilitas, dan rute trekking ekspedisi purba di area Pemandian Air Panas Soa.
          </p>
        </div>
      {/if}
    </div>

    <!-- Filter Buttons -->
    <div 
      class="flex flex-wrap justify-center gap-3 mb-12"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        {#each categories as category, i}
          <button 
            in:fly={{ y: 20, duration: 600, delay: i * 100 }}
            class="px-6 py-2.5 rounded-full font-serif font-bold text-sm md:text-base transition-all duration-300 border 
              {selectedCategory === category 
                ? 'bg-[#FACC15] border-[#FACC15] text-[#1B120C] shadow-lg scale-105' 
                : 'bg-transparent border-[#FACC15] text-[#FACC15] hover:bg-[#FACC15]/20'}"
            onclick={() => selectedCategory = category}
          >
            {category}
          </button>
        {/each}
      {/if}
    </div>

    <!-- Cards Grid -->
    <div 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      use:viewport
      onenterViewport={() => isVisible = true}
    >
      {#if isVisible}
        {#each filteredData as item, i (item.id)}
          <a 
            href={item.href || ('/wisata/' + (item.originalId || item.id))}
            in:fly={{ y: 50, duration: 800, delay: (i % 4) * 150 }}
            class="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <!-- Image Area -->
            <div class="relative h-[200px] overflow-hidden">
              <img src={item.foto} alt={item.nama} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            
            <!-- Content Area -->
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center text-gray-500 text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1 text-gray-400">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  {item.lokasi}
                </div>
                <span class="bg-[#FEF9C3] text-[#A16207] px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {item.kategori}
                </span>
              </div>
              
              <h3 class="text-xl font-serif font-bold text-[#2A1B12] mb-5 leading-tight group-hover:text-[#A16207] transition-colors">
                {item.nama}
              </h3>
              
              <div class="mt-auto"></div>
              <div class="w-full h-px bg-gray-200 mb-5 mt-3"></div>
              
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs font-serif text-gray-500 font-bold mb-1">Harga Tiket</p>
                  <p class="text-lg font-serif font-bold text-[#A16207] leading-none">{item.harga}</p>
                </div>
                <button class="bg-[#2A1B12] hover:bg-[#1B120C] text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  Lokasi
                </button>
              </div>
            </div>
          </a>
        {/each}
      {/if}
    </div>

  </div>
</section>
