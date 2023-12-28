'use client';

import React, { FC, ReactNode, useRef, useState } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

const AntdRegistry: FC<{ children: ReactNode }> = ({ children }) => {
  const [cache] = useState(() => createCache());
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, { plain: true });

    if (inserted.current) {
      return null;
    }
    inserted.current = true;

    return (
      <style
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default AntdRegistry;
