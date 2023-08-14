import {
  ref,
  effectScope,
  effect,
  computed,
  watch,
  watchEffect,
  reactive,
} from "vue";
const useEffect = () => {
  const data = reactive({
    version: "v1.0.0",
  });

  const scope = effectScope();
  const fn = () => {
    const localVersion = localStorage.getItem("version_xx");
    if (data.version !== localVersion) {
      localStorage.setItem("version_xx", data.version);
    }
  };
  scope.run(() => {
    effect(fn);
  });
  function changeVersion() {
    data.version = "v2.0." + Math.random();
  }
  return {
    changeVersion,
    version: computed(() => data.version),
  };
};
export { useEffect };
