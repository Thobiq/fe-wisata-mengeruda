<script>
  import { onMount } from 'svelte';
  import { viewport } from '$lib/actions/viewport.js';
  import { fly } from 'svelte/transition';
  import { getProducts } from '$lib/api';

  let { umkmId = null } = $props();

  const defaultCatalog = [
    {
      id: 1,
      nama: 'Wisata Air Panas Mengeruda',
      kategori: 'Tempat Wisata',
      lokasi: 'Mengeruda',
      harga: 'Rp10.000',
      foto: '/hero-1.jpg'
    },
    {
      id: 2,
      nama: 'Wisata Air Panas Mengeruda',
      kategori: 'Tempat Wisata',
      lokasi: 'Mengeruda',
      harga: 'Rp10.000',
      foto: '/hero-1.jpg'
    },
    {
      id: 3,
      nama: 'Wisata Air Panas Mengeruda',
      kategori: 'Tempat Wisata',
      lokasi: 'Mengeruda',
      harga: 'Rp10.000',
      foto: '/hero-1.jpg'
    }
  ];

  let catalogData = $state(defaultCatalog);

  onMount(async () => {
    if (umkmId) {
      try {
        const res = await getProducts(umkmId);
        if (res && res.length > 0) {
          catalogData = res.map(item => ({
            id: item.id,
            nama: item.name || 'Produk UMKM',
            kategori: 'Produk',
            lokasi: 'Desa Mengeruda',
            harga: `Rp${Number(item.price || 0).toLocaleString('id-ID')}`,
            foto: item.image ? (item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/storage/${item.image}`) : '/hero-1.jpg'
          }));
        }
      } catch (e) {
        console.error('Gagal memuat produk toko:', e);
      }
    }
  });

  let isVisible = $state(false);
</script>

<div 
  class="min-h-[400px]"
  use:viewport
  onenterViewport={() => isVisible = true}
>
  {#if isVisible}
    <!-- Title -->
    <h2 class="text-3xl font-serif font-bold text-white mb-10" in:fly={{ y: 30, duration: 800 }}>
      Katalog Produk
    </h2>
    
    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each catalogData as item, i}
        <a 
          href="/produk/{item.id}"
          in:fly={{ y: 50, duration: 800, delay: i * 150 }}
          class="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
          <!-- Image Area -->
          <div class="relative h-[250px] overflow-hidden">
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
                <p class="text-lg font-serif font-bold text-[#2A1B12] leading-none">{item.harga}</p>
              </div>
              <button class="bg-[#4A392D] hover:bg-[#2A1B12] text-white px-5 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                Lokasi
              </button>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
