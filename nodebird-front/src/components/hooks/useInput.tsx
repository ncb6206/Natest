import { ChangeEvent, useCallback, useState } from "react";

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
}
