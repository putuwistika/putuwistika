import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

// Disable body parsing, we need the raw stream
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    // Proxy to locally running Streamlit
    proxy.web(req, res, {
      target: 'http://localhost:8501',
      changeOrigin: true,
      ws: true, // Enable WebSocket proxy
    }, (err) => {
      if (err) {
        reject(err);
      }
      resolve(undefined);
    });
  });
}