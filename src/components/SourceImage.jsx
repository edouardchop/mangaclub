export default function SourceImage({onChange,onClick}){
    return (
        
        <div className=" p-4 rounded shadow-md flex items-center h-10">
            <input type="file" id="fileInput" onChange={ onChange } name="fileInput" accept="image/jpeg, image/png" className="border border-gray-300 p-2"/>
            <button type="submit" onClick={onClick} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Envoyer</button>           
        </div>)
}