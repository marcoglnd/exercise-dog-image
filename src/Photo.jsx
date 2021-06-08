import React, { Component } from 'react';

class Photo extends Component {
  constructor() {
    super();
    this.fetchDog = this.fetchDog.bind(this);
    this.saveDogInfo = this.saveDogInfo.bind(this);
    this.saveDogName = this.saveDogName.bind(this);
    this.state = {
      img: '',
      breed: '',
      name: '',
      info: [],
      loading: false,
    }
  }

  fetchDog() {
    this.setState({ loading: true }, 
      () => {fetch('https://dog.ceo/api/breeds/image/random')
        .then((response) => response.json())
        .then((result) => 
          this.setState({
            img: result.message,
            breed: result.message.split('/')[4],
            loading: false,
          })
        ).then(() => localStorage.setItem('dogImage', this.state.img))
        .then(() => alert(this.state.breed))}
    )
  }

  saveDogName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    })
  }

  saveDogInfo() {
    const { name, img } = this.state;
    this.setState({
      info: [name, img],
    })
  }

  componentDidMount() {
    const { info } = this.state
    if (localStorage.doguinho !== '') {
      this.setState({
        img: localStorage.doguinho.split(',')[1],
        info: localStorage.doguinho,
      })
      localStorage.setItem('doguinho', info)
    } else {
      this.fetchDog();
    }
  }

  componentDidUpdate() {
    const { info } = this.state;
    localStorage.setItem('doguinho', info)
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { breed } = nextState;
    const newArr = [breed];
    return !newArr[0].includes('terrier');
  }
  
  render() { 
    const { img, loading, name } = this.state;
    const loadingElement = <span>Loading...</span>
    return (
      <div>
        <div>
          { loading === true ? loadingElement : <img className='dog-image' src={ img } alt="dog" /> }
        </div>
        <button onClick={this.fetchDog}>Mais doguinhos</button>
        <input type="text" placeholder="Nome do doguinho" value={name} onChange={this.saveDogName} />
        <button onClick={this.saveDogInfo}>Salvar doguinho</button>
      </div>
    );
  }
}
 
export default Photo;