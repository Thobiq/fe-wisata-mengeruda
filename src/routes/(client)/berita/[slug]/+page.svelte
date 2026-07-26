<script>
  let { data } = $props();
  let beritaDetail = data.detail;
  let beritaLainnya = data.others;

  // Fungsi share url dummy
  const shareTo = (platform) => {
    let url = typeof window !== 'undefined' ? window.location.href : '';
    let text = beritaDetail.title;
    
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    }
  };
</script>

<svelte:head>
  <title>{beritaDetail.title} - Tourism Desa Mengeruda</title>
</svelte:head>

<main class="w-full bg-[#161311] min-h-screen text-gray-200">
  
  <!-- Hero Section dengan Background Image -->
  <div class="relative w-full h-[60vh] min-h-[400px] flex flex-col justify-end">
    <!-- Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <img 
        src={beritaDetail.img} 
        alt={beritaDetail.title} 
        class="w-full h-full object-cover"
      />
      <!-- Overlay Gradient untuk teks agar terbaca dan membaur ke konten bawah -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#161311]/60 via-[#161311]/80 to-[#161311]"></div>
    </div>
    
    <!-- Konten Judul di Atas Gambar -->
    <div class="relative z-10 max-w-[1200px] mx-auto w-full px-6 pb-12">
      
      <!-- Tombol Kembali -->
      <a href="/" class="inline-flex items-center gap-2 text-[#C79F44] hover:text-white transition-colors mb-10 group bg-[#161311]/50 px-4 py-2 rounded-full backdrop-blur-sm border border-[#C79F44]/30 w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span class="font-serif text-sm font-semibold tracking-wide">Kembali ke Beranda</span>
      </a>

      <div class="max-w-[850px]">
        <!-- Tanggal -->
        <div class="flex items-center gap-2 text-sm text-[#B6A085] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          {beritaDetail.date}
        </div>
        
        <!-- Judul Berita -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg">
          {beritaDetail.title}
        </h1>
        
        <!-- Author -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full border border-[#C79F44] flex items-center justify-center bg-[#1d1916]/50 backdrop-blur-sm text-[#C79F44]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div>
            <div class="text-xs text-[#a3907c] uppercase tracking-wider">Ditulis oleh</div>
            <div class="text-white font-bold">{beritaDetail.author}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full border-t border-[#312921]"></div>

  <!-- Area Konten Utama -->
  <div class="max-w-[1200px] mx-auto px-6 py-16">
    <div class="flex flex-col lg:flex-row gap-16">
      
      <!-- ============================================== -->
      <!-- KOLOM KONTEN BERITA (Kiri)                     -->
      <!-- ============================================== -->
      <article class="flex-1 max-w-[800px]">
        
        <!-- Isi Konten -->
        <div class="prose prose-lg prose-invert prose-p:text-[#d5ccc3] prose-p:leading-loose prose-a:text-[#C79F44] prose-headings:font-serif prose-headings:text-white max-w-none">
          {@html beritaDetail.content}
        </div>

        <!-- Bagikan Section -->
        <div class="mt-16 pt-8 border-t border-[#312921]">
          <h3 class="text-[#C79F44] font-serif text-lg font-bold mb-4">Bagikan Artikel Ini</h3>
          <div class="flex gap-4">
            <button onclick={() => shareTo('whatsapp')} class="w-10 h-10 rounded-full bg-[#1d1916] border border-[#312921] flex items-center justify-center text-white hover:border-[#C79F44] hover:text-[#C79F44] transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 1.73.454 3.35 1.25 4.75L2.25 21.75l5.25-1.25a9.697 9.697 0 004.5 1.25c5.385 0 9.75-4.365 9.75-9.75s-4.365-9.75-9.75-9.75zm0 18c-1.5 0-2.91-.393-4.136-1.082l-2.97.712.712-2.97A8.214 8.214 0 013.75 12c0-4.556 3.694-8.25 8.25-8.25s8.25 3.694 8.25 8.25-3.694 8.25-8.25 8.25zM16.5 14.25c-.24-.12-1.425-.705-1.645-.785-.22-.08-.38-.12-.54.12-.16.24-.625.785-.765.945-.14.16-.28.18-.52.06-.24-.12-1.018-.375-1.937-1.196-.714-.64-1.197-1.432-1.337-1.672-.14-.24-.015-.37.105-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.305-.74-1.785-.196-.47-.394-.405-.54-.412-.14-.007-.3-.007-.46-.007-.16 0-.42.06-.64.3s-.84.82-.84 2.005c0 1.185.86 2.33 1.002 2.51.14.18 1.72 2.625 4.16 3.675 2.44 1.05 2.44.7 2.88.66.44-.04 1.425-.585 1.625-1.15.2-.565.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <button onclick={() => shareTo('facebook')} class="w-10 h-10 rounded-full bg-[#1d1916] border border-[#312921] flex items-center justify-center text-white hover:border-[#C79F44] hover:text-[#C79F44] transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <button onclick={() => shareTo('twitter')} class="w-10 h-10 rounded-full bg-[#1d1916] border border-[#312921] flex items-center justify-center text-white hover:border-[#C79F44] hover:text-[#C79F44] transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>

      <!-- ============================================== -->
      <!-- KOLOM SIDEBAR (Kanan)                          -->
      <!-- ============================================== -->
      <aside class="w-full lg:w-[320px] shrink-0">
        <div class="bg-[#1d1916] rounded-2xl border border-[#312921] shadow-lg p-6 sticky top-24">
          <h3 class="text-xl font-serif font-bold text-[#C79F44] mb-6 pb-4 border-b border-[#312921]">
            Berita Lainnya
          </h3>
          
          <div class="flex flex-col gap-6">
            {#each beritaLainnya as item}
              <a 
                href={`/berita/${item.slug}`} 
                class="group flex flex-col gap-3 pb-6 border-b border-[#312921] last:border-0 last:pb-0"
              >
                <div class="w-full h-[160px] rounded-xl overflow-hidden bg-[#2d2621]">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                
                <div>
                  <div class="mb-2">
                    <span class="inline-flex items-center gap-1 text-[#a3907c] text-[11px] font-semibold tracking-wide">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {item.date}
                    </span>
                  </div>
                  <h4 class="font-serif font-bold text-gray-200 leading-snug group-hover:text-[#C79F44] transition-colors line-clamp-3">
                    {item.title}
                  </h4>
                </div>
              </a>
            {/each}
            
            {#if beritaLainnya.length === 0}
              <div class="text-center text-[#8c7f73] font-serif text-sm">
                Belum ada berita lainnya.
              </div>
            {/if}
          </div>
        </div>
      </aside>

    </div>
  </div>
</main>
