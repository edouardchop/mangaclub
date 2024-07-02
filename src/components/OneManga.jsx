import Rating from './Rating'
import Image from 'next/image'
import Tag from"./Tag"


export default function OneManga (props)
{
  const name = props.name
  const src = props.src
  const rate = props.rate
  const tag1 = props.tag1
  const tag2 = props.tag2
  const onClick = props.onClick

  
  return (

    <div className="w-40 md:w-48 mb-2 ">
      <div className="border-2 h-56 md:h-64 overflow-hidden border-black">
        <Image
          alt="Image of Manga"
          src={ src }
          width={ 200 }
          height={100}
        />
      </div>
      <div className=" border-2 border-t-0 border-black bg-white">
        <div className="font-semibold flex place-content-center break-normal">
          {name}
        </div>
        <Rating rate={rate} />
        <div className="flex place-content-center">
          <Tag onClick={ onClick } key={name+"  "+tag1+"1"} tag={tag1} />
          <Tag onClick={ onClick } key={name+" "+tag2+"2"} tag={tag2} />
        </div>
      </div>
    </div>
  );
}
