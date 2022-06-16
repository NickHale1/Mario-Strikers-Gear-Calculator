import { useState } from "react";
import ReactDOM from "react-dom/client";
import Roster from './Roster'
import './App.css'
import Head from './HeadGear'
import Chest from './ChestGear'
import Gloves from './GloveGear'
import Shoes from './ShoeGear'

//TODO: Move the component to it's own file so this isn't so huge
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
  const [myBuild, setBuild] = useState(9999);
  const [gearRec, setRec] = useState([Gloves.None,Gloves.None,Gloves.None,Gloves.None])
 
  const emptyBuild=[Gloves.None,Gloves.None,Gloves.None,Gloves.None]
  const helm=[Head.Muscle,Head.Turbo,Head.Cannon,Head.Chain,Head.Trick,Head.Bushido]
  const arms=[Gloves.Muscle,Gloves.Turbo,Gloves.Cannon,Gloves.Chain,Gloves.Trick,Gloves.Bushido]
  const body=[Chest.Muscle,Chest.Turbo,Chest.Cannon,Chest.Chain,Chest.Trick,Chest.Bushido]
  const legs=[Shoes.Muscle,Shoes.Turbo,Shoes.Cannon,Shoes.Chain,Shoes.Trick,Shoes.Bushido]
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
    setBuild(9999)
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
    let newStats=calculateGear(char,helmet,gloves,chest,shoes)
    setStrength(newStats[0])
    setSpeed(newStats[1])
    setShooting(newStats[2])
    setPassing(newStats[3])
    setTechnique(newStats[4])
    setBuild(1000*buildHelmet(helmet)+100*buildArms(gloves)+10*buildBody(chest)+buildLegs(shoes))
  }

  function calculateGear(char,helmet,gloves,chest,shoes){
    let stats = [0,0,0,0,0]
    stats[0]=(char.Strength+helmet.Stats[0]+gloves.Stats[0]+chest.Stats[0]+shoes.Stats[0])
    stats[1]=(char.Speed+helmet.Stats[1]+gloves.Stats[1]+chest.Stats[1]+shoes.Stats[1])
    stats[2]=(char.Shooting+helmet.Stats[2]+gloves.Stats[2]+chest.Stats[2]+shoes.Stats[2])
    stats[3]=(char.Passing+helmet.Stats[3]+gloves.Stats[3]+chest.Stats[3]+shoes.Stats[3])
    stats[4]=(char.Tech+helmet.Stats[4]+gloves.Stats[4]+chest.Stats[4]+shoes.Stats[4])
    setBuild(1000*buildHelmet(helmet)+100*buildArms(gloves)+10*buildBody(chest)+buildLegs(shoes))
    return stats;
  }

  function buildHelmet(helmet) {
    switch(helmet.Name) {
      case "Muscle": return 1;
      case "Turbo": return 2;
      case "Cannon": return 3;
      case "Chain": return 4;
      case "Trick": return 5;
      case "Bushido": return 6;
      default: return 9;
    }
  }

  function buildArms(arms){
    switch(arms.Name) {
      case "Muscle": return 1;
      case "Turbo": return 2;
      case "Cannon": return 3;
      case "Chain": return 4;
      case "Trick": return 5;
      case "Bushido": return 6;
      default: return 9;
    }
  }

  function buildBody(body){
    switch(body.Name) {
      case "Muscle": return 1;
      case "Turbo": return 2;
      case "Cannon": return 3;
      case "Chain": return 4;
      case "Trick": return 5;
      case "Bushido": return 6;
      default: return 9;
    }
  }

  function buildLegs(legs) {
    switch(legs.Name) {
      case "Muscle": return 1;
      case "Turbo": return 2;
      case "Cannon": return 3;
      case "Chain": return 4;
      case "Trick": return 5;
      case "Bushido": return 6;
      default: return 9;
    }
  }

  function findBuild(strength,speed,shooting,passing,technique) {
    console.log(strength)
    let builds =[];
    let s = []
    let count = 0;
    for(const head of helm){
      for(const arm of arms) {
        for(const bod of body){
          for(const leg of legs){
            s =calculateGear(myChar,head,arm,bod,leg)
            if(s[0]>=strength&&s[1]>=speed&&s[2]>=shooting&&s[3]>=passing&&s[4]>=technique){
              builds[count]=[head,arm,bod,leg]
              count++
            }
          }
        }
      }
    }
    if(builds.length===0){
      setRec(emptyBuild)
    } else {
      setRec(builds[0])
    }
    return builds
  }


  return (
    <>
      <h1>Your character is: {myChar.name}</h1>
      <p>Build Code: {myBuild}</p> 
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

        <br></br>
        <br></br>

        <table>
          <tr>
            <th>Strength</th>
              <th>Speed</th>
              <th>Shooting</th>
              <th>Passing</th>
              <th>Technique</th>
          </tr>
          <tr>
            <th><input type="number" id="inputStr"></input></th>
            <th><input type="number" id="inputSpd"></input></th>
            <th><input type="number" id="inputSht"></input></th>
            <th><input type="number" id="inputPas"></input></th>
            <th><input type="number" id="inputTch"></input></th>
          </tr>
          <tr><button onClick={()=> findBuild(document.getElementById("inputStr").value,document.getElementById("inputSpd").value,document.getElementById("inputSht").value,document.getElementById("inputPas").value,document.getElementById("inputTch").value)}>Calculate Build</button></tr>

        </table>

        <table>
            <tr>
              <th>Gloves</th>
              <th>Arms</th>
              <th>Body</th>
              <th>Legs</th>
             </tr>
             <tr>
              <th>{gearRec[0].Name}</th>
              <th>{gearRec[1].Name}</th>
              <th>{gearRec[2].Name}</th>
              <th>{gearRec[3].Name}</th>
             </tr>

        </table>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
