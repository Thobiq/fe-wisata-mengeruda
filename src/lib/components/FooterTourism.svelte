<script>
	import { onMount } from 'svelte';
	import { getProfile } from '$lib/api';

	let namaDesa = $state('Desa Wisata Mengeruda');
	let deskripsi = $state(
		'Kawasan ekowisata dan pemandian air panas alami terpopuler di Kabupaten Ngada, Nusa Tenggara Timur. Menghadirkan keajaiban geologi purba dan kehangatan budaya Soa.'
	);
	let alamat = $state('Kawasan Wisata Air Panas Mengeruda, Soa, Ngada, NTT 86452');
	let email = $state('wisata@mengeruda.id');
	let telepon = $state('+62 821-4567-8900');
	let logoUrl = $state('/logo.png');

	onMount(async () => {
		try {
			const res = await getProfile();
			if (res) {
				if (res.nama_desa || res.nama) {
					namaDesa = res.nama_desa || res.nama;
				}
				if (res.deskripsi_singkat) {
					deskripsi = res.deskripsi_singkat;
				}
				if (res.alamat) {
					alamat = res.alamat;
				}
				if (res.email) {
					email = res.email;
				}
				if (res.telepon || res.no_telp) {
					telepon = res.telepon || res.no_telp;
				}
				if (res.logo || res.logo_url) {
					let url = res.logo_url || (res.logo.startsWith('http') ? res.logo : `/storage/${res.logo.replace('/storage/', '')}`);
					if (!url.startsWith('http')) {
						url = `${import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8000'}${url.startsWith('/') ? '' : '/'}${url}`;
					}
					logoUrl = url;
				}
			}
		} catch (e) {
			console.error('Gagal memuat profil footer tourism:', e);
		}
	});
</script>

<footer class="bg-[#150E09] text-stone-300 font-sans border-t border-[#2C2520] pt-16 pb-10 relative overflow-hidden">
	<!-- Subtle ambient light -->
	<div class="absolute -top-48 right-10 w-96 h-96 bg-[#FACC15]/5 rounded-full blur-3xl pointer-events-none"></div>

	<div class="max-w-[1300px] mx-auto px-6 relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#2C2520]">
			<!-- Kolom 1: Profil Wisata & Logo -->
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<img
						src={logoUrl}
						alt="Logo {namaDesa}"
						class="w-12 h-12 object-contain drop-shadow"
					/>
					<div>
						<h3 class="font-serif font-bold text-lg text-white tracking-wide leading-snug">
							{namaDesa}
						</h3>
						<p class="text-xs uppercase tracking-widest text-[#FACC15] font-semibold">
							Tourism Information Center
						</p>
					</div>
				</div>
				<p class="text-sm text-stone-400 leading-relaxed text-justify">
					{deskripsi}
				</p>
			</div>

			<!-- Kolom 2: Navigasi Cepat -->
			<div>
				<h4 class="font-serif font-bold text-white text-base mb-4 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-[#FACC15]"></span>
					<span>Jelajahi Wisata</span>
				</h4>
				<ul class="space-y-2.5 text-sm font-medium">
					<li>
						<a
							href="/#sejarah"
							class="text-stone-400 hover:text-[#FACC15] transition-colors flex items-center gap-2"
						>
							<span>&rarr;</span>
							<span>Sejarah & Geologi</span>
						</a>
					</li>
					<li>
						<a
							href="/#destinasi"
							class="text-stone-400 hover:text-[#FACC15] transition-colors flex items-center gap-2"
						>
							<span>&rarr;</span>
							<span>Daftar Tempat Wisata</span>
						</a>
					</li>
					<li>
						<a
							href="/#kegiatan"
							class="text-stone-400 hover:text-[#FACC15] transition-colors flex items-center gap-2"
						>
							<span>&rarr;</span>
							<span>Kegiatan & Budaya Soa</span>
						</a>
					</li>
					<li>
						<a
							href="/#berita"
							class="text-stone-400 hover:text-[#FACC15] transition-colors flex items-center gap-2"
						>
							<span>&rarr;</span>
							<span>Berita & Kabar Wisata</span>
						</a>
					</li>
					<li>
						<a
							href="/#galeri"
							class="text-stone-400 hover:text-[#FACC15] transition-colors flex items-center gap-2"
						>
							<span>&rarr;</span>
							<span>Galeri Visual</span>
						</a>
					</li>
					<li>
						<a
							href="/struktur-organisasi"
							class="text-stone-400 hover:text-[#FACC15] transition-colors flex items-center gap-2"
						>
							<span>&rarr;</span>
							<span>Pengelola Pariwisata</span>
						</a>
					</li>
				</ul>
			</div>

			<!-- Kolom 3: Layanan & Informasi -->
			<div>
				<h4 class="font-serif font-bold text-white text-base mb-4 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-[#FACC15]"></span>
					<span>Layanan Pengunjung</span>
				</h4>
				<ul class="space-y-2.5 text-sm font-medium">
					<li class="text-stone-400">
						<span class="text-white font-semibold">Jam Operasional:</span><br />
						<span>Senin - Minggu (06.00 - 18.00 WITA)</span>
					</li>
					<li class="text-stone-400 pt-1">
						<span class="text-white font-semibold">Fasilitas Tersedia:</span><br />
						<span>Kolam Pemandian Air Panas, Gazebo, Mushola, Area Parkir Luas, Toko UMKM & Resto.</span>
					</li>
				</ul>
			</div>

			<!-- Kolom 4: Kontak & Alamat -->
			<div>
				<h4 class="font-serif font-bold text-white text-base mb-4 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-[#FACC15]"></span>
					<span>Kantor Pengelola</span>
				</h4>
				<div class="space-y-3 text-sm text-stone-400">
					<div class="flex items-start gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.8"
							stroke="currentColor"
							class="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
							/>
						</svg>
						<span>{alamat}</span>
					</div>
					<div class="flex items-center gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.8"
							stroke="currentColor"
							class="w-5 h-5 text-[#FACC15] shrink-0"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
							/>
						</svg>
						<span>{email}</span>
					</div>
					<div class="flex items-center gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.8"
							stroke="currentColor"
							class="w-5 h-5 text-[#FACC15] shrink-0"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
							/>
						</svg>
						<span>{telepon}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright Bar -->
		<div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
			<p>
				&copy; {new Date().getFullYear()} Pemerintah & Pengelola {namaDesa}. Hak Cipta Dilindungi.
			</p>
			<div class="flex items-center gap-6">
				<a href="/admin/login" class="hover:text-[#FACC15] transition-colors font-semibold">
					Portal Admin Wisata &rarr;
				</a>
			</div>
		</div>
	</div>
</footer>
