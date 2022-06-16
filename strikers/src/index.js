import { useState } from "react";
import ReactDOM from "react-dom/client";
import Roster from './Roster'
import './App.css'
import Head from './HeadGear'
import Chest from './ChestGear'
import Gloves from './GloveGear'
import Shoes from './ShoeGear'


const App = () => {
  const [myChar, setCharacter] = useState(Roster.Boom)
  const [str, setStrength] = useState(myChar.Strength);
  const [spd, setSpeed] = useState(myChar.Speed);
  const [shoot, setShooting] = useState(myChar.Shooting);
  const [pass, setPassing] = useState(myChar.Passing);
  const [tech, setTechnique] = useState(myChar.Tech);
  const [myhelmet, setHead] = useState(Head.None);
  const [mygloves, setGloves] = useState(Gloves.None);
  const [mychest, setChest] = useState(Chest.None);
  const [myshoes, setShoes] = useState(Shoes.None);
 
  function setChar(char){
    setCharacter(char)
    setStrength(char.Strength)
    setSpeed(char.Speed)
    setShooting(char.Shooting)
    setPassing(char.Passing)
    setTechnique(char.Tech)
    setHead(Head.None)
    setGloves(Gloves.None)
    setChest(Chest.None)
    setShoes(Shoes.None)
  }
  function updateGloves(glove) {
    setGloves(glove)
    updateGear(myChar,myhelmet,glove,mychest,myshoes)
  }
  function updateHelmet(helmet){
    setHead(helmet)
    updateGear(myChar,helmet,mygloves,mychest,myshoes)
  }
  function updateChest(chest){
    setChest(chest)
    updateGear(myChar,myhelmet,mygloves,chest,myshoes)
  }
  function updateShoes(shoe){
    setShoes(shoe)
    updateGear(myChar,myhelmet,mygloves,mychest,shoe)
  }
  function updateGear(char,helmet,gloves,chest,shoes) {
    setStrength(char.Strength+helmet.Stats[0]+gloves.Stats[0]+chest.Stats[0]+shoes.Stats[0])
    setSpeed(char.Speed+helmet.Stats[1]+gloves.Stats[1]+chest.Stats[1]+shoes.Stats[1])
    setShooting(char.Shooting+helmet.Stats[2]+gloves.Stats[2]+chest.Stats[2]+shoes.Stats[2])
    setPassing(char.Passing+helmet.Stats[3]+gloves.Stats[3]+chest.Stats[3]+shoes.Stats[3])
    setTechnique(char.Tech+helmet.Stats[4]+gloves.Stats[4]+chest.Stats[4]+shoes.Stats[4])
  }


  function setCount() {
  }


  return (
    <>
      <h1>Your character is: {myChar.name}</h1> 
      <hr />
      <table>
            <tr>
              <th>Helmet</th>
              <th>Gloves</th>
              <th>Chest</th>
              <th>Shoes</th>
             </tr>
             <tr>
              <th>{myhelmet.Name}</th>
              <th>{mygloves.Name}</th>
              <th>{mychest.Name}</th>
              <th>{myshoes.Name}</th>
             </tr>

        </table>
      <div>
        
      <table>
            <tr>
              <th>Strength</th>
              <th>Speed</th>
              <th>Shooting</th>
              <th>Passing</th>
              <th>Technique</th>
             </tr>
             <tr>
              <th>{str}</th>
              <th>{spd}</th>
              <th>{shoot}</th>
              <th>{pass}</th>
              <th>{tech}</th>
             </tr>

        </table>
       <br></br>
       <br></br>
        <table>
          <thead>
            <tr>
              <th><button onClick={()=> setChar(Roster.Mario)}>Mario</button></th>
              <th><button onClick={()=> setChar(Roster.Luigi)}>Luigi</button></th>
              <th><button onClick={()=> setChar(Roster.Bowser)}>Bowser</button></th>
              <th><button onClick={()=> setChar(Roster.Peach)}>Peach</button></th>
              <th><button onClick={()=> setChar(Roster.Rosalina)}>Rosalina</button></th>
              <th><button onClick={()=> setChar(Roster.Toad)}>Toad</button></th>
              <th><button onClick={()=> setChar(Roster.Yoshi)}>Yoshi</button></th>
              <th><button onClick={()=> setChar(Roster.Dk)}>Donkey Kong</button></th>
              <th><button onClick={()=> setChar(Roster.Wario)}>Wario</button></th>
              <th><button onClick={()=> setChar(Roster.Waluigi)}>Waluigi</button></th>
             </tr>
          </thead>
        </table>
        <br></br><br></br>
        <table>
<thead>
  <tr>
    <th><button onClick={()=> updateHelmet(Head.Muscle)}>Muscle Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.Muscle)}>Muscle Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.Muscle)}>Muscle Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.Muscle)}>Muscle Boots</button></th>
  </tr>
</thead>
<tbody>
  <tr>
    <th><button onClick={()=> updateHelmet(Head.Turbo)}>Turbo Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.Turbo)}>Turbo Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.Turbo)}>Turbo Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.Turbo)}>Turbo Boots</button></th>
  </tr>
  <tr>
    <th><button onClick={()=> updateHelmet(Head.Cannon)}>Cannon Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.Cannon)}>Cannon Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.Cannon)}>Cannon Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.Cannon)}>Cannon Boots</button></th>
  </tr>
  <tr>
    <th><button onClick={()=> updateHelmet(Head.Chain)}>Chain Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.Chain)}>Chain Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.Chain)}>Chain Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.Chain)}>Chain Boots</button></th>
  </tr>
  <tr>
    <th><button onClick={()=> updateHelmet(Head.Trick)}>Trick Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.Trick)}>Trick Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.Trick)}>Trick Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.Trick)}>Trick Boots</button></th>
  </tr>
  <tr>
    <th><button onClick={()=> updateHelmet(Head.Bushido)}>Bushido Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.Bushido)}>Bushido Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.Bushido)}>Bushido Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.Bushido)}>Bushido Boots</button></th>
  </tr>
</tbody>
        </table>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
