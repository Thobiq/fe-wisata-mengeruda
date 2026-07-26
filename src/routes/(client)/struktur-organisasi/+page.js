/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    try {
        const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL || import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8000';
        const response = await fetch(`${baseUrl}/api/struktur-desa`);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data struktur organisasi');
        }
        
        const data = await response.json();
        
        return {
            perangkat: data.data || []
        };
    } catch (error) {
        console.error('Error fetching org chart data:', error);
        return {
            perangkat: [],
            error: error.message
        };
    }
}
