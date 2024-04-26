import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardItemProps {
  rank: number;
  name: string;
  xp: number;
}
function LeaderboardItem({ rank, name, xp }: LeaderboardItemProps) {
  return (
    <div className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
      <p className="font-bold text-lime-700 mr-4 dark:text-lime-200">{rank}</p>
      <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
        <AvatarImage
          className="object-cover"
          src={rank % 2 === 0 ? "avatar.gif" : "gamer.png"}
        ></AvatarImage>
      </Avatar>
      <p className="font-bold text-neutral-800 flex-1 dark:text-zinc-300">
        {name}
      </p>
      <p className="text-muted-foreground dark:text-zinc-300">{xp} XP</p>
    </div>
  );
}

export default LeaderboardItem;
