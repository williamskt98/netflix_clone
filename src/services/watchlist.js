export function getWatchlistData(uid) {
    return new Promise((resolve) => {
        try {
            fetch(`http://localhost:8080/watchlist/${uid}`)
            .then(res => res.json())
            .then((res) => {resolve(res)})
        } catch (error) {
            console.error(error);
        }
    })
}