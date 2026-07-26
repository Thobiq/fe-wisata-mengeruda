<script>
  import { fly } from 'svelte/transition';

  let { product } = $props();

  const waMessage = $derived(`Halo, saya tertarik dengan produk ${product.nama} dari TIC Desa Mengeruda.`);
  const waUrl = $derived(`https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.nama,
          text: `Cek ${product.nama} di Tourism Information Center Desa Mengeruda!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan berhasil disalin ke clipboard!');
    }
  };
</script>

<div class="flex flex-col h-full" in:fly={{ x: 30, duration: 800, delay: 200 }}>
  
  <!-- Badge -->
  {#if product.badge}
    <div class="mb-4">
      <span class="inline-block bg-[#E0F2FE] text-[#0284C7] px-4 py-1.5 rounded-full text-sm font-bold font-sans shadow-sm">
        {product.badge}
      </span>
    </div>
  {/if}

  <!-- Title & Price -->
  <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mb-2 leading-tight">
    {product.nama}
  </h1>
  <p class="text-3xl font-serif font-bold text-[#FACC15] mb-6">
    {product.harga}
  </p>

  <!-- Description -->
  <p class="text-gray-300 font-sans text-base md:text-lg leading-relaxed mb-8 text-justify">
    {product.deskripsi}
  </p>

  <!-- Shop Info Card -->
  <div class="border border-[#4A392D] rounded-2xl p-4 flex items-center justify-between bg-[#1B120C]/30 mb-8 hover:bg-[#1B120C]/50 transition-colors">
    <div class="flex items-center gap-4">
      <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-[#4A392D]">
        <img src={product.toko.logo} alt={product.toko.nama} class="w-full h-full object-cover" />
      </div>
      <div>
        <h4 class="font-bold text-[#FACC15] font-serif text-lg leading-tight">{product.toko.nama}</h4>
        <p class="text-gray-400 text-sm font-sans">{product.toko.lokasi}</p>
      </div>
    </div>
    <a href="#" class="bg-[#FACC15] text-[#1B120C] hover:bg-[#eab308] px-5 py-2 rounded-full font-bold text-sm transition-transform hover:scale-105 shadow-md">
      Lihat Toko
    </a>
  </div>

  <div class="mt-auto"></div>

  <!-- Action Buttons -->
  <div class="flex flex-col sm:flex-row gap-4 mt-8">
    <a 
      href={waUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path d="M12.031 21.432l-3.328 1.11 1.12-3.23A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-3.969-.824l.03-.021zM12 4a8 8 0 105.12 14.12l.14-.1 1.95.65-.67-1.93-.11-.14A8 8 0 0012 4zm4.23 9.4c-.23-.11-1.37-.67-1.58-.75-.21-.07-.37-.11-.53.11-.16.23-.6.75-.74.9-.13.16-.27.18-.5.07-.23-.11-.98-.36-1.87-1.16-.69-.62-1.16-1.38-1.3-1.61-.14-.23-.01-.36.1-.47.11-.11.23-.27.35-.41.11-.14.15-.23.39.07-.16.03-.3-.02-.41-.07-.11-.53-1.27-.72-1.74-.19-.46-.38-.4-.53-.41h-.45c-.16 0-.42.06-.64.3-.23.23-.87.85-.87 2.07s.9 2.4 1.02 2.56c.11.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.52.6.19 1.15.16 1.58.1.48-.07 1.37-.56 1.56-1.11.19-.55.19-1.02.13-1.11-.06-.09-.22-.14-.45-.25z"/>
      </svg>
      Order Sekarang
    </a>
    <button 
      onclick={handleShare}
      class="sm:w-auto w-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 py-3.5 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
      Bagikan
    </button>
  </div>

</div>
