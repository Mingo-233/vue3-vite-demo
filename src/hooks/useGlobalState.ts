// useGlobalState
import { effectScope } from "vue";

export default (run: any) => {
  let isChange = false;
  let state: any;
  const scope = effectScope(true);
  return () => {
    // 防止重复触发
    if (!isChange) {
      state = scope.run(run);
      isChange = true;
    }
    return state;
  };
};
