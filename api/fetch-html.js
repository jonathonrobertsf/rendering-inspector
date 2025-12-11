export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Missing ?url=" });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 SSR-Inspector"
      }
    });

    const text = await response.text();

    res.status(200).json({ html: text });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
