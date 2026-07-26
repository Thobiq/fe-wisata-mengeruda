<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import StoreInfo from '$lib/components/StoreInfo.svelte';
  import StoreCatalog from '$lib/components/StoreCatalog.svelte';
  import { getUmkms } from '$lib/api';

  let id = $derived($page.params.id);
  
  const defaultStore = {
    id: 1,
    nama: 'Warung Makan Bu Erni',
    logo: '/hero-1.jpg',
    lokasi: 'Mengeruda',
    deskripsi: 'Sentra kuliner dan UMKM pilihan di Desa Mengeruda dengan cita rasa otentik khas Ngada.',
    heroImage: '/hero-1.jpg',
    sosmed: {
      instagram: '#',
      facebook: '#',
      twitter: '#',
      website: '#'
    }
  };

  let store = $state(defaultStore);

  onMount(async () => {
    try {
      const umkms = await getUmkms();
      if (umkms && umkms.length > 0) {
        const found = umkms.find(u => String(u.id) === String(id));
        if (found) {
          store = {
            id: found.id,
            nama: found.name || 'UMKM Mengeruda',
            logo: found.logo ? (found.logo.startsWith('http') || found.logo.startsWith('/') ? found.logo : `/storage/${found.logo}`) : '/hero-1.jpg',
            lokasi: found.address || 'Desa Mengeruda',
            deskripsi: found.description || defaultStore.deskripsi,
            wa: found.wa || found.phone || '6281234567890',
            heroImage: found.logo ? (found.logo.startsWith('http') || found.logo.startsWith('/') ? found.logo : `/storage/${found.logo}`) : '/hero-1.jpg',
            sosmed: defaultStore.sosmed
          };
        }
      }
    } catch (e) {
      console.error('Gagal memuat detail toko:', e);
    }
  });
</script>

<svelte:head>
  <title>{store.nama} - Tourism Information Center</title>
</svelte:head>

<!-- Hero Section for the Store -->
<section class="relative w-full h-[50vh] min-h-[400px]">
  <img 
    src={store.heroImage} 
    alt="Hero Background" 
    class="absolute inset-0 w-full h-full object-cover"
  />
  <div class="absolute inset-0 bg-gradient-to-b from-[#1B120C]/70 via-[#1B120C]/30 to-[#1B120C]"></div>
</section>

<!-- Store Content overlapping the hero -->
<section class="relative z-10 w-full bg-[#1B120C]">
  <div class="max-w-[1300px] mx-auto px-6 -mt-32 pb-24">
    
    <!-- Store Info Card -->
    <StoreInfo {store} />

    <!-- Katalog Produk -->
    <div class="mt-20">
      <StoreCatalog umkmId={id} />
    </div>

  </div>
</section>
