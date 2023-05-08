import { ChangeEvent, useCallback, useState } from "react";

export default function useInput(initialValue: string | null = null) {
  const [value, setter] = useState(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter];
}
