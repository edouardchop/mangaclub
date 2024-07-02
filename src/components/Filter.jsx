
export default function Filter ( {onChange,categories } )
{
  return (
  <div>
      <select onChange={ onChange } defaultValue="default" className="block p-2 ps-5 w-72 text-sm text-gray-900 border">
        <option key="default" value="default" disabled >Select</option>
        {categories.map(category => (
          <option  key={ category.id } value={ category.id } >
            {category.name}
          </option>
        ))}
      </select>
    </div>
)
}
