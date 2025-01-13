import Header from "~/components/Header";
import Footer from "~/components/Footer";
import CommentsMobile from "~/components/CommentsMobile";

export default function Layout(props: {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
}) {
  const { className = "", children } = props;
  return (
    <div className={`flex justify-center ${className}`}>
      <main className=" w-full flex flex-col items-center justify-between pt-4 md:pt-24">
        <Header />
        <CommentsMobile className="" />
        {children}
        <Footer />
      </main>
    </div>
  );
}
