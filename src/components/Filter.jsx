export default function Filter({onChange,onKeyDown})
{
  return (
  <div>
      <select onChange={ onChange } onKeyDown={ onKeyDown } id="selectInput" className="block p-2 ps-5 w-72 text-sm text-gray-900 border">
      <option value="" disabled >Filter</option>
        <option value="Action">Action</option>
        <option value="Aventure">Aventure</option>
        <option value="Comédie">Comédie</option>
        <option value="Romance">Romance</option>
        <option value="Shonen">Shonen</option>
      </select>
    </div>
)
}
