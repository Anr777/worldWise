import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'

export const CityItem = ({ city }) => {

  const { cityName, emoji, date, id } = city;

  // const flagemojiToPNG = (bandera) => {
  //   var countryCode = bandera.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => cadena.fromCharCode(char-127397).toLowerCase()).juntar('')
  //   console.log(countryCode)
  //   return (<img src={'https://flagcdn.com/24x18/${countryCode}.png'} alt='flag' />)
  // }
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const formatDate = (date) =>
  new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date));

  return (
    <li>
      <Link className={ styles.cityItem } to={`${id}`}>
        <span className={ styles.emoji }>
          {
            flagemojiToPNG(emoji)
          } 
        </span>
        <h3 className={ styles.name }>
          { cityName }
        </h3>
        <time className={ styles.date }>{ formatDate(date) }</time>
        
        <button className={ styles.deleteBtn }>
          &times;
        </button>
      </Link>
    </li>
  )
}
