import axios from 'axios';

export const BACKEND_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_PUBLIC_BACKEND_URL || import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8000');
export const API_BASE = `${BACKEND_URL}/api/tourism`;

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

// Helper untuk fetch CSRF cookie Sanctum sebelum mutasi data
export async function initCsrf() {
    try {
        await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
    } catch (e) {
        console.error('Gagal mengambil CSRF cookie:', e);
    }
}

// =======================
// 1. TEMPAT WISATA API
// =======================
export async function getAttractions() {
    const response = await api.get('/attractions');
    return response.data.data;
}

export async function getAttraction(id) {
    const response = await api.get(`/attractions/${id}`);
    return response.data.data;
}

export async function createAttraction(formData) {
    await initCsrf();
    const response = await api.post('/attractions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateAttraction(id, formData) {
    await initCsrf();
    // Laravel method spoofing untuk form-data multipart PUT
    if (formData instanceof FormData) {
        formData.append('_method', 'PUT');
        const response = await api.post(`/attractions/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } else {
        const response = await api.put(`/attractions/${id}`, formData);
        return response.data.data;
    }
}

export async function deleteAttraction(id) {
    await initCsrf();
    const response = await api.delete(`/attractions/${id}`);
    return response.data;
}

// =======================
// 2. TOKO UMKM API
// =======================
export async function getUmkms() {
    const response = await api.get('/umkms');
    return response.data.data;
}

export async function createUmkm(formData) {
    await initCsrf();
    const response = await api.post('/umkms', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateUmkm(id, formData) {
    await initCsrf();
    if (formData instanceof FormData) {
        formData.append('_method', 'PUT');
        const response = await api.post(`/umkms/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } else {
        const response = await api.put(`/umkms/${id}`, formData);
        return response.data.data;
    }
}

export async function deleteUmkm(id) {
    await initCsrf();
    const response = await api.delete(`/umkms/${id}`);
    return response.data;
}

// =======================
// 3. PRODUK UMKM API
// =======================
export async function getProducts(umkmId = null) {
    const url = umkmId ? `/umkms/${umkmId}/products` : '/products';
    const response = await api.get(url);
    return response.data.data;
}

export async function createProduct(formData) {
    await initCsrf();
    const response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateProduct(id, formData) {
    await initCsrf();
    if (formData instanceof FormData) {
        formData.append('_method', 'PUT');
        const response = await api.post(`/products/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } else {
        const response = await api.put(`/products/${id}`, formData);
        return response.data.data;
    }
}

export async function deleteProduct(id) {
    await initCsrf();
    const response = await api.delete(`/products/${id}`);
    return response.data;
}

// =======================
// 4. BERITA WISATA API
// =======================
export async function getNews() {
    const response = await api.get('/news');
    return response.data.data;
}

export async function createNews(formData) {
    await initCsrf();
    const response = await api.post('/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateNews(id, formData) {
    await initCsrf();
    if (formData instanceof FormData) {
        formData.append('_method', 'PUT');
        const response = await api.post(`/news/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } else {
        const response = await api.put(`/news/${id}`, formData);
        return response.data.data;
    }
}

export async function deleteNews(id) {
    await initCsrf();
    const response = await api.delete(`/news/${id}`);
    return response.data;
}

// =======================
// 5. GALERI PARIWISATA API
// =======================
export async function getGalleries(category = 'Semua') {
    const response = await api.get('/galleries', {
        params: category && category !== 'Semua' ? { category } : {}
    });
    return response.data.data;
}

export async function createGallery(formData) {
    await initCsrf();
    const response = await api.post('/galleries', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateGallery(id, formData) {
    await initCsrf();
    if (formData instanceof FormData) {
        formData.append('_method', 'PUT');
        const response = await api.post(`/galleries/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } else {
        const response = await api.put(`/galleries/${id}`, formData);
        return response.data.data;
    }
}

export async function deleteGallery(id) {
    await initCsrf();
    const response = await api.delete(`/galleries/${id}`);
    return response.data;
}

// =======================
// 6. AGENDA / KEGIATAN API
// =======================
export async function getEvents() {
    const response = await api.get('/events');
    return response.data.data;
}

export async function createEvent(formData) {
    await initCsrf();
    const response = await api.post('/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateEvent(id, formData) {
    await initCsrf();
    if (formData instanceof FormData) {
        formData.append('_method', 'PUT');
        const response = await api.post(`/events/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } else {
        const response = await api.put(`/events/${id}`, formData);
        return response.data.data;
    }
}

export async function deleteEvent(id) {
    await initCsrf();
    const response = await api.delete(`/events/${id}`);
    return response.data;
}

// =======================
// 7. PROFIL PARIWISATA API
// =======================
export async function getProfile() {
    const response = await api.get('/profile');
    return response.data.data;
}

export async function updateProfile(data) {
    await initCsrf();
    if (data instanceof FormData) {
        const response = await api.post('/profile', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } else {
        const response = await api.put('/profile', data);
        return response.data.data;
    }
}

// =======================
// 8. UPLOAD IMAGE INLINE
// =======================
export async function uploadInlineImage(file) {
    await initCsrf();
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
}

export default api;
