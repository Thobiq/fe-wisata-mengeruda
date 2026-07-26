<script>
  import { fade } from 'svelte/transition';

  let { images = [] } = $props();
  
  let activeIndex = $state(0);
  let activeImage = $derived(images[activeIndex]);
</script>

<div class="flex flex-col gap-4 h-full">
  
  <!-- Gambar Utama -->
  <div class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#1B120C] rounded-3xl overflow-hidden shadow-inner border border-[#3A291D]">
    {#each images as image, i}
      {#if i === activeIndex}
        <img 
          src={image} 
          alt="Produk Utama" 
          class="absolute inset-0 w-full h-full object-cover"
          transition:fade={{ duration: 400 }}
        />
      {/if}
    {/each}
  </div>

  <!-- Thumbnail List -->
  {#if images.length > 1}
    <div class="flex gap-4 mt-2 overflow-x-auto pb-2 scrollbar-hide">
      {#each images.slice(0, 4) as image, i}
        <button 
          class="relative w-[22%] aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 {activeIndex === i ? 'border-[#FACC15] scale-105 shadow-md' : 'border-transparent hover:border-gray-500 opacity-70 hover:opacity-100'}"
          onclick={() => activeIndex = i}
        >
          <img src={image} alt="Thumbnail {i}" class="w-full h-full object-cover" />
        </button>
      {/each}
    </div>
  {/if}

</div>

<style>
  /* Sembunyikan scrollbar untuk tampilan yang lebih bersih */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
