'use client';

import { Provider } from 'react-redux';
import store, { AppStore } from '../hooks/store';
import { ReactNode, useEffect, useRef } from 'react';
import { setupListeners } from '@reduxjs/toolkit/query'

interface Props {
  readonly children: ReactNode
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = store
  }
  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch)
      return unsubscribe
    }
  },[])

  return <Provider store={storeRef.current}>{children}</Provider>
}

