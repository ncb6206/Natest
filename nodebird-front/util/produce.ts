import { produce } from "immer";

export default (...args: [any]) => {
  return produce(...args);
};
