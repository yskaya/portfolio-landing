export const BgPattern1 = () => (
    <>
        <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                    linear-gradient(rgba(255, 0, 110, 0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 0, 110, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px',
            }}
        />

        <div
            className="absolute inset-0 opacity-5"
            style={{
                backgroundImage: "url('/graphs/digital-matrix.svg')",
                backgroundSize: '120px 120px',
            }}    
        />

        <div
            className="absolute inset-0 opacity-5 mix-blend-screen"
            style={{
                backgroundImage: "url('/graphs/cyberpunk-hexagon.svg')",
                backgroundSize: '200px 200px',
            }}
        />
    </>
    )