import { ChangeEvent, useState } from 'react';

export const useInput = (init: string) => {
  const [value, setValue] = useState(init);

  return {
    value,
    change: setValue,
    bind: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
    },
  };
};
