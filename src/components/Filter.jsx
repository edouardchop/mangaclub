export default function Filter({onChange,onKeyDown})
{
  return (
  <div>
      <select onChange={ onChange } onKeyDown={ onKeyDown } id="selectInput" className="block p-2 ps-5 w-72 text-sm text-gray-900 border">
      <option value="" disabled >Filter</option>
        <option value="action">Action</option>
        <option value="aventure">Aventure</option>
        <option value="comédie">Comédie</option>
        <option value="romance">Romance</option>
        <option value="shonen">Shonen</option>
      </select>
    </div>
)
}
