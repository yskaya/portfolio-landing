export const GraphGeometry = () => (
    <>
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: `
            radial-gradient(circle, 
              rgba(0, 212, 255, 0.1) 0%, 
              rgba(255, 0, 110, 0.05) 50%, 
              transparent 100%
            )
          `,
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 0 100px rgba(0, 212, 255, 0.2)',
        }}
      />

      <div
        className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-lg"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(131, 56, 236, 0.1) 0%, 
              rgba(255, 0, 110, 0.1) 50%, 
              rgba(0, 212, 255, 0.1) 100%
            )
          `,
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(131, 56, 236, 0.3)',
          boxShadow: '0 0 80px rgba(131, 56, 236, 0.2)',
        }}
      />

      <div
        className="absolute top-2/3 left-1/2 w-48 h-48"
        style={{
          background: `
            conic-gradient(from 0deg, 
              rgba(0, 255, 65, 0.1), 
              rgba(0, 212, 255, 0.1), 
              rgba(255, 0, 110, 0.1), 
              rgba(131, 56, 236, 0.1), 
              rgba(0, 255, 65, 0.1)
            )
          `,
          backdropFilter: 'blur(50px)',
          border: '1px solid rgba(0, 255, 65, 0.2)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          boxShadow: '0 0 60px rgba(0, 255, 65, 0.3)',
        }}
      />
    </>
)