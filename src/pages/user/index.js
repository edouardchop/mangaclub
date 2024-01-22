// pages/user/index.js
import axios from 'axios';


export async function getServerSideProps() {
  try {
    const fileKey = "blackLagoon.jpg"
    console.log( "voici le name :", fileKey );
  
    const response = await axios.get(`http://localhost:3000/api/image?Key=${fileKey}`,{
      responseType: 'arraybuffer',
    })

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

const UserPage = (props) => {
  const src = props.src;
console.log("dans la page user")
  return (
    <div>
      <h1>User Page</h1>
      {src && <img src={`data:image/jpeg;base64,${src}`} alt="User Image" />}
    </div>
  );
};

export default UserPage;
