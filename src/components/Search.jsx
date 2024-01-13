export default function Search ({onClick,onChange,onKeyDown})
{

return (
    <div className="flex ps-4">
    <input onChange={onChange} onKeyDown={onKeyDown} type="text" id="search-navbar" className="p-2 ps-10 text-sm text-gray-900 border" placeholder="Search..."/>
    <button onClick={onClick} className="ps-5">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" >
            <path stroke="currentColor"  strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
    </button>
</div>
    )
}