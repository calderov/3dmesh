// Minimal Wavefront OBJ parser: only reads vertex positions (v) and faces (f).
function parseObj(text) {
    const vertices = []
    const faces = []

    for (let line of text.split("\n")) {
        const parts = line.trim().split(/\s+/)

        if (parts[0] === "v") {
            vertices.push({
                x: parseFloat(parts[1]),
                y: parseFloat(parts[2]),
                z: parseFloat(parts[3]),
            })
        } else if (parts[0] === "f") {
            // Each entry is v, v/vt, v//vn or v/vt/vn. OBJ indices start at 1,
            // negative ones count back from the last vertex read so far.
            const face = parts.slice(1).map((entry) => {
                const i = parseInt(entry.split("/")[0])
                return i > 0 ? i - 1 : vertices.length + i
            })
            faces.push(face)
        }
    }

    return { vertices, faces }
}

async function loadObj(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`)
    }
    return parseObj(await res.text())
}
