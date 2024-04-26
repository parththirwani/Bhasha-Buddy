import Chat from "./chatbot";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header></Header>
      <main className="flex-1 flex flex-col items-center">{children}</main>
      <Chat></Chat>
    </div>
  );
};
export default MainLayout;
