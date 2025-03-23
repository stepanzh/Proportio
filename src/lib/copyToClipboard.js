export function copyToClipboard({
        string,
        onSuccess = undefined,  // () => { ... }
        onFailure = undefined   // (e) => { ... } 
}) {
    navigator.clipboard
        .writeText(string)
        .then(() => {
            if (onSuccess === undefined) {
                return;
            }
            onSuccess();
        })
        .catch((e) => {
            if (onFailure === undefined) {
                return;
            }
            onFailure(e);
        });
}