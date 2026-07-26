<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { getNews } from '$lib/api';

  const defaultNews = [
    {
      title: "Revitalisasi Fasilitas Pemandian Air Panas Rampung 80%",
      date: "15 April 2026",
      excerpt: "Kabar gembira bagi para pengunjung! Renovasi toilet, area ganti, dan penambahan gazebo di sekitar kolam suhu tinggi kini telah mencapai tahap akhir.",
      img: "/hero-1.jpg",
      slug: "revitalisasi-fasilitas-pemandian"
    },
    {
      title: "Pelatihan Pemandu Wisata Lokal Berbasis Geo-Storytelling",
      date: "05 April 2026",
      excerpt: "Puluhan pemuda desa mengikuti pelatihan intensif untuk menjadi local guide tersertifikasi yang mampu menceritakan narasi geologi Mengeruda dengan menarik.",
      img: "/hero-1.jpg",
      slug: "pelatihan-pemandu-wisata-lokal"
    },
    {
      title: "Penemuan Jejak Batuan Purba di Mata Air Soa",
      date: "12 Mei 2026",
      excerpt: "Tim peneliti dari Badan Geologi Nasional menemukan batuan andesit purba yang diperkirakan berusia jutaan tahun, semakin menguatkan status Mengeruda sebagai geo-park.",
      img: "/hero-1.jpg",
      slug: "penemuan-jejak-batuan-purba"
    }
  ];

  let news = $state(defaultNews);
  let isLoading = $state(true);

  onMount(async () => {
    try {
      const res = await getNews();
      if (res && res.length > 0) {
        news = res.map(item => ({
          title: item.title || item.judul || 'Berita Pariwisata',
          date: item.date || '',
          excerpt: item.content ? item.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : '',
          img: item.image ? (item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/storage/${item.image}`) : (item.banner_url || '/hero-1.jpg'),
          slug: item.slug || String(item.id)
        }));
      }
    } catch (e) {
      console.error('Gagal mengambil berita:', e);
    } finally {
      isLoading = false;
    }
  });
</script>

<style>
  /* Sembunyikan scrollbar tapi tetap bisa di-scroll */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>

<section id="berita" class="py-20 bg-[#161311] text-white overflow-hidden">
  <div class="container mx-auto px-6 lg:px-12">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
      <div>
        <div class="flex items-center gap-2 mb-2 text-[#d7a750] uppercase tracking-widest text-xs font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Kabar Mengeruda
        </div>
        <h2 class="text-4xl lg:text-5xl font-serif font-bold text-[#d7a750]">
          Berita & Artikel
        </h2>
      </div>
      <a href="#" class="mt-4 md:mt-0 text-sm text-gray-300 hover:text-[#d7a750] transition-colors flex items-center gap-1 group">
        Lihat Semua Berita 
        <span class="transform group-hover:translate-x-1 transition-transform">›</span>
      </a>
    </div>

    <!-- Loading State -->
    {#if isLoading}
      <div class="flex justify-center items-center h-48">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d7a750]"></div>
      </div>
    {:else if news.length === 0}
      <div class="text-center text-gray-400 italic py-10">
        Belum ada berita yang dipublikasikan.
      </div>
    {:else}
      <!-- Cards Carousel -->
      <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 pt-4 -mx-6 px-6 lg:mx-0 lg:px-0" in:fade={{ duration: 800 }}>
        {#each news as item, i}
          <!-- Card Container -->
          <a 
            href={`/berita/${item.slug}`}
            class="snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[380px] bg-[#1d1916] rounded-2xl overflow-hidden border border-[#2d2621] group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d7a750]/10 cursor-pointer flex flex-col block"
            in:fly={{ y: 50, duration: 800, delay: i * 150 }}
          >
            <!-- Image Frame -->
            <div class="w-full h-52 sm:h-60 overflow-hidden relative">
              <img src={item.img} alt={item.title} class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1d1916] to-transparent opacity-60"></div>
            </div>
            
            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex items-center gap-2 text-xs text-[#a3907c] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {item.date}
              </div>
              
              <h3 class="text-xl font-serif font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-[#d7a750] transition-colors">
                {item.title}
              </h3>
              
              <p class="text-[#8c7f73] text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                {item.excerpt}
              </p>
              
              <div class="mt-auto flex items-center text-sm font-semibold text-[#d7a750] group-hover:text-[#f3cd78] transition-colors">
                Baca Selengkapnya
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
