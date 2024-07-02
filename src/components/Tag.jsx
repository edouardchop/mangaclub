export default function Tag ({onClick,tag})
{
    const handleClick = (event) => {
        event.stopPropagation()
        onClick()
    }
    
    return (
<div className="py-2 px-1" onClick={e=>e.stopPropagation()}>
    <button className="  bg-yellow-500 w-16 text-xs py-1  hover:bg-yellow-400 text-white font-semibold rounded-full" type="button" onClick={onClick}>{tag}</button>
</div>
)}