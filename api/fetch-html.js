export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Missing ?url=" });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SSR-Detector/1.0; +https://example.com)"
      }
    });

    const text = await response.text();

    res.status(200).json({ html: text });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch HTML",
      details: error.toString()
    });
  }
}
