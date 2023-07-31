export let photosList = [];
export let totalPhotos = 20;  // <-- Define here how many photos exist in the source folder!

for (let i = 0; i <= totalPhotos; i++) {
    photosList.push({
        source: `./assets/img/photos/photo (${i}).jpg`
    });
}