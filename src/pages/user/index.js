// pages/user/index.js
import axios from 'axios';

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:3000/api/users', {
      responseType: 'arraybuffer',
    });

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

  return (
    <div>
      <h1>User Page</h1>
      {src && <img src={`data:image/jpeg;base64,${src}`} alt="User Image" />}
    </div>
  );
};

export default UserPage;
