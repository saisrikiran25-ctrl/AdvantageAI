
import { useState, useCallback, useEffect } from 'react';

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [boolean, CopyFn] {
  const [copied, setCopied] = useState(false);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopied(false);
      return false;
    }
  }, []);

  useEffect(() => {
    let timeoutId: number | null = null;
    if (copied) {
      timeoutId = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [copied]);

  return [copied, copy];
}
