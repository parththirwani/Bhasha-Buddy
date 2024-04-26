export default function CurrentDateTime() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //@ts-ignore
  const dateTimeStr = now.toLocaleDateString("en-US", options);
  return (
    <div className="date-time text-lg my-3 text-neutral-400">{dateTimeStr}</div>
  );
}
