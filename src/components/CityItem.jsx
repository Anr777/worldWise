import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
  // weekday: "long",
}).format(new Date(date));

export const CityItem = ({ city }) => {
  
  const { currentCity, deleteCity } = useCities();

  const { cityName, emoji, date, id, position : { lat, lng } } = city;
  console.log(lat, lng)

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const handleClick = ( e ) => {
    e.preventDefault();
    console.log('TEST');
    deleteCity(id);
  }


  return (
    <li>
      <Link className={ `${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}` } to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={ styles.emoji }>
          {
            flagemojiToPNG(emoji)
          } 
        </span>
        <h3 className={ styles.name }>
          { cityName }
        </h3>
        <time className={ styles.date }>{ formatDate(date) }</time>
        
        <button className={ styles.deleteBtn } onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  )
}
