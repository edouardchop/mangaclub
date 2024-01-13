export default function Tag ({onClick,tag})
{

    return (
<div className="py-2 px-1">
            <button style={ { backgroundColor: "#D7C412" } } className="w-16 text-xs py-1   text-white font-semibold rounded-full hover:bg-blue-700" type="button" onClick={onClick}>{tag}</button>
</div>
)}