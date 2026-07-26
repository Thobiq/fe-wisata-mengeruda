<script>
  import { onMount } from 'svelte';
  import { getProfile, updateProfile } from '$lib/api';

  let profile = $state({
    namaDesa: 'Desa Mengeruda',
    deskripsiSingkat: 'Menjelajahi keajaiban geo-wisata dan kekayaan budaya peninggalan leluhur di tanah Ngada.',
    sejarah: 'Mengeruda merupakan kawasan geo-wisata yang terkenal dengan kolam pemandian air panas alami dan penemuan batuan purba. Desa ini telah menjadi titik kumpul masyarakat lokal dalam merayakan hasil bumi.',
    kontak: {
      telepon: '081234567890',
      email: 'pariwisata@mengeruda.id',
      alamat: 'Kantor Desa Mengeruda, Kec. Soa, Kab. Ngada'
    }
  });

  let isSaving = $state(false);
  let showToast = $state(false);

  onMount(async () => {
    try {
      const res = await getProfile();
      if (res) {
        profile.namaDesa = res.nama_desa || profile.namaDesa;
        profile.deskripsiSingkat = res.deskripsi_singkat || profile.deskripsiSingkat;
        profile.sejarah = res.sejarah || profile.sejarah;
        profile.kontak.telepon = res.telepon || profile.kontak.telepon;
        profile.kontak.email = res.email || profile.kontak.email;
        profile.kontak.alamat = res.alamat || profile.kontak.alamat;
      }
    } catch (e) {
      console.error('Gagal memuat profil wisata:', e);
    }
  });

  const handleSave = async () => {
    isSaving = true;
    try {
      await updateProfile({
        nama_desa: profile.namaDesa,
        deskripsi_singkat: profile.deskripsiSingkat,
        sejarah: profile.sejarah,
        telepon: profile.kontak.telepon,
        email: profile.kontak.email,
        alamat: profile.kontak.alamat
      });
      showToast = true;
      setTimeout(() => showToast = false, 3000);
    } catch (e) {
      alert('Gagal menyimpan profil wisata: ' + (e.response?.data?.message || e.message));
    } finally {
      isSaving = false;
    }
  };
</script>

<svelte:head>
  <title>Profil Wisata - Tourism Admin</title>
</svelte:head>

<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
  <div>
    <h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Profil Pariwisata</h2>
    <p class="text-[#6D5D51] text-lg">Atur informasi utama, sejarah, dan kontak destinasi wisata.</p>
  </div>
  <button onclick={handleSave} disabled={isSaving} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-70">
    {#if isSaving}
      <svg class="animate-spin h-5 w-5 text-[#C79F44]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Menyimpan...
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      Simpan Perubahan
    {/if}
  </button>
</div>

<!-- Notifikasi Sukses -->
{#if showToast}
  <div class="fixed top-24 right-10 z-50 bg-[#C79F44] text-[#161311] px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 animate-bounce">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
    </svg>
    Profil Berhasil Disimpan!
  </div>
{/if}

<div class="bg-white rounded-2xl border border-[#EAE5DF] shadow-sm overflow-hidden">
  
  <div class="p-6 md:p-8 space-y-8">
    
    <!-- Informasi Umum -->
    <div>
      <h3 class="text-xl font-serif font-bold text-[#161311] mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#C79F44]">
          <path fill-rule="evenodd" d="M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47 3.97a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
        Informasi Utama
      </h3>
      
      <div class="space-y-5">
        <div>
          <label for="namaDesa" class="block text-sm font-semibold text-[#6D5D51] mb-2">Nama Destinasi / Desa</label>
          <input 
            type="text" 
            id="namaDesa"
            bind:value={profile.namaDesa}
            class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"
          />
        </div>
        
        <div>
          <label for="deskripsiSingkat" class="block text-sm font-semibold text-[#6D5D51] mb-2">Deskripsi Singkat (Slogan)</label>
          <textarea 
            id="deskripsiSingkat"
            bind:value={profile.deskripsiSingkat}
            rows="2"
            class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"
          ></textarea>
        </div>

        <div>
          <label for="sejarah" class="block text-sm font-semibold text-[#6D5D51] mb-2">Sejarah Singkat & Narasi Geologi</label>
          <textarea 
            id="sejarah"
            bind:value={profile.sejarah}
            rows="5"
            class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="h-px bg-[#EAE5DF] w-full"></div>

    <!-- Kontak & Lokasi -->
    <div>
      <h3 class="text-xl font-serif font-bold text-[#161311] mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#C79F44]">
          <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
        </svg>
        Pusat Bantuan & Kontak
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label for="telepon" class="block text-sm font-semibold text-[#6D5D51] mb-2">Nomor Telepon / WhatsApp</label>
          <input 
            type="text" 
            id="telepon"
            bind:value={profile.kontak.telepon}
            class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-semibold text-[#6D5D51] mb-2">Alamat Email</label>
          <input 
            type="email" 
            id="email"
            bind:value={profile.kontak.email}
            class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"
          />
        </div>
        <div class="md:col-span-2">
          <label for="alamat" class="block text-sm font-semibold text-[#6D5D51] mb-2">Alamat Lengkap</label>
          <textarea 
            id="alamat"
            bind:value={profile.kontak.alamat}
            rows="2"
            class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"
          ></textarea>
        </div>
      </div>
    </div>

  </div>
</div>
