export function RecipeImporter() {
    this.import = function ({ file, onSuccess, onError }) {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            try {
                let importedObject = JSON.parse(reader.result)
                onSuccess(importedObject)
            } catch (e) {
                console.error(e)
                onError(e)
            }
        }, false)

        reader.readAsText(file)

        // TODO: Remove event listener
    }

}