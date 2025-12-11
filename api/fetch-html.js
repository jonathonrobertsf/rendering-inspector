export const config = {
  runtime: "nodejs18.x"
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
        "User-Agent": "Mozilla/5.0 SSR-Detector"
      }
    });

    const html = await response.text();
    return res.status(200).json({ html });

  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}
