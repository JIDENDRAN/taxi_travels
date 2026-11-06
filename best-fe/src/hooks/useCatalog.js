import { useEffect, useState } from 'react';
import API_BASE_URL from '../apiConfig';

// Tiny shared cache so the fleet / package lists are fetched once per page load,
// no matter how many components ask for them.
const cache = new Map();

function load(path) {
  if (!cache.has(path)) {
    const p = fetch(`${API_BASE_URL}${path}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => (Array.isArray(data) ? data : []))
      .catch((err) => {
        cache.delete(path); // allow a retry on next mount
        throw err;
      });
    cache.set(path, p);
  }
  return cache.get(path);
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
