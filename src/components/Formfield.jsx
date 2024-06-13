export default function Formfield ( { name, information, value, onChange,placeholder } ){
return(
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {name}
                        </label>
                        <input
                            type="text"
                            id={information}
                            name={information}
                            placeholder={placeholder}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={value}
                            onChange={onChange}
                            required
                        />
                    </div >   
)
}