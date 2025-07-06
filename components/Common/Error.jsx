const Error = ({ message }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600">Error: {message}</p>
      </div>
    </div>
  );
};
export default Error;
