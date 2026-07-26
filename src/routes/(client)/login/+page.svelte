<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import api, { initCsrf } from '$lib/api';

	const bgImages = [
		'/hero-1.jpg',
		'/hero-2.png',
	];

	let currentIndex = $state(0);
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let isLoading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let redirectTo = $state('/admin');

	onMount(() => {
		const redirectParam = $page.url.searchParams.get('redirect_to');
		if (redirectParam && redirectParam.startsWith('/admin')) {
			redirectTo = redirectParam;
		}
	});

	$effect(() => {
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % bgImages.length;
		}, 5000);
		return () => clearInterval(interval);
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			errorMessage = 'Email dan Password wajib diisi.';
			return;
		}

		isLoading = true;
		errorMessage = '';
		successMessage = '';

		try {
			await initCsrf();
			const res = await api.post('/login', { email, password });

			if (res.data.success) {
				successMessage = 'Login berhasil! Menyiapkan portal pariwisata...';
				setTimeout(() => {
					window.location.href = redirectTo;
				}, 800);
			} else {
				errorMessage = res.data.message || 'Login gagal, periksa email dan password.';
				isLoading = false;
			}
		} catch (err) {
			console.error('Login error:', err);
			errorMessage =
				err.response?.data?.message ||
				'Terjadi kesalahan saat terhubung ke server. Pastikan layanan backend berjalan.';
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>Login Pengelola Pariwisata | Wisata Desa Mengeruda</title>
</svelte:head>

<div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-serif py-10 px-4">
	<!-- Background Slider -->
	{#each bgImages as img, index}
		<div 
			class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
			style="background-image: url('{img}'); opacity: {index === currentIndex ? 1 : 0};"
		></div>
	{/each}

	<!-- Overlay Luxury Dark -->
	<div class="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>

	<!-- Login Card -->
	<div class="relative z-10 w-full max-w-md mx-4">
		<!-- Card Glassmorphism -->
		<div class="bg-stone-900/85 backdrop-blur-2xl border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-white">
			<!-- Header Banner -->
			<div class="px-8 pt-8 pb-6 border-b border-stone-800 text-center relative">
				<div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 shadow-lg shadow-amber-500/25 mb-4">
					<svg class="w-8 h-8 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h1 class="text-2xl font-bold text-amber-400 tracking-tight font-serif">
					Wisata Desa Mengeruda
				</h1>
				<p class="text-xs text-stone-400 mt-1 uppercase tracking-widest font-medium font-sans">
					Portal Manajemen Pariwisata & Alam
				</p>
			</div>

			<!-- Form Section -->
			<div class="p-8 font-sans">
				{#if errorMessage}
					<div
						class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm animate-fade-in"
					>
						<svg class="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{errorMessage}</span>
					</div>
				{/if}

				{#if successMessage}
					<div
						class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-sm animate-fade-in"
					>
						<svg class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{successMessage}</span>
					</div>
				{/if}

				<form onsubmit={handleLogin} class="space-y-5">
					<!-- Input Email -->
					<div>
						<label for="email" class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
							Alamat Email
						</label>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder="admin@mengeruda.id"
								required
								class="w-full pl-11 pr-4 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm"
							/>
						</div>
					</div>

					<!-- Input Password -->
					<div>
						<label for="password" class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
							Kata Sandi
						</label>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								bind:value={password}
								placeholder="••••••••"
								required
								class="w-full pl-11 pr-12 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition-colors"
								title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
							>
								{#if showPassword}
									<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
									</svg>
								{:else}
									<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								{/if}
							</button>
						</div>
					</div>

					<!-- Tombol Login -->
					<button
						type="submit"
						disabled={isLoading}
						class="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2"
					>
						{#if isLoading}
							<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-stone-950" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span>Memverifikasi...</span>
						{:else}
							<span>Masuk ke Portal Pariwisata</span>
							<svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						{/if}
					</button>
				</form>

				<!-- Footer link -->
				<div class="mt-8 pt-6 border-t border-stone-800 text-center">
					<a href="/" class="text-xs text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
						<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						<span>Kembali ke Beranda Wisata</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Copyright text -->
		<p class="text-center text-xs text-stone-500 mt-6 font-sans">
			&copy; 2026 Pengelola Pariwisata Desa Mengeruda, NTT.
		</p>
	</div>
</div>