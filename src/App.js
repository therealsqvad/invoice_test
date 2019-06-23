import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './App.css';

class App extends Component {
  state = {
    surname: '',
    surnames: [],
    name: '',
    names: [],
    patronymic: '',
    patronymics: [],
    isLoading: false,
    multiple: false
  };

  getName = name => {
    this.setState({ isLoading: true });
    const dataString = `{ "query": "${name}" }`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token 951877a6c80c7c7e155ec7fbb785c94a4f58f594'
      },
      data: dataString,
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio'
    };

    axios(options).then(response => {
      console.log(response);
      const names = response.data.suggestions.map(i => ({ name: i.value }));

      this.setState({
        isLoading: false,
        names
      });
    })
      .catch(error => {
        console.log(error);
      });
  }

  getSurname = surname => {
    this.setState({ isLoading: true });
    const dataString = `{ "query": "${surname}" }`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token 951877a6c80c7c7e155ec7fbb785c94a4f58f594'
      },
      data: dataString,
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio'
    };

    axios(options).then(response => {
      console.log(response);
      const surnames = response.data.suggestions.map(i => ({ surname: i.value }));

      this.setState({
        isLoading: false,
        surnames
      });
    })
      .catch(error => {
        console.log(error);
      });
  }

  getPatronymic = patronymic => {
    this.setState({ isLoading: true });
    const dataString = `{ "query": "${patronymic}" }`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token 951877a6c80c7c7e155ec7fbb785c94a4f58f594'
      },
      data: dataString,
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio'
    };

    axios(options).then(response => {
      console.log(response);
      const patronymics = response.data.suggestions.map(i => ({ patronymic: i.value }));

      this.setState({
        isLoading: false,
        patronymics
      });
    })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // const data = `${surname} ${name} ${patronymic}`;

    const { surnames, names, patronymics } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Form>
            <Form.Label>Введите ФИО</Form.Label>
            <Form.Group>
              <AsyncTypeahead
                {...this.state}
                id="surname"
                labelKey="surname"
                minLength={2}
                onSearch={this.getItem}
                placeholder="Фамилия"
                options={surnames}
              />
            </Form.Group>
            <Form.Group>
              <AsyncTypeahead
                {...this.state}
                id="name"
                labelKey="name"
                minLength={2}
                onSearch={this.getItem}
                placeholder="Имя"
                options={names}
              />
            </Form.Group>
            <Form.Group>
              <AsyncTypeahead
                {...this.state}
                id="patronymic"
                labelKey="patronymic"
                minLength={2}
                onSearch={this.getItem}
                placeholder="Отчество"
                options={patronymics}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
            Поиск
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default App;
