import React from 'react'
import {BarLoader, BeatLoader} from 'react-spinners';

const Loader = ({bar,beat,white}) => {
  
  if(bar) return <BarLoader color='gray'/>
  if(beat) { 
   if(white){return<BeatLoader  color='#ffffff' />}else {return <BeatLoader   />}
}
  
}

export default Loader