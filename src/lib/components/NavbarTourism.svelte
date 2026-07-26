<script>
  import { onMount } from 'svelte';
  
  let isScrolled = $state(false);
  let isMenuOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class="fixed top-0 w-full z-50 transition-all duration-500 {isScrolled ? 'bg-[#1B120C]/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}">
  <div class="max-w-[1500px] mx-auto px-6 flex justify-between items-center">
    
    <!-- Logo -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="w-10 h-10 rounded-full bg-[#e8e4e1] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
        <span class="text-[#1B120C] font-bold font-serif text-lg">M</span>
      </div>
      <div class="flex flex-col">
        <span class="font-serif font-bold text-white text-xl tracking-wide leading-none">Mengeruda <span class="text-[#FACC15]">Tourism</span></span>
        <span class="text-xs text-gray-300 tracking-widest uppercase mt-1">Information Center</span>
      </div>
    </a>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-10">
      <a href="#maps" class="text-white font-serif font-medium text-[15px] hover:text-[#FACC15] transition-colors relative group">
        Maps
        <span class="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
      </a>
      <a href="#wisata" class="text-white font-serif font-medium text-[15px] hover:text-[#FACC15] transition-colors relative group">
        Wisata
        <span class="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
      </a>
      <a href="#umkm" class="text-white font-serif font-medium text-[15px] hover:text-[#FACC15] transition-colors relative group">
        UMKM
        <span class="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
      </a>
      <a href="#event" class="text-white font-serif font-medium text-[15px] hover:text-[#FACC15] transition-colors relative group">
        Event
        <span class="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
      </a>
      <a href="#berita" class="text-white font-serif font-medium text-[15px] hover:text-[#FACC15] transition-colors relative group">
        Berita
        <span class="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
      </a>
      <a href="#galeri" class="text-white font-serif font-medium text-[15px] hover:text-[#FACC15] transition-colors relative group">
        Galeri
        <span class="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
      </a>
    </div>

    <!-- Mobile Menu Button -->
    <button class="md:hidden text-white" onclick={() => isMenuOpen = !isMenuOpen} aria-label="Toggle Menu">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  </div>

  <!-- Mobile Menu Dropdown -->
  {#if isMenuOpen}
    <div class="md:hidden absolute top-full left-0 w-full bg-[#1B120C]/95 backdrop-blur-md border-t border-[#332418] shadow-2xl">
      <div class="flex flex-col px-6 py-4 gap-4">
        <a href="#maps" class="text-white font-serif text-lg py-2 border-b border-[#332418]">Maps</a>
        <a href="#wisata" class="text-white font-serif text-lg py-2 border-b border-[#332418]">Wisata</a>
        <a href="#umkm" class="text-white font-serif text-lg py-2 border-b border-[#332418]">UMKM</a>
        <a href="#event" class="text-white font-serif text-lg py-2 border-b border-[#332418]">Event</a>
        <a href="#berita" class="text-white font-serif text-lg py-2 border-b border-[#332418]">Berita</a>
        <a href="#galeri" class="text-white font-serif text-lg py-2">Galeri</a>
      </div>
    </div>
  {/if}
</nav>
