<script>
  import { onMount } from 'svelte';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  import { getNews, createNews, updateNews, deleteNews } from '$lib/api';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';

  let news = $state([]);
  let isLoading = $state(true);
  let isSaving = $state(false);

  let showModal = $state(false);
  let showDeleteModal = $state(false);
  let deleteTargetId = $state(null);
  let isDeleting = $state(false);
  let editMode = $state(false);
  let currentNews = $state({ id: null, title: '', slug: '', date: '', author: 'Admin Desa', content: '', status: 'Diterbitkan', image: '' });
  let imageFiles = $state();
  let searchQuery = $state('');

  let filteredNews = $derived(
    news.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const loadData = async () => {
    isLoading = true;
    try {
      news = await getNews();
    } catch (e) {
      console.error('Gagal mengambil berita:', e);
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    loadData();
  });

  const generateSlug = () => {
    if (!editMode && currentNews.title) {
      currentNews.slug = currentNews.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
  };

  const openAddModal = () => {
    editMode = false;
    currentNews = { id: null, title: '', slug: '', date: new Date().toISOString().split('T')[0], author: 'Admin Desa', content: '', status: 'Diterbitkan', image: '' };
    imageFiles = undefined;
    showModal = true;
  };

  const openEditModal = (item) => {
    editMode = true;
    currentNews = { ...item };
    imageFiles = undefined;
    showModal = true;
  };

  const deleteNewsItem = (id) => {
    deleteTargetId = id;
    showDeleteModal = true;
  };

  const executeDeleteNewsItem = async () => {
    if (!deleteTargetId) return;
    isDeleting = true;
    try {
      await deleteNews(deleteTargetId);
      await loadData();
      showDeleteModal = false;
    } catch (e) {
      alert('Gagal menghapus berita: ' + (e.response?.data?.message || e.message));
    } finally {
      isDeleting = false;
      deleteTargetId = null;
    }
  };

  const saveNews = async () => {
    if (!currentNews.title) {
      alert('Judul berita wajib diisi!');
      return;
    }
    isSaving = true;
    try {
      const formData = new FormData();
      formData.append('title', currentNews.title || '');
      formData.append('slug', currentNews.slug || '');
      formData.append('date', currentNews.date || new Date().toISOString().split('T')[0]);
      formData.append('author', currentNews.author || 'Admin Desa');
      formData.append('content', currentNews.content || '');
      formData.append('status', currentNews.status || 'Diterbitkan');

      if (imageFiles && imageFiles.length > 0) {
        formData.append('image', imageFiles[0]);
      } else if (currentNews.image) {
        formData.append('image', currentNews.image);
      }

      if (editMode && currentNews.id) {
        await updateNews(currentNews.id, formData);
      } else {
        await createNews(formData);
      }
      showModal = false;
      await loadData();
    } catch (e) {
      alert('Gagal menyimpan berita: ' + (e.response?.data?.message || e.message));
    } finally {
      isSaving = false;
    }
  };

  const quillAction = (node) => {
    const quill = new Quill(node, {
      theme: 'snow',
      placeholder: 'Tuliskan konten berita...',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['image'],
          ['clean']
        ]
      }
    });

    quill.root.innerHTML = currentNews.content || '';

    quill.on('text-change', () => {
      currentNews.content = quill.root.innerHTML;
    });

    return {
      destroy() {
        // cleanup if needed
      }
    };
  };
</script>

<svelte:head>
  <title>Berita Wisata - Tourism Admin</title>
</svelte:head>

<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
  <div>
    <h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Berita Pariwisata</h2>
    <p class="text-[#6D5D51] text-lg">Kelola publikasi artikel, pengumuman, dan berita seputar wisata desa.</p>
  </div>
  <button onclick={openAddModal} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    Tulis Berita
  </button>
</div>

<!-- Pencarian -->
<div class="mb-6 bg-white p-2 rounded-2xl border border-[#EAE5DF] shadow-sm flex items-center max-w-md">
  <div class="px-3 text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  </div>
  <input 
    type="text" 
    bind:value={searchQuery}
    placeholder="Cari judul berita..." 
    class="w-full bg-transparent border-none outline-none text-[#161311] px-2 py-2"
  />
</div>

<!-- Tabel -->
<div class="bg-white rounded-2xl border border-[#EAE5DF] shadow-sm overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-[#FDFBF7] border-b border-[#EAE5DF] text-[#6D5D51] text-sm font-semibold uppercase tracking-wider">
          <th class="py-4 px-6">Judul Berita</th>
          <th class="py-4 px-6">Tanggal Publikasi</th>
          <th class="py-4 px-6">Penulis</th>
          <th class="py-4 px-6">Status</th>
          <th class="py-4 px-6 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredNews as item}
          <tr class="border-b border-[#EAE5DF] hover:bg-[#FDFBF7] transition-colors group">
            <td class="py-4 px-6">
              <div class="flex items-center gap-4 max-w-sm">
                <div class="w-16 h-10 rounded shadow-sm bg-gray-200 overflow-hidden shrink-0">
                  <img src={item.image} alt={item.title} class="w-full h-full object-cover" />
                </div>
                <span class="font-bold text-[#161311] truncate">{item.title}</span>
              </div>
            </td>
            <td class="py-4 px-6 text-[#6D5D51] font-medium">{item.date}</td>
            <td class="py-4 px-6 text-[#6D5D51]">{item.author}</td>
            <td class="py-4 px-6">
              <span class={`inline-block px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                {item.status}
              </span>
            </td>
            <td class="py-4 px-6 text-right">
              <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick={() => openEditModal(item)} class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                </button>
                <button onclick={() => deleteNewsItem(item.id)} class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </td>
          </tr>
        {/each}
        {#if filteredNews.length === 0}
          <tr>
            <td colspan="5" class="py-8 text-center text-gray-400 font-medium">Berita tidak ditemukan.</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

<!-- Modal Form -->
{#if showModal}
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
    <div class="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
      <div class="p-6 border-b border-[#EAE5DF] flex items-center justify-between bg-[#FDFBF7] text-[#161311]">
        <h3 class="text-xl font-serif font-bold text-[#161311]">
          {editMode ? 'Edit Berita' : 'Tulis Berita Baru'}
        </h3>
        <button onclick={() => showModal = false} class="text-gray-400 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto space-y-5 flex-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Judul Berita</label>
            <input type="text" bind:value={currentNews.title} oninput={generateSlug} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Slug (URL)</label>
            <input type="text" bind:value={currentNews.slug} placeholder="judul-berita-anda" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311] font-mono text-sm" />
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Tanggal</label>
            <input type="date" bind:value={currentNews.date} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Penulis</label>
            <input type="text" bind:value={currentNews.author} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
          </div>
          <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Status</label>
            <select bind:value={currentNews.status} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]">
              <option value="Draft">Draft</option>
              <option value="Diterbitkan">Diterbitkan</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Isi Berita</label>
          <div class="bg-white rounded-xl overflow-hidden border border-[#EAE5DF]">
            <div use:quillAction class="min-h-[250px] text-[#161311] text-base border-none editor-container font-serif"></div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Foto Sampul / Banner (Pilih File)</label>
          <input type="file" onchange={(e) => imageFiles = e.target.files} accept="image/*" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#161311] file:text-[#C79F44] hover:file:bg-[#2C2520] cursor-pointer" />
        </div>
      </div>
      
      <div class="p-6 border-t border-[#EAE5DF] flex justify-end gap-3 bg-gray-50">
        <button onclick={() => showModal = false} class="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Batal</button>
        <button onclick={saveNews} disabled={isSaving} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-8 py-2.5 rounded-xl font-bold shadow-md transition-all">
          {currentNews.status === 'Diterbitkan' ? 'Publikasikan' : 'Simpan Draft'}
        </button>
      </div>
    </div>
  </div>
{/if}

<ConfirmModal
  bind:open={showDeleteModal}
  title="Konfirmasi Hapus Berita"
  message="Apakah Anda yakin ingin menghapus berita wisata ini? Tindakan ini tidak dapat dibatalkan."
  confirmText="Hapus Berita"
  cancelText="Batal"
  type="danger"
  loading={isDeleting}
  onConfirm={executeDeleteNewsItem}
/>

<style>
  :global(.ql-toolbar.ql-snow) {
    border: none !important;
    border-bottom: 1px solid #EAE5DF !important;
    background-color: #FDFBF7;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding: 12px;
  }
  :global(.ql-container.ql-snow) {
    border: none !important;
    font-family: inherit;
  }
  :global(.ql-editor) {
    min-height: 250px;
  }
  :global(.ql-editor.ql-blank::before) {
    font-style: normal;
    color: #9CA3AF;
  }
</style>
