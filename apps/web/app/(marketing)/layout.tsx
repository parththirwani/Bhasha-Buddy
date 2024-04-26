import { BackgroundBeams } from "@/components/ui/background-beams";
import { Footer } from "./footer";
import { Header } from "./header";
// import MovingWords from './MovingWords';
// Make sure to create this CSS file

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-neutral-900">
      <Header></Header>
      
      {/* <MovingWords text="Anemone     Worcestershire    Isthmus    Synecdoche    Phenomenon    Statistics    Pseudopseudohypoparathyroidism    Colonel    Otorhinolaryngologist    Comfortable    Library    Drawer    Gubernatorial    Jurisdiction    Espresso    Mischievous    Supercalifragilisticexpialidocious" /> */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* <p className="line-1 anim-typewriter m-20">What all words can you pronounce</p>   */}

        {children}

        <Footer></Footer>

      </main>
    </div>
  );
};
export default MarketingLayout;
