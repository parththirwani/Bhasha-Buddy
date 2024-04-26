//@ts-ignore
export const Entries = ({id,title,content,date}) => {
    return (
        <div className="w-full rounded-xl shadow-neutral-400 p-5 bg-neutral-100">
            <p className="text-sm font-bold text-neutral-600">{date}</p>
            <p className="text-sm font-bold text-neutral-600">S.No: {id}</p>
            <p className="text-xl font-bold text-neutral-600">Title: {title}
            </p>
            <p className="text-xl font-bold text-neutral-600">{content}</p>
        </div>
    )
}
