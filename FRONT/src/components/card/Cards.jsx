import "./card.css";

export const Card = ({ data }) => {
  let { id, photo, modelo, cilindraje, potencia, topSpeed } = data;

  return (
    <div className="card--blackjack">
      <h2>
        {id} {modelo}
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
      </div>
    </div>
  );
};
