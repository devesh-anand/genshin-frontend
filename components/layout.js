import Navbar from "./Navbar";

export default function Layout({ children }) {
   return (
      <>
         <Navbar />
         <main className="pt-16">{children}</main>
      </>
   );
}
