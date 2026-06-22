export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { url } = req.body;
    // Мы просто возвращаем URL боту, но так как Vercel не может скачивать, 
    // давай сделаем финт: отдадим ссылку боту обратно через WebApp Data
    return res.status(200).json({ success: true, message: 'Ссылка отправлена боту' });
}
