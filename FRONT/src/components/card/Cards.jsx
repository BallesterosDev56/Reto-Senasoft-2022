import "./card.css";

export const Card = ({ data }) => {
  let { id, photo, modelo, cilindraje, potencia, topSpeed } = data;

  return (
    <div className="card--blackjack">
      <h2 className="text-black fs-3">
        {id} <span className="text-white fs-6">{modelo}</span>
      </h2>
      <div className="card--image">
        <img src={photo} alt={modelo} />
      </div>
      <div className="card--content">
        <p>
          <strong>Cilindraje:</strong> {cilindraje}
        </p>
        <p>
          <strong>Potencia:</strong> {potencia}
        </p>
        <p>
          <strong>Vel. Máx:</strong> {topSpeed}
        </p>
        <p>
          <strong>Peso:</strong> {topSpeed}
        </p>
      </div>
    </div>
  );
};
