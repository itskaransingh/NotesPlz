import React from 'react'
import {BarLoader, BeatLoader} from 'react-spinners';

const Loader = ({bar,beat}) => {
  
  if(bar) return <BarLoader />
  if(beat) return <BeatLoader />
  
}

export default Loader