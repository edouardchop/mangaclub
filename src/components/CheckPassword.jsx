export default function CheckPassword ( { state } )
{
    return (
        <>
            { state == true ? (<div></div >) : (<div>pas bon</div>) } 
        </>
    );
}
