<script>
	import '../../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import api from '$lib/api'; // Pastikan axios sudah diset dengan interceptor CSRF
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';

	let { children } = $props();

	// State untuk toggle sidebar di tampilan mobile
	let isSidebarOpen = $state(false);
	let isCheckingAuth = $state(true);
	let userPermissions = $state([]);
	let isUnauthorized = $state(false);
	let showLogoutModal = $state(false);
	let isLoggingOut = $state(false);

	// Daftar menu sidebar Tourism Admin
	const allMenus = [
		{
			name: 'Dashboard',
			path: '/admin',
			permissions: null,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" /></svg>`
		},
		{
			name: 'Profil Wisata',
			path: '/admin/profil',
			permissions: ['manage-tourism-profile'],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47 3.97a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>`
		},
		{
			name: 'Data UMKM',
			path: '/admin/umkm',
			permissions: ['manage-umkm'],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-4.5zm0 8.25a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v2.25c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-2.25zm-9.75-8.25a.375.375 0 00-.375-.375H3.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-4.5zM3 17.625a.375.375 0 01.375-.375h7.5a.375.375 0 01.375.375v2.25a.375.375 0 01-.375.375h-7.5a.375.375 0 01-.375-.375v-2.25z" clip-rule="evenodd" /></svg>`
		},
		{
			name: 'Tempat Wisata',
			path: '/admin/tempat-wisata',
			permissions: ['manage-tourism-places'],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
		},
		{
			name: 'Kegiatan & Adat',
			path: '/admin/kegiatan',
			permissions: ['manage-activities'],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.222 2.365c0 6.643-4.606 12.339-11.31 14.577a.75.75 0 01-.454 0C2.868 20.469-1.738 14.772-1.738 8.13c0-.82.077-1.619.222-2.365a.75.75 0 01.722-.515 11.21 11.21 0 007.877-3.08zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15 16.5a3 3 0 00-6 0v.75h6v-.75z" clip-rule="evenodd" /></svg>`
		},
		{
			name: 'Berita Wisata',
			path: '/admin/berita',
			permissions: ['manage-tourism-news'],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" /><path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25z" clip-rule="evenodd" /></svg>`
		},
		{
			name: 'Galeri Wisata',
			path: '/admin/galeri',
			permissions: ['manage-tourism-gallery'],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" /></svg>`
		}
	];

	let currentPath = $derived($page.url.pathname);

	// Hanya ambil menu jika ada permission. Untuk dummy/development, kita izinkan semuanya lolos di frontend.
	// Tapi untuk keamanan, kita filter.
	let menus = $derived(
		allMenus.filter((m) => {
			if (!m.permissions) return true;
			if (Array.isArray(m.permissions)) {
				return m.permissions.some((p) => userPermissions.includes(p));
			}
			return userPermissions.includes(m.permissions);
		})
	);

	// Jika Anda ingin menguji tanpa harus repot mengatur roles di database, ubah forceBypassAuth = true
	let forceBypassAuth = false;

	let pageTitle = $derived(menus.find((m) => m.path === currentPath)?.name || 'Dashboard');

	onMount(async () => {
		if (forceBypassAuth) {
			isCheckingAuth = false;
			userPermissions = [
				'manage-tourism-profile',
				'manage-umkm',
				'manage-tourism-places',
				'manage-activities',
				'manage-tourism-news',
				'manage-tourism-gallery'
			];
			return;
		}

		try {
			const response = await api.get('/user');
			if (response.data.success) {
				let perms = [];
				if (response.data.user.roles) {
					response.data.user.roles.forEach((role) => {
						if (role.permissions) {
							role.permissions.forEach((p) => perms.push(p.name));
						}
					});
				}
				userPermissions = [...new Set(perms)];
				isCheckingAuth = false;

				const allowedMenu = allMenus.find(
					(m) => m.path === currentPath || currentPath.startsWith(m.path + '/')
				);

				if (allowedMenu && allowedMenu.permissions) {
					let hasAccess = false;
					if (Array.isArray(allowedMenu.permissions)) {
						hasAccess = allowedMenu.permissions.some((p) => userPermissions.includes(p));
					} else {
						hasAccess = userPermissions.includes(allowedMenu.permissions);
					}
					if (!hasAccess) {
						isUnauthorized = true;
					}
				}
			} else {
				redirectToLogin();
			}
		} catch (err) {
			console.error('Auth check failed:', err);
			redirectToLogin();
		}
	});

	const redirectToLogin = () => {
		const currentUrl = window.location.pathname + window.location.search;
		window.location.href = `/login?redirect_to=${encodeURIComponent(currentUrl)}`;
	};

	const handleLogout = () => {
		showLogoutModal = true;
	};

	const confirmLogout = async () => {
		isLoggingOut = true;
		try {
			if (!forceBypassAuth) await api.post('/logout');
		} catch (err) {
			console.error('Logout failed:', err);
		} finally {
			redirectToLogin();
		}
	};
</script>

<!-- Tema Dark/Gold (Minimalis & Elegan) -->
<div class="flex h-screen bg-[#FDFBF7] font-sans overflow-hidden">
	{#if isCheckingAuth}
		<div class="fixed inset-0 flex justify-center items-center bg-[#161311] z-[9999]">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C79F44]"></div>
		</div>
	{/if}

	{#if isSidebarOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
			onclick={() => (isSidebarOpen = false)}
		></div>
	{/if}

	<!-- SIDEBAR (Dark Brown) -->
	<aside
		class={`
    fixed lg:static inset-y-0 left-0 z-50
    w-[260px] bg-[#161311] flex flex-col text-gray-300 border-r border-[#2C2520]
    transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `}
	>
		<!-- Logo & Title -->
		<div class="flex items-center gap-3 px-6 py-8 border-b border-[#2C2520]">
			<div
				class="w-10 h-10 bg-gradient-to-br from-[#E2C37A] to-[#B68D37] rounded-xl flex items-center justify-center shrink-0 shadow-lg"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6 text-[#161311]"
				>
					<path
						fill-rule="evenodd"
						d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div>
				<h2 class="font-serif font-bold text-white text-[16px] tracking-wide">Tourism Admin</h2>
				<p class="text-[12px] text-[#C79F44] font-medium">Desa Mengeruda</p>
			</div>
		</div>

		<!-- Menu Navigasi -->
		<nav class="flex-1 px-4 space-y-1.5 overflow-y-auto mt-6 custom-scrollbar">
			<div class="text-[10px] font-bold text-[#6D5D51] uppercase tracking-widest px-4 mb-3">
				Menu Utama
			</div>
			{#each menus as menu}
				<a
					href={menu.path}
					class={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-all
            ${
							currentPath === menu.path
								? 'bg-[#C79F44]/10 text-[#C79F44] border border-[#C79F44]/20'
								: 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
						}
          `}
					onclick={() => (isSidebarOpen = false)}
				>
					<span class={`shrink-0 ${currentPath === menu.path ? 'text-[#C79F44]' : 'text-gray-500'}`}
						>{@html menu.icon}</span
					>
					{menu.name}
				</a>
			{/each}
		</nav>

		<!-- Tombol Logout -->
		<div class="p-4 mb-4 border-t border-[#2C2520]">
			<button
				onclick={handleLogout}
				class="flex items-center gap-3 px-4 py-2.5 w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-lg font-medium text-[14px] transition-colors border border-transparent"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5 rotate-180 text-gray-500"
				>
					<path
						fill-rule="evenodd"
						d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
				Logout
			</button>
		</div>
	</aside>

	<!-- AREA KONTEN UTAMA -->
	<div class="flex-1 flex flex-col min-w-0 bg-[#FDFBF7] text-[#161311]">
		<!-- HEADER -->
		<header
			class="h-[76px] bg-white border-b border-[#EAE5DF] flex items-center justify-between px-6 lg:px-10 shrink-0 shadow-sm"
		>
			<div class="flex items-center gap-4">
				<!-- Tombol Hamburger -->
				<button
					class="lg:hidden p-2 text-gray-500 hover:bg-[#FDFBF7] rounded-lg border border-transparent hover:border-[#EAE5DF] transition-colors"
					onclick={() => (isSidebarOpen = true)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
				<!-- Judul Dinamis -->
				<h1 class="text-xl font-serif font-bold text-[#161311]">{pageTitle}</h1>
			</div>

			<!-- Profil Admin -->
			<div class="flex items-center gap-3">
				<span class="font-medium text-[#6D5D51] hidden sm:block text-sm">Tourism Administrator</span
				>
				<div
					class="w-10 h-10 bg-[#161311] border-2 border-[#C79F44] rounded-full flex items-center justify-center text-[#C79F44] shadow-md cursor-pointer hover:scale-105 transition-transform"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							fill-rule="evenodd"
							d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			</div>
		</header>

		<!-- KONTEN HALAMAN -->
		<main class="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10 relative">
			{#if isUnauthorized}
				<div
					class="absolute inset-0 bg-[#FDFBF7]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 text-center"
				>
					<div
						class="w-20 h-20 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-10 h-10 text-red-500"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h2 class="text-2xl font-bold font-serif text-[#161311] mb-2">Akses Ditolak</h2>
					<p class="text-[#6D5D51] max-w-md mx-auto mb-8 leading-relaxed">
						Maaf, akun Anda tidak memiliki izin untuk mengelola fitur pariwisata. Silakan hubungi
						Administrator Utama.
					</p>
					<a
						href="/admin"
						class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
						>Kembali ke Dashboard</a
					>
				</div>
			{:else}
				{@render children()}
			{/if}
		</main>
	</div>
</div>

<ConfirmModal
	bind:open={showLogoutModal}
	title="Konfirmasi Keluar"
	message="Apakah Anda yakin ingin keluar dari portal manajemen pariwisata Desa Mengeruda?"
	confirmText="Keluar Sekarang"
	cancelText="Batal"
	type="warning"
	loading={isLoggingOut}
	onConfirm={confirmLogout}
/>

<style>
	/* Kustomisasi scrollbar khusus untuk sidebar */
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #312921;
		border-radius: 10px;
	}
	.custom-scrollbar:hover::-webkit-scrollbar-thumb {
		background: #4a3e32;
	}
</style>
