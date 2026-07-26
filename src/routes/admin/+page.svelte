<script>
  // Data dummy statistik
  const stats = [
    { label: 'Total Wisata & Kuliner', value: '12', icon: 'M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-4.5zm0 8.25a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v2.25c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-2.25zm-9.75-8.25a.375.375 0 00-.375-.375H3.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-4.5z' },
    { label: 'Jadwal Kegiatan Adat', value: '5', icon: 'M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.222 2.365c0 6.643-4.606 12.339-11.31 14.577a.75.75 0 01-.454 0C2.868 20.469-1.738 14.772-1.738 8.13c0-.82.077-1.619.222-2.365a.75.75 0 01.722-.515 11.21 11.21 0 007.877-3.08zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z' },
    { label: 'Berita Pariwisata', value: '24', icon: 'M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25z' },
    { label: 'Foto Galeri', value: '45', icon: 'M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6z' },
  ];
</script>

<svelte:head>
  <title>Dashboard - Tourism Admin</title>
</svelte:head>

<div class="mb-8">
  <h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Selamat Datang di Admin Pariwisata</h2>
  <p class="text-[#6D5D51] text-lg">Kelola semua informasi destinasi wisata, akomodasi, dan budaya Desa Mengeruda di satu tempat.</p>
</div>

<!-- Statistik Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  {#each stats as stat}
    <div class="bg-white rounded-2xl p-6 border border-[#EAE5DF] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-default">
      <!-- Ornamen Sudut (Elegan) -->
      <div class="absolute -right-4 -top-4 w-20 h-20 bg-[#C79F44]/5 rounded-full transform group-hover:scale-150 transition-transform duration-700 ease-out"></div>
      
      <div class="flex items-start justify-between relative z-10">
        <div>
          <p class="text-[#6D5D51] text-sm font-medium mb-1">{stat.label}</p>
          <h3 class="text-4xl font-serif font-bold text-[#161311]">{stat.value}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#161311] flex items-center justify-center text-[#C79F44] shadow-sm group-hover:-translate-y-1 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d={stat.icon} clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- Welcome Banner -->
<div class="bg-[#161311] rounded-3xl p-8 lg:p-12 relative overflow-hidden text-white shadow-xl">
  <!-- Elemen Dekoratif Emas -->
  <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C79F44]/20 to-transparent rounded-bl-full opacity-50"></div>
  <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C79F44]/10 rounded-full blur-2xl"></div>

  <div class="relative z-10 max-w-2xl">
    <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#C79F44]/20 border border-[#C79F44]/30 rounded-full text-[#C79F44] text-xs font-bold tracking-widest uppercase mb-6">
      Sistem Manajemen
    </div>
    <h3 class="text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">Pusat Informasi Pariwisata Desa Mengeruda</h3>
    <p class="text-gray-300 text-lg leading-relaxed mb-8">
      Sistem ini dirancang khusus untuk mempermudah Anda memperbarui informasi wisata, mempromosikan UMKM lokal, serta melestarikan warisan budaya Mengeruda ke kancah nasional maupun internasional.
    </p>
    <a href="/admin/profil" class="inline-flex items-center gap-2 bg-[#C79F44] hover:bg-[#B68D37] text-[#161311] px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(199,159,68,0.4)] hover:shadow-[0_0_20px_rgba(199,159,68,0.6)]">
      Mulai Kelola Profil
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </a>
  </div>
</div>
