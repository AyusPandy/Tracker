import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function Tracker({ setActiveUsers }: { setActiveUsers: (num: number) => void }) {
  const location = useLocation();
  const startTime = useRef<number>(Date.now());
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    socket.on('activeUsers', (num) => {
      setActiveUsers(num);
    });
    return () => {
      socket.off('activeUsers');
    };
  }, [setActiveUsers]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (timeSpent > 0 && prevPath.current) {
        navigator.sendBeacon('http://localhost:3000/api/track', JSON.stringify({
          type: 'time_spent',
          payload: { path: prevPath.current, time: timeSpent }
        }));
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    
    if (prevPath.current && prevPath.current !== currentPath) {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      
      fetch('http://localhost:3000/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'time_spent', payload: { path: prevPath.current, time: timeSpent } })
      });
      
      fetch('http://localhost:3000/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'navigation', payload: { from: prevPath.current, to: currentPath } })
      });
    }

    fetch('http://localhost:3000/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page_view',
        payload: { path: currentPath, referrer: document.referrer || 'direct' }
      })
    });

    prevPath.current = currentPath;
    startTime.current = Date.now();
  }, [location]);

  return null;
}
