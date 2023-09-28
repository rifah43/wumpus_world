import React , {useState, useEffect} from 'react'
import { randomCaveGeneration} from './wumpus_world/cave.js'

const RandomBoardByUser = () => {
    const [gold, setGold] = useState(0);
    const [wumpus, setWumpus] = useState(0);
    const [pit, setPit] = useState(0);

    useEffect(() => {
        if (gold > 0 && wumpus > 0 && pit > 0){
            randomCaveGeneration(gold, wumpus, pit);
        }
    }, [gold, wumpus, pit])

  return (
    <div className="input-container">
        <label className="label-18">Number of Gold</label>
        <input className="input-18" type="number" name="gold" min="1" max="10" onChange={(e) => setGold(e.target.value)} />
        <br />
        <label className="label-18">Number of Wumpus</label>
        <input className="input-18" type="number" name="wumpus" min="1" max="10" onChange={(e) => setWumpus(e.target.value)} />
        <br />
        <label className="label-18">Number of Pit</label>
        <input className="input-18" type="number" name="pit" min="1" max="10" onChange={(e) => setPit(e.target.value)} />
    </div>
  )
}

export default RandomBoardByUser
