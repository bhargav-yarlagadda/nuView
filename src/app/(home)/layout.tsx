import Navbar from "@/modules/home/UI/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar/> 
      {/* Background gradient (fixed) */}
      <div
        className="
          fixed inset-0 -z-20
          bg-[linear-gradient(135deg,#25161Bx,#0a0a0a,#31363F,#000000)]
          animate-[waveShift_10s_linear_infinite]
          [background-size:400%_400%]
        "
      />

      

    

      {/* Content */}
      <div className="relative flex-1 flex flex-col  ">
        {children}
      </div>
    </main>
  );
};

export default Layout;
