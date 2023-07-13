import { ref } from 'vue';

export default (file: File) => {
  const reader = new FileReader();

  const data = ref<string | ArrayBuffer | null>(null);
  const error = ref<string | null>(null);
  const progress = ref(0);
  const isLoading = ref(true);
  const isError = ref(false);

  reader.onload = function onload() {
    data.value = reader.result;
  };

  reader.onerror = (_ev: ProgressEvent<FileReader>) => {
    isError.value = true;
  };

  reader.onloadend = (_ev: ProgressEvent<FileReader>) => {
    isLoading.value = false;
  };

  reader.onprogress = (ev: ProgressEvent<FileReader>) => {
    if (ev.lengthComputable) {
      progress.value = (ev.loaded / ev.total) * 100;
    }
  };

  reader.onabort = (_ev: ProgressEvent<FileReader>) => {
    isLoading.value = false;
  };

  reader.readAsText(file);

  return {
    data,
    error,
    progress,
    isLoading,
    isError,
  };
};
