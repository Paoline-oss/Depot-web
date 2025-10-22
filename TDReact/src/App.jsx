import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import superheroes from './SuperHeros.json'

function App() {
    const name ="toto";
    const [count, setCount] = useState(0);  {/* initilisation a zéro de la variable count à 0*/}
    const incrementer = () => setCount(count + 1); {/*On rajoute a count +1*/}
    const ren = () => setCount(0);  {/*j'utilise setCount pour pouvoir mettre la valuer de count à 0*/}
    useEffect(() => {
        document.title = `React ${count}`;  {/*la page va s'appeler React "count"*/}
    }, [count]);  {/*La fonction s'active en fonction de count*/}

    return (
    <>
        <div className="s1" >Bonjour {name} je découvre react</div>
        <div className="s2">
            <button onClick={incrementer}>+</button>
            <button onClick={ren}>R</button>
             bouton a était cliqué {count}
        </div>
        <div className="s3">Il y a {superheroes.length} super-héros dans la base</div> {/*length permet de savoir combien il a des superhero dans le fichier .json*/}

        <div className="s5">
            <ul>
                {superheroes.map(hero => (     /*j utilise map pour aller dans le fichier .json et afficher les hero par leur nom  */
                    <li key={hero.id}>
                        {hero.name}
                    </li>
                ))}
            </ul>

        </div>
    </>
  )
}

export default App
