import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.DEV ? '/api' : ((import.meta.env.VITE_PUBLIC_BACKEND_URL || import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8001').replace(/\/$/, '') + '/api'),
    headers: {
        'Accept': 'application/json'
    }
});

// Interceptor untuk menyisipkan token JWT
api.interceptors.request.use(config => {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('sso_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

// Interceptor untuk meredirect ke SSO jika token invalid (401)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('sso_token');
                localStorage.removeItem('sso_user');
                const ssoUrl = import.meta.env.VITE_PUBLIC_SSO_URL || 'http://localhost:5176/';
                window.location.href = ssoUrl;
            }
        }
        return Promise.reject(error);
    }
);

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
    const response = await api.post('/attractions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateAttraction(id, formData) {
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
    const response = await api.post('/umkms', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateUmkm(id, formData) {
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
    const response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateProduct(id, formData) {
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
    const response = await api.post('/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateNews(id, formData) {
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
    const response = await api.post('/galleries', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateGallery(id, formData) {
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

export async function getEvent(id) {
    const response = await api.get(`/events/${id}`);
    return response.data.data;
}

export async function createEvent(formData) {
    const response = await api.post('/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
}

export async function updateEvent(id, formData) {
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
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
}

// Dummy function to prevent errors in legacy login pages
export async function initCsrf() {}

export default api;
