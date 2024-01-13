import Rating from './Rating'
import Tag from '@/components/Tag'
import Image from 'next/image'

export default function OneManga ( { children, source, name, rate } )
{
    
  return (
<div className="w-40 md:w-48 mb-2 ">
        <div className="border-2 h-56 md:h-64 overflow-hidden border-black">
        <Image
        alt="Picture of the author"
        src={ source }
        width={200}
        /> 
        </div>
        <div className=" border-2 border-t-0 border-black">
        <div className="font-semibold flex place-content-center break-normal">
        {name}    
        </div>
            <Rating rate={ rate } />
        <div className="flex place-content-center">
                  {children}
        </div>
    </div>
    </div>
)}
