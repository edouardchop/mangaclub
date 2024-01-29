/*import Rating from './Rating'
import Image from 'next/image'



export async function getServerSideProps() {
  try {
    const fileKey = { name }
    console.log( "voici le name :", fileKey );
  
    const response = await axios.get(`http://localhost:3000/api/image?Key=${fileKey}`,{
      responseType: 'arraybuffer',
    }) //

    console.log("Requête vers image faite");

    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    return {
      props: {
        src: base64,
      },
    };
  } catch (error) {
    console.error('Error fetching image:', error.message);

    return {
      props: {
        src: null,
      },
    };
  }
}

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
        <div className=" border-2 border-t-0 border-black bg-white">
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
*/

// components/OneManga.js
import Rating from './Rating';
import Image from 'next/image';

export default function OneManga({ name, src, rate, children }) {
  return (
    <div className="w-40 md:w-48 mb-2 ">
      <div className="border-2 h-56 md:h-64 overflow-hidden border-black">
        <Image
          alt="Picture of the author"
          src={`data:image/jpeg;base64,${src}`}
          width={ 200 }
          height={100}
        />
      </div>
      <div className=" border-2 border-t-0 border-black bg-white">
        <div className="font-semibold flex place-content-center break-normal">
          {name}
        </div>
        <Rating rate={rate} />
        <div className="flex place-content-center">{children}</div>
      </div>
    </div>
  );
}
