export default function({ childres, ...props}: any) {
    return <button className="m-1 flex items-center px-3 py-2 rounded-md bg-[#22d3eebb] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" {...props}>
        {props.children}
    </button>
}