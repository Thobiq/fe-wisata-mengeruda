<script>
  import { viewport } from '$lib/actions/viewport.js';
  import { fly } from 'svelte/transition';

  let { store } = $props();

  let isVisible = $state(false);

  const waMessage = $derived(`Halo, saya melihat toko Anda (${store.nama}) di TIC Desa Mengeruda.`);
  const waUrl = $derived(`https://wa.me/${(store.wa || '6281234567890').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`);
</script>

<div 
  use:viewport
  onenterViewport={() => isVisible = true}
>
  {#if isVisible}
    <div 
      in:fly={{ y: 50, duration: 1000, delay: 200 }}
      class="bg-[#24170E] border border-[#d49944]/40 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start"
    >
      
      <!-- Logo Toko -->
      <div class="shrink-0">
        <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[3px] border-[#e8e4e1] shadow-lg">
          <img src={store.logo} alt={store.nama} class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Info Toko -->
      <div class="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-[#FACC15] mb-4">
          {store.nama}
        </h1>
        
        <!-- Social Media Icons (4 empty outline circles as per mockup) -->
        <div class="flex gap-3 mb-4">
          <a href={store.sosmed.instagram} class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:border-[#FACC15] hover:text-[#FACC15] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href={store.sosmed.facebook} class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:border-[#FACC15] hover:text-[#FACC15] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href={store.sosmed.twitter} class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:border-[#FACC15] hover:text-[#FACC15] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
          </a>
          <a href={store.sosmed.website} class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:border-[#FACC15] hover:text-[#FACC15] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </a>
        </div>

        <h3 class="text-white font-serif font-bold text-lg mb-2">{store.lokasi}</h3>
        <p class="text-gray-300 font-sans text-sm md:text-base leading-relaxed text-justify md:text-left">
          {store.deskripsi}
        </p>
      </div>

      <!-- Action Button -->
      <div class="shrink-0 flex items-center justify-center md:pt-4">
        <a 
          href={waUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          class="bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-8 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:-translate-y-1 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M12.031 21.432l-3.328 1.11 1.12-3.23A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-3.969-.824l.03-.021zM12 4a8 8 0 105.12 14.12l.14-.1 1.95.65-.67-1.93-.11-.14A8 8 0 0012 4zm4.23 9.4c-.23-.11-1.37-.67-1.58-.75-.21-.07-.37-.11-.53.11-.16.23-.6.75-.74.9-.13.16-.27.18-.5.07-.23-.11-.98-.36-1.87-1.16-.69-.62-1.16-1.38-1.3-1.61-.14-.23-.01-.36.1-.47.11-.11.23-.27.35-.41.11-.14.15-.23.23-.39.07-.16.03-.3-.02-.41-.07-.11-.53-1.27-.72-1.74-.19-.46-.38-.4-.53-.41h-.45c-.16 0-.42.06-.64.3-.23.23-.87.85-.87 2.07s.9 2.4 1.02 2.56c.11.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.52.6.19 1.15.16 1.58.1.48-.07 1.37-.56 1.56-1.11.19-.55.19-1.02.13-1.11-.06-.09-.22-.14-.45-.25z"/>
          </svg>
          Whatsapp
        </a>
      </div>

    </div>
  {/if}
</div>
