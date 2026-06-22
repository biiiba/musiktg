export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'No URL provided' });

    try {
        // Чтобы не перегружать бесплатный Vercel тяжелыми библиотеками скачивания,
        // мы используем надежный публичный API конвертера напрямую
        const apiRes = await fetch(`https://co.wuk.sh/api/json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ url: url, vQuality: '720', isAudioOnly: true })
        });
        const target = await apiRes.json();

        if (target.status === 'redirect' || target.url) {
            return res.status(200).json({
                success: true,
                title: target.text || 'Аудио трек',
                artist: 'YouTube Media',
                audioUrl: target.url
            });
        }
        return res.status(500).json({ success: false, error: 'Не удалось извлечь аудио' });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
    }
}
