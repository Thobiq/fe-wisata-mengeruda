<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  import { getProducts, createProduct, updateProduct, deleteProduct, getUmkms } from '$lib/api';

  let umkmId = $derived($page.params.id);
  let umkmName = $state('Toko UMKM'); 
  let isLoading = $state(true);
  let isSaving = $state(false);

  let categories = $state(['Makanan', 'Minuman', 'Kriya', 'Oleh-oleh']);
  let products = $state([]);

  let showModal = $state(false);
  let editMode = $state(false);
  let currentProduct = $state({ id: null, name: '', category: 'Makanan', price: '', description: '', images: [] });
  let searchQuery = $state('');

  let allProductFiles = $state([]);
  let productPreviews = $derived(
    allProductFiles.map(file => URL.createObjectURL(file))
  );

  let fileInput;

  const handleFileChange = (e) => {
    if (e.target.files) {
      allProductFiles = [...allProductFiles, ...Array.from(e.target.files)];
    }
    e.target.value = '';
  };

  const removeFile = (index) => {
    allProductFiles = allProductFiles.filter((_, i) => i !== index);
  };

  let showNewCategoryInput = $state(false);
  let newCategoryName = $state('');

  let filteredProducts = $derived(
    products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const loadData = async () => {
    if (!umkmId) return;
    isLoading = true;
    try {
      const umkms = await getUmkms();
      const current = umkms.find(u => String(u.id) === String(umkmId));
      if (current) umkmName = current.name;

      products = await getProducts(umkmId);
    } catch (e) {
      console.error('Gagal mengambil produk UMKM:', e);
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    loadData();
  });

  const openAddModal = () => {
    editMode = false;
    currentProduct = { id: null, name: '', category: 'Makanan', price: '', description: '', images: [] };
    allProductFiles = [];
    showNewCategoryInput = false;
    newCategoryName = '';
    showModal = true;
  };

  const openEditModal = (item) => {
    editMode = true;
    currentProduct = { ...item };
    allProductFiles = [];
    showNewCategoryInput = false;
    newCategoryName = '';
    showModal = true;
  };

  const deleteProductItem = async (id) => {
    if(confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
        await loadData();
      } catch (e) {
        alert('Gagal menghapus produk: ' + (e.response?.data?.message || e.message));
      }
    }
  };

  const saveProduct = async () => {
    if (!currentProduct.name) {
      alert('Nama produk wajib diisi!');
      return;
    }
    if (showNewCategoryInput && newCategoryName.trim() !== '') {
      const cat = newCategoryName.trim();
      if (!categories.includes(cat)) {
        categories = [...categories, cat];
      }
      currentProduct.category = cat;
    }

    isSaving = true;
    try {
      const formData = new FormData();
      formData.append('tourism_umkm_id', umkmId);
      formData.append('name', currentProduct.name || '');
      formData.append('category', currentProduct.category || 'Makanan');
      formData.append('price', currentProduct.price || '');
      formData.append('description', currentProduct.description || '');

      if (allProductFiles && allProductFiles.length > 0) {
        allProductFiles.forEach(file => {
          formData.append('images[]', file);
        });
      } else if (currentProduct.images && Array.isArray(currentProduct.images)) {
        currentProduct.images.forEach(img => {
          formData.append('images[]', img);
        });
      }

      if (editMode && currentProduct.id) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      showModal = false;
      await loadData();
    } catch (e) {
      alert('Gagal menyimpan produk: ' + (e.response?.data?.message || e.message));
    } finally {
      isSaving = false;
    }
  };

  const quillAction = (node) => {
    const quill = new Quill(node, {
      theme: 'snow',
      placeholder: 'Tuliskan deskripsi produk yang menarik...',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['clean']
        ]
      }
    });

    quill.root.innerHTML = currentProduct.description || '';

    quill.on('text-change', () => {
      currentProduct.description = quill.root.innerHTML;
    });

    return {
      destroy() {
        // cleanup if needed
      }
    };
  };
</script>

<svelte:head>
  <title>Produk UMKM - Tourism Admin</title>
</svelte:head>

<!-- Navigasi Kembali -->
<a href="/admin/umkm" class="inline-flex items-center gap-2 text-[#6D5D51] hover:text-[#C79F44] transition-colors mb-4 font-semibold text-sm">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
  Kembali ke Daftar UMKM
</a>

<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
  <div>
    <h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Kelola Produk & Menu</h2>
    <p class="text-[#6D5D51] text-lg">Toko/UMKM: <span class="font-bold text-[#161311]">{umkmName}</span></p>
  </div>
  <button onclick={openAddModal} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    Tambah Produk
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
    placeholder="Cari nama produk atau kategori..." 
    class="w-full bg-transparent border-none outline-none text-[#161311] px-2 py-2"
  />
</div>

<!-- Tabel -->
<div class="bg-white rounded-2xl border border-[#EAE5DF] shadow-sm overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-[#FDFBF7] border-b border-[#EAE5DF] text-[#6D5D51] text-sm font-semibold uppercase tracking-wider">
          <th class="py-4 px-6">Produk</th>
          <th class="py-4 px-6">Kategori</th>
          <th class="py-4 px-6">Harga</th>
          <th class="py-4 px-6 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredProducts as item}
          <tr class="border-b border-[#EAE5DF] hover:bg-[#FDFBF7] transition-colors group">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0 border border-[#EAE5DF]">
                  <img src={item.image} alt={item.name} class="w-full h-full object-cover" />
                </div>
                <div>
                  <span class="font-bold text-[#161311] block">{item.name}</span>
                  <span class="text-xs text-gray-500 line-clamp-1">{item.description}</span>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C79F44]/10 text-[#B68D37] border border-[#C79F44]/20">
                {item.category}
              </span>
            </td>
            <td class="py-4 px-6 font-bold text-[#161311]">{item.price}</td>
            <td class="py-4 px-6 text-right">
              <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick={() => openEditModal(item)} class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                </button>
                <button onclick={() => deleteProductItem(item.id)} class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </td>
          </tr>
        {/each}
        {#if filteredProducts.length === 0}
          <tr>
            <td colspan="4" class="py-8 text-center text-gray-400 font-medium">Data produk belum tersedia.</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

<!-- Modal Form -->
{#if showModal}
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
    <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div class="p-6 border-b border-[#EAE5DF] flex items-center justify-between bg-[#FDFBF7]">
        <h3 class="text-xl font-serif font-bold text-[#161311]">
          {editMode ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h3>
        <button onclick={() => showModal = false} class="text-gray-400 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto space-y-5">
        
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Nama Produk / Menu</label>
          <input type="text" bind:value={currentProduct.name} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2 flex items-center justify-between">
            Kategori
            {#if !showNewCategoryInput}
              <button onclick={() => showNewCategoryInput = true} class="text-xs text-[#C79F44] hover:underline">+ Kategori Baru</button>
            {:else}
              <button onclick={() => showNewCategoryInput = false} class="text-xs text-gray-500 hover:underline">Batal</button>
            {/if}
          </label>
          
          {#if showNewCategoryInput}
            <input type="text" bind:value={newCategoryName} placeholder="Ketik kategori baru..." class="w-full px-4 py-3 rounded-xl border border-[#C79F44] outline-none bg-white text-[#161311] shadow-sm" autofocus />
          {:else}
            <select bind:value={currentProduct.category} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]">
              {#each categories as cat}
                <option value={cat}>{cat}</option>
              {/each}
            </select>
          {/if}
        </div>

        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Harga</label>
          <input type="text" bind:value={currentProduct.price} placeholder="Rp..." class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Deskripsi Produk</label>
          <div class="bg-white rounded-xl overflow-hidden border border-[#EAE5DF]">
            <div use:quillAction class="min-h-[150px] text-[#161311] text-base border-none editor-container"></div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Foto Produk</label>
          <input 
            type="file" 
            bind:this={fileInput}
            multiple 
            accept="image/*" 
            class="hidden" 
            onchange={handleFileChange}
          />
          
          <div class="mt-2">
            {#if allProductFiles.length > 0 || currentProduct.image}
              <div class="flex gap-3 overflow-x-auto pb-2 items-center">
                {#if currentProduct.image && allProductFiles.length === 0}
                  <img src={currentProduct.image} alt="Preview Produk" class="w-24 h-24 object-cover rounded-xl border border-[#EAE5DF] shadow-sm shrink-0" />
                {/if}
                {#each productPreviews as preview, i}
                  <div class="relative shrink-0 group">
                    <img src={preview} alt="Preview Produk" class="w-24 h-24 object-cover rounded-xl border border-[#EAE5DF] shadow-sm" />
                    <button onclick={() => removeFile(i)} class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md" title="Hapus foto">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                {/each}
                
                <!-- Tombol Tambah Foto (Kotak) -->
                <button onclick={() => fileInput.click()} class="w-24 h-24 rounded-xl border-2 border-dashed border-[#C79F44] flex flex-col items-center justify-center text-[#C79F44] hover:bg-[#C79F44]/10 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 mb-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  <span class="text-xs font-bold">Tambah</span>
                </button>
              </div>
            {:else}
              <button onclick={() => fileInput.click()} class="w-full py-8 rounded-xl border-2 border-dashed border-[#EAE5DF] flex flex-col items-center justify-center text-gray-400 hover:border-[#C79F44] hover:text-[#C79F44] transition-colors bg-[#FDFBF7]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10 mb-2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                <span class="font-medium">Klik untuk upload foto produk</span>
              </button>
            {/if}
          </div>
        </div>
        
      </div>
      
      <div class="p-6 border-t border-[#EAE5DF] flex justify-end gap-3 bg-gray-50">
        <button onclick={() => showModal = false} class="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Batal</button>
        <button onclick={saveProduct} disabled={isSaving} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-8 py-2.5 rounded-xl font-bold shadow-md transition-all disabled:opacity-50">{isSaving ? 'Menyimpan...' : 'Simpan Produk'}</button>
      </div>
    </div>
  </div>
{/if}

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
    min-height: 150px;
  }
  :global(.ql-editor.ql-blank::before) {
    font-style: normal;
    color: #9CA3AF;
  }
</style>
