const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">Accès refusé</h1>
      <p className="text-xl text-gray-700">Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
    </div>
  );
};

export default Unauthorized;
