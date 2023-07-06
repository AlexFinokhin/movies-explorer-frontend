export async function apiPreloader(hasError = false) {
  return new Promise((successCallback, errorCallback) => {
    setTimeout(() => {
      if (hasError) {
        errorCallback(new Error("Не ура"));
      } else {
        successCallback("Ееееее ура");
      }
    }, 1830);
  });
}
