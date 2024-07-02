import { useState, useEffect } from "react";
import axios from 'axios';

export const getServerSideProps = async ({ params }) => {
  try {
    const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    const { data: userData } = userResponse;

    // Assurez-vous que userData.users est défini avant de l'assigner à props.user
    const users = userData.users || [];

    return {
      props: {
        user: users,
      }
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        user: [], // Retourner une liste vide en cas d'erreur pour éviter la sérialisation de undefined
      }
    };
  }
};

export default function User(props) {
  const users = props.user;
  const allUser = users.map(user => [user.id, user.username, user.email]); // Ajout de l'ID
  const [lines, setLines] = useState(allUser);
  const [addField, setAddField] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);

      // Mettre à jour l'état local en supprimant la ligne avec l'ID correspondant
      setLines(lines.filter(line => line[0] !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      // Gérer les erreurs de suppression
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl pt-8">BackOffice User</h1>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {addField && <tr>
            <th className="p-4"></th>
            <th className="p-4"><input type="text" value={inputValue} onChange={handleNameInBox} placeholder="Saisir le nom" /></th>
            <th>
              <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2" onClick={() => { sendCategoryData(); setAddField(!addField); setInputValue("") }}>Ajouter</button>
              </div>
            </th>
          </tr>}
          {lines.map((line) =>
            <tr key={line[0]} className="border-b text-center">
              <td className="p-4">{line[1]}</td>
              <td className="p-4">{line[2]}</td>
              <td className="p-4">
                <button className="bg-red-500 text-white px-4 py-2" onClick={() => handleDelete(line[0])}>Supprimer</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
