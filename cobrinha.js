  
  
  const svg = document.getElementById("canvas");
        const Width = 1000;
        const Height = 900;
        const N = 20;
        const rad = 0.3;
        let frm = 0;

        const pointer = { x: Width / 2, y: Height / 2 };
        window.addEventListener("mousemove", e => {
            const rect = svg.getBoundingClientRect();
            pointer.x = e.clientX - rect.left;
            pointer.y = e.clientY - rect.top;
        });

        const elems = Array.from({ length: N }, (_, i) => {
            const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
            use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#dot");
            svg.appendChild(use);
            return {
                x: Width / 2,
                y: Height / 2,
                use
            };
        });
const run = () => {
    requestAnimationFrame(run);
    let e = elems[0];

    const ax = (Math.cos(3 * frm) * rad * Width) / Height;
    const ay = (Math.sin(4 * frm) * rad * Height) / Width;

    e.x += (ax + pointer.x - e.x) / 10;
    e.y += (ay + pointer.y - e.y) / 10;

    for (let i = 1; i < N; i++) {
        let e = elems[i];
        let ep = elems[i - 1];
        const a = Math.atan2(e.y - ep.y, e.x - ep.x);

        e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
        e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;

        const s = (162 + 4 * (1 - i)) / 50;

        e.use.setAttributeNS(
            null,
            "transform",
            `translate(${(ep.x + e.x) / 2}, ${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a})`
        );
    }
};


        run();