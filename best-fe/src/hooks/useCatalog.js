import { useEffect, useState } from 'react';
import API_BASE_URL from '../apiConfig';

const cache = new Map();
const CACHE_TTL = 10000; // 10 seconds for multi-component mount deduplication

export function invalidateCatalogCache() {
  cache.clear();
}

function load(path) {
  const entry = cache.get(path);
  const now = Date.now();
  if (entry && now - entry.time < CACHE_TTL) {
    return entry.promise;
  }

  const p = fetch(`${API_BASE_URL}${path}`, { cache: 'no-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => (Array.isArray(data) ? data : []))
    .catch((err) => {
      cache.delete(path);
      throw err;
    });

  cache.set(path, { time: now, promise: p });
  return p;
}

function useCollection(path) {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  useEffect(() => {
    let alive = true;
    load(path)
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => {
        console.error(`Failed to load ${path}:`, error);
        if (alive) setState({ data: [], loading: false, error });
      });
    return () => {
      alive = false;
    };
  }, [path]);

  return state;
}

export const useCars = () => useCollection('/api/cars');
export const usePackages = () => useCollection('/api/packages');
