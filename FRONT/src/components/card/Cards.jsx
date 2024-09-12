import "./card.css";

export const Card = () => {
  return (
    <div className="card--blackjack">
      <div className="card--image">
        <img
          src="https://storage.googleapis.com/url-images-generator.appspot.com/1725990019394_toyota_corolla.png"
          alt="Toyota Corolla"
        />
      </div>
      <div className="card--content">
        <h2>Modelo: Corolla</h2>
        <p>
          <strong>Cilindraje:</strong> 1800 cc
        </p>
        <p>
          <strong>Potencia:</strong> 139 HP
        </p>
        <p>
          <strong>Vel. Máx:</strong> 180 km/h
        </p>
      </div>
    </div>
  );
};
