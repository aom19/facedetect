import React ,{ Component } from 'react';
import './App.css';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/navigation/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey :'bb29b3875d4541cda3428ab651bef09b'
});


const particlesOption ={
  particles: {
    number:{
      value: 250,
      density:{
        enable :true,
        value_area : 700
      }
    }
  }
}


class App extends Component {
  constructor (){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box :{}
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow  : clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input  : event.target.value})

  }

  onButtonSubmit = () =>{
   this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    }

    function(err) {
      if(err){
        console.log('somethin went wrong');
      }
    }
  render(){
     const {  imageUrl , box} = this.state;
   return ( 
    <div className="App">
    <Particles className ='particles'
        params={particlesOption}
         />
        <Logo />
        
        <ImageLinkForm 
           onInputChange = {this.onInputChange} 
           onButtonSubmit = {this.onButtonSubmit }
        />
        <FaceRecognition box={box} imageUrl={imageUrl}/> 
    </div>
    );
  }
}

export default App;
