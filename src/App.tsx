import { useState } from 'react';
import  styles  from './App.module.css';
import poweredImage from './assets/powered.jpg';
import leftArrowImg from './assets/leftArrow.png';
import {GridItem} from './components/GridItem';

import {levels, calculateImc, Level} from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);//ALTURA
  const [weightField, setWeightField] = useState<number>(0);//PESO
  const [toshow, setToShow] = useState<Level | null>(null);

  const handleCalculate = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    }else{
      alert('Digite todos os campos!');
    }
  }
  const handleBack = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
           <img src={poweredImage} alt='' width={150}/>
        </div>
      </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>IMC é a sigla para Ìndice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso de cada pessoa.</p>

            <input  
            type="number"
            placeholder='Digite a sua altura. Ex: 1.5 (em métros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toshow ? true: false}
            />

          <input  
            type="number"
            placeholder='Digite a sua altura. Ex: 74.3 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toshow ? true: false}
            />

            <button onClick={handleCalculate} disabled={toshow ? true: false}>Calcular</button>
          </div>

          <div className={styles.rightSide}>
          {!toshow &&
            <div className={styles.grid}>
              {levels.map((item, key) =>(
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toshow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBack}>
                <img src={leftArrowImg} alt="" width={43}/>
              </div>
              <GridItem item= {toshow} />
            </div>
          }
          </div>
        </div>
    </div>
  );
}

export default App;
