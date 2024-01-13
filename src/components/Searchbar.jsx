import { useState } from "react"
import Filter from "./Filter"
export default function Searchbar ( { onChange,onKeyDown,children } )
{
const [ filter, setFilter ] = useState( false )
    return (
<>
<div className="border-black border-4 flex justify-between">
     {children}            
    <Filter onChange={ ( e ) => onSearch( e ) } onKeyDown={ ( e ) => { if ( e.key == "Enter" ) { onSearch( e ) } } } />
    <div>
        { !filter && <button onClick={ () => setFilter( true ) }>Get more filters</button> }
        { filter && <button onClick={ () => setFilter( false ) }>Hide filters</button> }      
        
     </div>          
</div>
<div>
    {filter &&
    <div className="flex">      
        <Filter onChange={onChange} onKeyDown={onKeyDown} />
        <Filter onChange={onChange} onKeyDown={onKeyDown} />
        <button>Search</button>
    </div>}
</div>
</>
    )


}


