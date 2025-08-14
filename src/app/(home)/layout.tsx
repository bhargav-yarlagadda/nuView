interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="relative flex flex-col min-h-screen">

      {/* Background gradient (fixed) */}
      <div
        className="
          fixed inset-0 -z-20
          bg-[linear-gradient(135deg,#25161Bx,#0a0a0a,#31363F,#000000)]
          animate-[waveShift_10s_linear_infinite]
          [background-size:400%_400%]
        "
      />

      {/* Texture overlay (fixed) */}
      <div
        className="
          fixed inset-0 -z-10
          bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]
          bg-repeat
        "
      />

    

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-4 pb-4">
        {children}
      </div>
    </main>
  );
};

export default Layout;
