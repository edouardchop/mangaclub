export default function ModifyDelete ({Modify,Delete})
{
    return (
        <>
    <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={Modify}>Modifier</button>
    <button className="bg-red-500 text-white px-4 py-2" onClick={Delete}>Supprimer</button>
        </>
    )
}