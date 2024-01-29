// pages/[manga].js
import OneManga from '@/components/OneManga';
import axios from 'axios';

export async function getServerSideProps({ params }) {
  try {
    const { manga } = params;
    const fileKey = `${manga}.jpg`;

    const response = await axios.get(`http://localhost:3000/api/image?Key=${fileKey}`, {
      responseType: 'arraybuffer',
    });

    console.log("Requête vers image faite");

    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    return {
      props: {
        name: manga,
        src: base64,
      },
    };
  } catch (error) {
    console.error('Error fetching image:', error.message);

    return {
      props: {
        name: params.manga,
        src: null,
      },
    };
  }
}

export default function MangaPage({ name, src }) {
  return <OneManga name={name} src={src} />;
}
