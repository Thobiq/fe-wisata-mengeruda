import { getEvent, getEvents } from '$lib/api';

export const ssr = false;

export async function load({ params }) {
    try {
        const id = params.id;
        const detail = await getEvent(id);
        const allEvents = await getEvents();
        const others = (allEvents || []).filter(e => String(e.id) !== String(id)).slice(0, 3);
        
        return {
            detail,
            others
        };
    } catch (e) {
        console.error('Gagal memuat detail kegiatan:', e);
        return {
            detail: null,
            others: []
        };
    }
}
