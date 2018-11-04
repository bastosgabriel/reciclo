import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';

import TradeForm from '../../components/TradeForm/TradeForm';

class TradePoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trade: {
        name: 'Botafogo I'
      },
      itemType: 'inorganico',
      showSidebar: false,
      activeForm: false,
    };
    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.handleOpenForm = this.handleOpenForm.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { trade } = this.state;
    this.fetchData('trade', `trade/${trade.name}`);
    this.fetchData('items', `item`);
  }

  fetchData(type, endpoint) {
    fetch(`https://reciclo-hackathon.herokuapp.com/${endpoint}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(data => {
      if (type === 'trade') {
        this.setState({ trade: data });
      } else if (type === 'items') {
        this.setState({ items: data });
      }
    })
    .catch((e) => {
      console.warn(e);
    });
  }

  toggleSidebar() {
    const { showSidebar } = this.state;
    this.setState({showSidebar: !showSidebar});
  }

  handleOpenForm() {
    this.setState({
      activeForm: true,
    });
  }

  handleCloseForm() {
    this.setState({
      activeForm: false,
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit() {
    const { cpf, quantity, itemType } = this.state;
    if (cpf && quantity && itemType) {
      // valido
      fetch('https://reciclo-hackathon.herokuapp.com/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: {
         'cpf': cpf,
         'quantity': quantity,
         'itemType': itemType,
        }
       });
    } else {
    }
  }

  render() {
    const { trade, showSidebar, activeForm, items } = this.state;
    return (
      <div>
        <Menu
          title={trade.name}
          toggleSidebar={this.toggleSidebar}
          sidebarOpen={showSidebar}
          routes={
            {
              'top': [
                {name: 'Histórico', handler: () => {}},
                {name: 'Desconectar', handler: () => {}},
              ],
              'bottom': [
                {name: 'Registrar Troca', handler: this.handleOpenForm},
              ],
            }
          }
        />
      <TradeForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        activeForm={activeForm}
        handleCloseForm={this.handleCloseForm}
        items={items ? items : []}
      />
      </div>
    );
  }
}

export default TradePoint;
