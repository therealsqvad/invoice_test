import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
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
    multiple: false,
    bsSize: 'large',
    qc: true,
    show: false
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

    axios(options)
      .then(response => {
        const names = response.data.suggestions.map(i => ({ name: i.value }));

        this.setState({
          isLoading: false,
          names
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

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

    axios(options)
      .then(response => {
        const surnames = response.data.suggestions.map(i => ({ surname: i.value }));

        this.setState({
          isLoading: false,
          surnames
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

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

    axios(options)
      .then(response => {
        const patronymics = response.data.suggestions.map(i => ({ patronymic: i.value }));

        this.setState({
          isLoading: false,
          patronymics
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getFIO = () => {
    const { surname, name, patronymic } = this.state;
    const dataString = `{ "query": "${surname} ${name} ${patronymic}" }`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token 951877a6c80c7c7e155ec7fbb785c94a4f58f594'
      },
      data: dataString,
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
    };

    axios(options)
      .then(response => {
        console.log(response);
        if (response.data.suggestions.length > 0) {
          this.setState({
            qc: false
          });
        } else {
          this.setState({ show: true, qc: true });
        }
      })
      .catch(error => {
        this.setState({ show: true });
        console.log(error);
      });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => this.setState({ show: false });

  render() {
    const { surnames, names, patronymics } = this.state;
    const {
      selectSurname, selectName, selectPatronymic, qc
    } = this.state;
    const { show } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Form>
            <Form.Label>Введите ФИО</Form.Label>
            <Form.Row>
              <Col>
                <AsyncTypeahead
                  {...this.state}
                  id="surname"
                  labelKey="surname"
                  minLength={2}
                  onSearch={this.getSurname}
                  onChange={selected => {
                    this.setState({ selectSurname: selected });
                    if (selected.length > 0) {
                      this.setState({ surname: selected[0].surname });
                    }
                  }}
                  placeholder="Фамилия"
                  options={surnames}
                  selected={selectSurname}
                />
              </Col>
              <Col>
                <AsyncTypeahead
                  {...this.state}
                  id="name"
                  labelKey="name"
                  minLength={2}
                  onSearch={this.getName}
                  onChange={selected => {
                    this.setState({ selectName: selected });
                    if (selected.length > 0) {
                      this.setState({ name: selected[0].name });
                    }
                  }}
                  placeholder="Имя"
                  options={names}
                  selected={selectName}
                />
              </Col>
              <Col>
                <AsyncTypeahead
                  {...this.state}
                  id="patronymic"
                  labelKey="patronymic"
                  minLength={2}
                  onSearch={this.getPatronymic}
                  onChange={selected => {
                    this.setState({ selectPatronymic: selected });
                    if (selected.length > 0) {
                      this.setState({ patronymic: selected[0].patronymic });
                    }
                  }}
                  placeholder="Отчество"
                  options={patronymics}
                  selected={selectPatronymic}
                />
              </Col>
            </Form.Row>
            <Button variant="primary" type="button" onClick={this.getFIO}>
              Поиск
            </Button>
            <Form.Row>
              <Col />
              <Col>
                <Toast onClose={this.handleClose} show={show} delay={3000} autohide>
                  <Toast.Header>
                    <strong className="mr-auto">Ошибка</strong>
                  </Toast.Header>
                  <Toast.Body className="toast-body">
                    <p>По данному запросу ничего не найдено</p>
                  </Toast.Body>
                </Toast>
              </Col>
              <Col />
            </Form.Row>
          </Form>
          <Form hidden={qc}>
            <Form.Row>
              <Col>
                <Form.Control size="lg" placeholder="Название" />
              </Col>
              <Col>
                <Form.Control size="lg" placeholder="ИНН" />
              </Col>
              <Col>
                <Form.Control size="lg" placeholder="Адрес" />
              </Col>
            </Form.Row>
          </Form>
        </header>
      </div>
    );
  }
}

export default App;
