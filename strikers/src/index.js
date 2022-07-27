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
  //my char constant
  //my gear constant
  //my recommend consant
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
  const [myBuild, setBuild] = useState(0);
  const [gearRec, setRec] = useState([Gloves.None,Gloves.None,Gloves.None,Gloves.None])
 
  const emptyBuild=[Gloves.None,Gloves.None,Gloves.None,Gloves.None]
  const helm=[Head.Muscle,Head.Turbo,Head.Cannon,Head.Chain,Head.Trick,Head.Bushido,Head.Knight]
  const arms=[Gloves.Muscle,Gloves.Turbo,Gloves.Cannon,Gloves.Chain,Gloves.Trick,Gloves.Bushido,Gloves.Knight]
  const body=[Chest.Muscle,Chest.Turbo,Chest.Cannon,Chest.Chain,Chest.Trick,Chest.Bushido,Chest.Knight]
  const legs=[Shoes.Muscle,Shoes.Turbo,Shoes.Cannon,Shoes.Chain,Shoes.Trick,Shoes.Bushido,Shoes.Knight]
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
    setBuild(0)
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
    for(let i=0; i<newStats.length;i++){
      if(newStats[i]>25){
        newStats[i]=25
      }
    }
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
      case "Knight": return 7;
      default: return 0;
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
      case "Knight": return 7;
      default: return 0;
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
      case "Knight": return 7;
      default: return 0;
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
      case "Knight": return 7;
      default: return 0;
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

  function formatNum(num) {
    if(num===0){
      return ""
    } else if (num<0){
      return num.toString()
    } else {
      return ("+ "+num)
    }
  }

  function readCode(myCode){
    let nums=myCode.split("")
    switch(nums[0]){
      case 1: updateHelmet(Head.Muscle);
      case 2: updateHelmet(Head.Turbo);
      case 3: updateHelmet(Head.Cannon);
      case 4: updateHelmet(Head.Chain);
      case 5: updateHelmet(Head.Trick);
      case 6: updateHelmet(Head.Bushido);
      case 7: updateHelmet(Head.Knight);
      default: updateHelmet(Head.None);
    }

    switch(nums[1]){
      case 1: updateGloves(Gloves.Muscle);
      case 2: updateGloves(Gloves.Turbo);
      case 3: updateGloves(Gloves.Cannon);
      case 4: updateGloves(Gloves.Chain);
      case 5: updateGloves(Gloves.Trick);
      case 6: updateGloves(Gloves.Bushido);
      case 7: updateGloves(Gloves.Knight);
      default: updateGloves(Gloves.None);
    }

    switch(nums[2]){
      case 1: updateChest(Chest.Muscle);
      case 2: updateChest(Chest.Turbo);
      case 3: updateChest(Chest.Cannon);
      case 4: updateChest(Chest.Chain);
      case 5: updateChest(Chest.Trick);
      case 6: updateChest(Chest.Bushido);
      case 7: updateChest(Chest.Knight);
      default: updateChest(Chest.None);
    }

    switch(nums[3]){
      case 1: updateShoes(Shoes.Muscle);
      case 2: updateShoes(Shoes.Turbo);
      case 3: updateShoes(Shoes.Cannon);
      case 4: updateShoes(Shoes.Chain);
      case 5: updateShoes(Shoes.Trick);
      case 6: updateShoes(Shoes.Bushido);
      case 7: updateShoes(Shoes.Knight);
      default: updateShoes(Shoes.None);
    }
  }

  async function copyBuild() {
    if('clipboard' in navigator){
      return await navigator.clipboard.writeText(currentBuildString())
    } else {
      return document.execCommand('copy',true, currentBuildString())

    }

  }

  function currentBuildString() {
    return (myChar.name+ " (" + myBuild +") " + str+ "/"+ spd+ "/"+shoot+"/"+pass+"/"+tech)
  }


  return (
    <div class="body">
      
      
      <h1>Your character is: {myChar.name}</h1>
      <img src={myChar.img} class="centerImage" alt={myChar.name}></img>
      <p>Build Code: {myBuild}</p>
      <div class="buttonContainer">
        <button class="copyBuild" onClick={()=> copyBuild()}>Copy Build</button> 
      </div>
      <hr/>
      <table class="center">
            <tr>
              <th>Head</th>
              <th>Arms</th>
              <th>Body</th>
              <th>Legs</th>
             </tr>
             <tr>
              <th>{myhelmet.Name}</th>
              <th>{mygloves.Name}</th>
              <th>{mychest.Name}</th>
              <th>{myshoes.Name}</th>
             </tr>

        </table>
      
        <br></br>
      
      <table class="center">
            <tr>
              <th></th>
              <th>Strength</th>
              <th>Speed</th>
              <th>Shooting</th>
              <th>Passing</th>
              <th>Technique</th>
             </tr>
             <tr>
              <th>Base Stats</th>
              <th>{myChar.Strength}</th>
              <th>{myChar.Speed}</th>
              <th>{myChar.Shooting}</th>
              <th>{myChar.Passing}</th>
              <th>{myChar.Tech}</th>
             </tr>
             <tr>
              <th>With gear</th>
              <th>{str}</th>
              <th>{spd}</th>
              <th>{shoot}</th>
              <th>{pass}</th>
              <th>{tech}</th>
             </tr>
             <tr>
              <td>Head</td>
              <td>{formatNum(myhelmet.Stats[0])}</td>
              <td>{formatNum(myhelmet.Stats[1])}</td>
              <td>{formatNum(myhelmet.Stats[2])}</td>
              <td>{formatNum(myhelmet.Stats[3])}</td>
              <td>{formatNum(myhelmet.Stats[4])}</td>
             </tr>
             <tr>
              <td>Arms</td>
              <td>{formatNum(mygloves.Stats[0])}</td>
              <td>{formatNum(mygloves.Stats[1])}</td>
              <td>{formatNum(mygloves.Stats[2])}</td>
              <td>{formatNum(mygloves.Stats[3])}</td>
              <td>{formatNum(mygloves.Stats[4])}</td>
             </tr>
             <tr>
              <td>Body</td>
              <td>{formatNum(mychest.Stats[0])}</td>
              <td>{formatNum(mychest.Stats[1])}</td>
              <td>{formatNum(mychest.Stats[2])}</td>
              <td>{formatNum(mychest.Stats[3])}</td>
              <td>{formatNum(mychest.Stats[4])}</td>
              
             </tr>
             <tr>
              <td>Legs</td>
              <td>{formatNum(myshoes.Stats[0])}</td>
              <td>{formatNum(myshoes.Stats[1])}</td>
              <td>{formatNum(myshoes.Stats[2])}</td>
              <td>{formatNum(myshoes.Stats[3])}</td>
              <td>{formatNum(myshoes.Stats[4])}</td>
             </tr>

        </table>
       <br></br>
       <br></br>
        <table class="center">
          <thead>
            <tr>
              <th><button class="button-5" onClick={()=> setChar(Roster.Mario)}>Mario</button></th>
              <th><button onClick={()=> setChar(Roster.Luigi)}>Luigi</button></th>
              <th><button onClick={()=> setChar(Roster.Bowser)}>Bowser</button></th>
              <th><button onClick={()=> setChar(Roster.Peach)}>Peach</button></th>
              <th><button onClick={()=> setChar(Roster.Rosalina)}>Rosalina</button></th>
              <th><button onClick={()=> setChar(Roster.Toad)}>Toad</button></th>
            </tr>
            <tr>
              
              <th><button onClick={()=> setChar(Roster.Yoshi)}>Yoshi</button></th>
              <th><button onClick={()=> setChar(Roster.Dk)}>Donkey Kong</button></th>
              <th><button onClick={()=> setChar(Roster.Wario)}>Wario</button></th>
              <th><button onClick={()=> setChar(Roster.Waluigi)}>Waluigi</button></th>
              <th><button onClick={()=> setChar(Roster.Daisy)}>Daisy</button></th>
              <th><button onClick={()=> setChar(Roster.ShyGuy)}>Shy Guy</button></th>
             </tr>
          </thead>
        </table>
        <br></br><br></br>
        <table class="center">
<thead>
  <tr>
  <th><button onClick={()=> updateHelmet(Head.None)}>No Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.None)}>No Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.None)}>No Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.None)}>No Boots</button></th>
  </tr>
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
  <tr>
    <th><button onClick={()=> updateHelmet(Head.Knight)}>Knight Helmet</button></th>
    <th><button onClick={()=> updateGloves(Gloves.Knight)}>Knight Gauntlets</button></th>
    <th><button onClick={()=> updateChest(Chest.Knight)}>Knight Chest</button></th>
    <th><button onClick={()=> updateShoes(Shoes.Knight)}>Knight Boots</button></th>
  </tr>
</tbody>
        </table>

        <br></br>
        <br></br>

        <table class="center">
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
          <tr>
            <td colSpan={5}>
            <button class="submitButton" onClick={()=> findBuild(
              document.getElementById("inputStr").value,
              document.getElementById("inputSpd").value,
              document.getElementById("inputSht").value,
              document.getElementById("inputPas").value,
              document.getElementById("inputTch").value)}>Calculate Build
            </button>

            </td>
          </tr>
        </table>

         




        <table class="center">
            <tr>
              <th>Head</th>
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
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
