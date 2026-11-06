import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import BookingModal from '../components/BookingModal';

const BookingContext = createContext({ openBooking: () => {} });

/**
 * Single booking flow for the whole public site.
 * Any component can call `openBooking({ vehicle, packageType, fromLocation, toLocation,
 * date, time, tripType, passengers })` to open the booking dialog pre-filled.
 */
export function BookingProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, preset: {}, key: 0 });

  const openBooking = useCallback((preset = {}) => {
    setState((s) => ({ isOpen: true, key: s.key + 1, preset: preset && typeof preset === 'object' && !preset.nativeEvent ? preset : {} }));
  }, []);

  const closeBooking = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal key={state.key} isOpen={state.isOpen} onClose={closeBooking} preset={state.preset} />
    </BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => useContext(BookingContext);
