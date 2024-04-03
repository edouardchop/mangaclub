export default function SourceImage({onChange}){
    return (
        
        <div className=" p-4 rounded shadow-md flex items-center h-10">
            <input type="file" id="fileInput" onChange={ onChange } name="fileInput" accept="image/jpeg, image/png" className="border border-gray-300 p-2"/>
        </div>)
}