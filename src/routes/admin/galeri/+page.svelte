<script>
  import { onMount } from 'svelte';
  import { getGalleries, createGallery, deleteGallery } from '$lib/api';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';

  let photos = $state([]);
  let isLoading = $state(true);
  let isSaving = $state(false);

  let showModal = $state(false);
  let showDeleteModal = $state(false);
  let deleteTargetId = $state(null);
  let isDeleting = $state(false);
  let currentPhoto = $state({ title: '', category: 'Alam', image: '' });
  let imageFiles = $state();
  let activeTab = $state('Semua');

  let filteredPhotos = $derived(
    activeTab === 'Semua' 
      ? photos 
      : photos.filter(p => p.category === activeTab)
  );

  const categories = ['Semua', 'Alam', 'Budaya', 'Kuliner', 'Fasilitas'];

  const loadData = async () => {
    isLoading = true;
    try {
      photos = await getGalleries('Semua');
    } catch (e) {
      console.error('Gagal mengambil galeri:', e);
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    loadData();
  });

  const openAddModal = () => {
    currentPhoto = { title: '', category: 'Alam', image: '' };
    imageFiles = undefined;
    showModal = true;
  };

  const deletePhotoItem = (id) => {
    deleteTargetId = id;
    showDeleteModal = true;
  };

  const executeDeletePhotoItem = async () => {
    if (!deleteTargetId) return;
    isDeleting = true;
    try {
      await deleteGallery(deleteTargetId);
      await loadData();
      showDeleteModal = false;
    } catch (e) {
      alert('Gagal menghapus foto: ' + (e.response?.data?.message || e.message));
    } finally {
      isDeleting = false;
      deleteTargetId = null;
    }
  };

  const savePhoto = async () => {
    if (!currentPhoto.title) {
      alert('Judul foto wajib diisi!');
      return;
    }
    isSaving = true;
    try {
      const formData = new FormData();
      formData.append('title', currentPhoto.title || '');
      formData.append('category', currentPhoto.category || 'Alam');

      if (imageFiles && imageFiles.length > 0) {
        formData.append('image', imageFiles[0]);
      } else if (currentPhoto.image) {
        formData.append('image', currentPhoto.image);
      }

      await createGallery(formData);
      showModal = false;
      await loadData();
    } catch (e) {
      alert('Gagal menyimpan foto galeri: ' + (e.response?.data?.message || e.message));
    } finally {
      isSaving = false;
    }
  };
</script>

<svelte:head>
  <title>Galeri Wisata - Tourism Admin</title>
</svelte:head>

<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
  <div>
    <h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Galeri Foto Pariwisata</h2>
    <p class="text-[#6D5D51] text-lg">Kelola kumpulan foto memukau untuk menarik minat wisatawan.</p>
  </div>
  <button onclick={openAddModal} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    Unggah Foto Baru
  </button>
</div>

<!-- Tabs Kategori -->
<div class="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
  {#each categories as cat}
    <button 
      onclick={() => activeTab = cat}
      class={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all border ${
        activeTab === cat 
          ? 'bg-[#161311] text-[#C79F44] border-[#161311] shadow-md' 
          : 'bg-white text-gray-500 border-[#EAE5DF] hover:bg-gray-50'
      }`}
    >
      {cat}
    </button>
  {/each}
</div>

<!-- Grid Foto -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {#each filteredPhotos as photo}
    <div class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE5DF]">
      
      <!-- Tombol Hapus Hover -->
      <button 
        onclick={() => deletePhotoItem(photo.id)}
        class="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-red-50 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm"
        title="Hapus Foto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="w-full h-48 overflow-hidden relative">
        <img src={photo.image} alt={photo.title} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div class="p-4">
        <span class="text-[11px] font-bold text-[#C79F44] uppercase tracking-wider mb-1 block">{photo.category}</span>
        <h4 class="font-bold text-[#161311] leading-snug line-clamp-2">{photo.title}</h4>
      </div>
    </div>
  {/each}
</div>

{#if filteredPhotos.length === 0}
  <div class="text-center py-20">
    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-gray-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </div>
    <h3 class="text-xl font-bold text-[#161311] mb-2">Belum ada foto</h3>
    <p class="text-gray-500">Kategori ini masih kosong. Silakan unggah foto baru.</p>
  </div>
{/if}

<!-- Modal Form Unggah -->
{#if showModal}
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
    <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
      <div class="p-6 border-b border-[#EAE5DF] flex items-center justify-between bg-[#FDFBF7] text-[#161311]">
        <h3 class="text-xl font-serif font-bold text-[#161311]">Unggah Foto Galeri</h3>
        <button onclick={() => showModal = false} class="text-gray-400 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div class="p-6 space-y-5">
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Kategori Foto</label>
          <select bind:value={currentPhoto.category} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]">
            {#each categories.filter(c => c !== 'Semua') as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Judul / Keterangan Foto</label>
          <input type="text" bind:value={currentPhoto.title} placeholder="Misal: Tarian Caci di Mengeruda" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Pilih File Foto Baru</label>
          <input type="file" onchange={(e) => imageFiles = e.target.files} accept="image/*" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#161311] file:text-[#C79F44] hover:file:bg-[#2C2520] cursor-pointer" />
          <p class="text-xs text-gray-400 mt-2">*Format gambar PNG, JPG, JPEG, atau WEBP.</p>
        </div>
      </div>
      
      <div class="p-6 border-t border-[#EAE5DF] flex justify-end gap-3 bg-gray-50">
        <button onclick={() => showModal = false} class="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Batal</button>
        <button onclick={savePhoto} disabled={isSaving} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-8 py-2.5 rounded-xl font-bold shadow-md transition-all disabled:opacity-50">{isSaving ? 'Mengupload...' : 'Upload Foto'}</button>
      </div>
    </div>
  </div>
{/if}

<ConfirmModal
  bind:open={showDeleteModal}
  title="Konfirmasi Hapus Foto"
  message="Apakah Anda yakin ingin menghapus foto ini secara permanen dari galeri wisata?"
  confirmText="Hapus Foto"
  cancelText="Batal"
  type="danger"
  loading={isDeleting}
  onConfirm={executeDeletePhotoItem}
/>
