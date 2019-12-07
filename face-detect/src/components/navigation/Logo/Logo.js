import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brain-icon.png'

const Logo =() =>{
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" 
					options={{ max : 55 }} 
					style={{ height: 135, width: 135 }} >
 				<div className="Tilt-inner logo">
 					<img  alt = 'logo' 
 						  src={brain}/>
 				</div>
			</Tilt>
		</div>
	);
}
export default Logo;