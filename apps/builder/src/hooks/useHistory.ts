import { useCallback, useState } from 'react';

export function useHistory<T>(initialState: T) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialState);
  const [future, setFuture] = useState<T[]>([]);

  const setState = useCallback((newState: T | ((curr: T) => T)) => {
    setPresent((curr) => {
      const next = typeof newState === 'function' ? (newState as (curr: T) => T)(curr) : newState;
      if (next === curr) return curr;

      setPast((prev) => [...prev, curr]);
      setFuture([]); // 清空未来，因为有了新的分支
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;
      const newPast = [...prevPast];
      const previous = newPast.pop()!;

      setFuture((prevFuture) => [present, ...prevFuture]);
      setPresent(previous);

      return newPast;
    });
  }, [present]);

  const redo = useCallback(() => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;
      const newFuture = [...prevFuture];
      const next = newFuture.shift()!;

      setPast((prevPast) => [...prevPast, present]);
      setPresent(next);

      return newFuture;
    });
  }, [present]);

  return {
    state: present,
    setState,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    history: past,
  };
}
