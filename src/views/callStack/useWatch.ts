import { computed, onMounted, ref, watch, effectScope } from "vue";

export const id = ref("2asd");
export const useWatch = () => {
  // const idd = computed(() => {
  //   return id.value + "computed";
  // });

  // const scope = effectScope();
  // scope.run(() => {
  //   watch(
  //     () => idd,
  //     (newVal, oldVal) => {
  //       console.log(newVal);

  //       console.log("watch track");
  //     },
  //     { deep: true, immediate: true }
  //   );
  // });
  const cancel = watch(
    () => id,
    (newVal, oldVal) => {
      console.log(newVal);

      console.log("watch track");
    },
    {
      deep: true,
      immediate: true,
      onTrack(e) {
        console.log(e);

        debugger;
      },
    }
  );
  // scope.close();

  return {
    cancel,
  };
};
