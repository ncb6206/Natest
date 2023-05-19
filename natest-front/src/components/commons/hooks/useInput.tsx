import { Dispatch, SetStateAction, useCallback, useState } from "react";

type ReturnType<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];
export default function useInput<T extends string>(initialValue: T): ReturnType<T> {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
}
