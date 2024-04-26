import Link from "next/link";
import { ArrowLeft, InfinityIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  coins: number;
};

export const Header = ({ title, coins }: Props) => {
  return (
    <div className="sticky top-0  pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href="/stutter">
        <Button variant="primary" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-900" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg dark:text-zinc-300">{title}</h1>
        <div className="flex flex-row text-black dark:text-white ">
          <div>
          <Image
            src="/xp-earn.png"
            height={40}
            width={40}
            alt="Hearts"
            className="mr-4 rounded-full mt-1"
          />
          </div>
          <p className="pt-3 font-bold text-lg">
          {coins}
          </p>
        </div>
        
    </div>
  );
};