let photosList = [];
let totalPhotos = 20;  // <-- Inform here how many photos exist in the source folder!

for (let i = 0; i <= totalPhotos; i++) {
    photosList.push({
        source: `./assets/img/photos/photo (${i}).jpg`
    });
}