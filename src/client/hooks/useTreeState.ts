import { useState } from "react";

type WithSetter<T> = T & {
  [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void
}

export default function useTreeState<T>(initial: T) {

  const result: any = {}

  for (let key in initial) {
    const [state, setter] = useState(initial[key]);
    result[key] = state;
    result[`set${key.charAt(0).toUpperCase() + key.substring(1)}`] = setter;
  }

  return result as Readonly<WithSetter<T>>
}