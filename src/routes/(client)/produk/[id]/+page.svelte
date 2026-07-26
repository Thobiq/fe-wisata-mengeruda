<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import ProductDetailGallery from '$lib/components/ProductDetailGallery.svelte';
  import ProductDetailInfo from '$lib/components/ProductDetailInfo.svelte';
  import RelatedProducts from '$lib/components/RelatedProducts.svelte';
  import { getProducts } from '$lib/api';

  let id = $derived($page.params.id);
  
  const defaultProduct = {
    id: 1,
    nama: 'Keripik Tempe',
    harga: 'Rp10.000',
    deskripsi: 'Sentra oleh-oleh khas Ngada berkualitas tinggi buatan UMKM lokal.',
    badge: 'Produk Unggulan',
    toko: {
      id: 1,
      nama: 'Oleh-oleh bu Erni',
      lokasi: 'Desa Mengeruda',
      logo: '/hero-1.jpg'
    },
    images: [
      '/hero-1.jpg',
      '/hero-2.png'
    ]
  };

  let product = $state(defaultProduct);

  onMount(async () => {
    try {
      const products = await getProducts();
      if (products && products.length > 0) {
        const found = products.find(p => String(p.id) === String(id));
        if (found) {
          const mainImg = found.image ? (found.image.startsWith('http') || found.image.startsWith('/') ? found.image : `/storage/${found.image}`) : '/hero-1.jpg';
          let imageList = [mainImg];
          if (found.images && Array.isArray(found.images) && found.images.length > 0) {
            imageList = found.images.map(img => img.startsWith('http') || img.startsWith('/') ? img : `/storage/${img}`);
          }
          product = {
            id: found.id,
            nama: found.name || 'Produk UMKM',
            harga: `Rp${Number(found.price || 0).toLocaleString('id-ID')}`,
            deskripsi: found.description || defaultProduct.deskripsi,
            badge: 'Produk Unggulan',
            toko: {
              id: found.umkm_id || 1,
              nama: found.umkm?.name || 'UMKM Mengeruda',
              lokasi: found.umkm?.address || 'Desa Mengeruda',
              logo: found.umkm?.logo ? (found.umkm.logo.startsWith('http') || found.umkm.logo.startsWith('/') ? found.umkm.logo : `/storage/${found.umkm.logo}`) : '/hero-1.jpg'
            },
            images: imageList
          };
        }
      }
    } catch (e) {
      console.error('Gagal memuat detail produk:', e);
    }
  });
</script>

<svelte:head>
  <title>{product.nama} - Tourism Information Center</title>
</svelte:head>

<section class="min-h-screen pt-32 pb-20 px-6 max-w-[1300px] mx-auto">
  
  <div class="bg-[#281C14] rounded-[40px] p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 border border-[#3A291D]">
    
    <!-- Bagian Kiri: Galeri -->
    <div class="w-full lg:w-1/2">
      <ProductDetailGallery images={product.images} />
    </div>

    <!-- Bagian Kanan: Informasi Detail -->
    <div class="w-full lg:w-1/2 flex flex-col">
      <ProductDetailInfo {product} />
    </div>

  </div>

  <!-- Related Products Section -->
  <div class="mt-24">
    <RelatedProducts tokoName={product.toko.nama} />
  </div>

</section>
