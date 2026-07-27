<script>
  import { onMount } from 'svelte';
  import { getEvents, createEvent, updateEvent, deleteEvent } from '$lib/api';

  let events = $state([]);
  let isLoading = $state(true);
  let isSaving = $state(false);

  let showModal = $state(false);
  let editMode = $state(false);
  let currentEvent = $state({ id: null, name: '', date: '', location: '', status: 'Akan Datang', image: '' });
  let imageFiles = $state();
  let searchQuery = $state('');

  let filteredEvents = $derived(
    events.filter(e => (e.name || '').toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const loadData = async () => {
    isLoading = true;
    try {
      events = await getEvents();
    } catch (e) {
      console.error('Gagal mengambil kegiatan:', e);
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    loadData();
  });

  const openAddModal = () => {
    editMode = false;
    currentEvent = { id: null, name: '', date: '', location: '', description: '', status: 'Akan Datang', image: '' };
    imageFiles = undefined;
    showModal = true;
  };

  const openEditModal = (event) => {
    editMode = true;
    currentEvent = { ...event };
    imageFiles = undefined;
    showModal = true;
  };

  const deleteEventItem = async (id) => {
    if(confirm('Yakin ingin menghapus acara ini?')) {
      try {
        await deleteEvent(id);
        await loadData();
      } catch (e) {
        alert('Gagal menghapus acara: ' + (e.response?.data?.message || e.message));
      }
    }
  };

  const saveEvent = async () => {
    if (!currentEvent.name) {
      alert('Nama acara wajib diisi!');
      return;
    }
    isSaving = true;
    try {
      const formData = new FormData();
      formData.append('name', currentEvent.name || '');
      formData.append('date', currentEvent.date || '');
      formData.append('location', currentEvent.location || '');
      formData.append('description', currentEvent.description || '');
      formData.append('status', currentEvent.status || 'Akan Datang');

      if (imageFiles && imageFiles.length > 0) {
        formData.append('image', imageFiles[0]);
      } else if (currentEvent.image) {
        formData.append('image', currentEvent.image);
      }

      if (editMode && currentEvent.id) {
        await updateEvent(currentEvent.id, formData);
      } else {
        await createEvent(formData);
      }
      showModal = false;
      await loadData();
    } catch (e) {
      alert('Gagal menyimpan acara: ' + (e.response?.data?.message || e.message));
    } finally {
      isSaving = false;
    }
  };
</script>

<svelte:head>
  <title>Kegiatan & Adat - Tourism Admin</title>
</svelte:head>

<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
  <div>
    <h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Kegiatan & Upacara Adat</h2>
    <p class="text-[#6D5D51] text-lg">Kelola jadwal festival, ritual budaya, dan acara publik desa.</p>
  </div>
  <button onclick={openAddModal} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
    Tambah Jadwal
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
    placeholder="Cari nama acara..." 
    class="w-full bg-transparent border-none outline-none text-[#161311] px-2 py-2"
  />
</div>

<!-- Tabel -->
<div class="bg-white rounded-2xl border border-[#EAE5DF] shadow-sm overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-[#FDFBF7] border-b border-[#EAE5DF] text-[#6D5D51] text-sm font-semibold uppercase tracking-wider">
          <th class="py-4 px-6">Nama Acara</th>
          <th class="py-4 px-6">Tanggal</th>
          <th class="py-4 px-6">Lokasi</th>
          <th class="py-4 px-6">Status</th>
          <th class="py-4 px-6 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredEvents as event}
          <tr class="border-b border-[#EAE5DF] hover:bg-[#FDFBF7] transition-colors group">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-[#C79F44]/30">
                  <img src={event.image} alt={event.name} class="w-full h-full object-cover" />
                </div>
                <span class="font-bold text-[#161311]">{event.name}</span>
              </div>
            </td>
            <td class="py-4 px-6 text-[#6D5D51] font-medium">{event.date}</td>
            <td class="py-4 px-6 text-[#6D5D51]">{event.location}</td>
            <td class="py-4 px-6">
              <span class={`inline-block px-3 py-1 rounded-full text-xs font-bold ${event.status === 'Selesai' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                {event.status}
              </span>
            </td>
            <td class="py-4 px-6 text-right">
              <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick={() => openEditModal(event)} class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                </button>
                <button onclick={() => deleteEventItem(event.id)} class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </td>
          </tr>
        {/each}
        {#if filteredEvents.length === 0}
          <tr>
            <td colspan="5" class="py-8 text-center text-gray-400 font-medium">Acara tidak ditemukan.</td>
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
      <div class="p-6 border-b border-[#EAE5DF] flex items-center justify-between bg-[#FDFBF7] text-[#161311]">
        <h3 class="text-xl font-serif font-bold text-[#161311]">
          {editMode ? 'Edit Acara' : 'Tambah Acara Baru'}
        </h3>
        <button onclick={() => showModal = false} class="text-gray-400 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto space-y-5">
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Nama Acara / Ritual</label>
          <input type="text" bind:value={currentEvent.name} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Tanggal</label>
            <input type="date" bind:value={currentEvent.date} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Status</label>
            <select bind:value={currentEvent.status} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]">
              <option value="Akan Datang">Akan Datang</option>
              <option value="Direncanakan">Direncanakan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Lokasi Pelaksanaan</label>
          <input type="text" bind:value={currentEvent.location} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Deskripsi & Makna Kegiatan</label>
          <textarea 
            bind:value={currentEvent.description} 
            rows="4" 
            placeholder="Jelaskan detail rangkaian kegiatan, nilai adat, dan informasi bagi pengunjung..." 
            class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311]"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-[#6D5D51] mb-2">Pilih Foto/Poster (Pilih File)</label>
          <input type="file" onchange={(e) => imageFiles = e.target.files} accept="image/*" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] outline-none bg-[#FDFBF7] text-[#161311] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#161311] file:text-[#C79F44] hover:file:bg-[#2C2520] cursor-pointer" />
        </div>
      </div>
      
      <div class="p-6 border-t border-[#EAE5DF] flex justify-end gap-3 bg-gray-50">
        <button onclick={() => showModal = false} class="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Batal</button>
        <button onclick={saveEvent} disabled={isSaving} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-8 py-2.5 rounded-xl font-bold shadow-md transition-all disabled:opacity-50">{isSaving ? 'Menyimpan...' : 'Simpan'}</button>
      </div>
    </div>
  </div>
{/if}
