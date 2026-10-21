export default function preloadImages(srcList) {
    return Promise.all(
        srcList.map(src => new Promise(resolve => {
            const img = new Image();

            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;

            if (img.complete) resolve();
        }))
    );
}