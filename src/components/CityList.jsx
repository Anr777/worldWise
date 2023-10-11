
import { CityItem } from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

export const CityList = ({ cities, isLoading }) => {
  console.log(cities);
  console.log(isLoading);
  if (isLoading) return <Spinner />
  if ( cities.length === 0 ) return <Message message='Add your first city on the map' />
  return (
    <ul className={ styles.cityList }>
      {
        cities.map( city => <CityItem city = { city } key = { city.id } />)
      }
    </ul>
  )
}
