import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import qs from 'querystring';

import api from '../Api';
import history from '../History';

import "./Candidates.css";

import UserTable from '../Components/table/UserTable';
import AddUserForm from '../Components/forms/AddUserForm';
import EditUserForm from '../Components/forms/EditUserForm';

class Candidates extends Component {

  constructor(props) {
      super(props);

      this.state = {
          users: [],
          currentUser: { id: null, name: '', email: '', age: 0, linkdin_url: '',  id_tec: '' },
        //   currentUser: { id: null, name: '', email: '', age: 0, linkdin_url: '' },
          editing: false,
          login: false
      }
  }

   handleLogout() {
    
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }

  componentDidMount() {
      this.refreshUserTable();
  }

  refreshUserTable() {
      this.usersData = api.get('/candidates')
          .then(response => response.data)
          .then(data => {

              this.setState({ 
                  users: data.data,
                  setUsers: data.data
              });
          });
  }

  refreshUserTableSeacrh(searchTec) {
      this.usersDataSearch = api.get(`/search?id_tec=${searchTec}`)
          .then(response => response.data)
          .then(data => {
              this.setState({ 
                  users: data.data.data,
                  setUsers: data.data.data
              });
          });

  }

  search = searchTec => {

        if (searchTec === "0")
        {
            this.refreshUserTable();
        }
        else{
            this.refreshUserTableSeacrh(searchTec);
        }
    };

  addUser = user => {

      api.post('/candidates', 
      {
        name: user.name,
        email: user.email,
        age: user.age, 
        linkdin_url: user.linkdin_url, 
        id_tec : user.id_tec
    })
          .then(res => {
              
            if(res.status === 200)
            {
                alert('Candidato Adicionado')
            }
            else{
                alert('Candidato NãO Adicionado')
   
            }
              this.refreshUserTable();
          });
  };

  deleteUser = id => {

      api.delete(`/candidates/${id}`)
          .then(res => {

            if(res.status === 200)
            {
                alert('Candidato Deletado')
            }
            else{
                alert('Candidato NãO Deletado')
   
            }
              this.refreshUserTable();
          });
  };

  updateUser = (id, user) => {
      
      api.put(`/candidates/${id}`, {
        name: user.name,
        email: user.email,
        age: user.age, 
        linkdin_url: user.linkdin_url, 
        id_tec : user.id_tec
    })
          .then(res => {

            if(res.status === 200)
            {
                alert('Candidato Atualizado')
            }
            else{
                alert('Candidato NãO Atualizado')
   
            }
              this.refreshUserTable();
          });
      
      this.setState({ 
          currentUser: { id: null, name: '', email: '', age: 0, linkdin_url: '', id_tec: {} }
        //   currentUser: { id: null, name: '', email: '', age: 0, linkdin_url: '' }
      });

      this.setEditing(false);
  };

  editRow = user => {

      this.setState({ 
        //   currentUser: { id: user.id, name: user.name, email: user.email, age: user.age, linkdin_url: user.linkdin_url}
          currentUser: { id: user.id, name: user.name, email: user.email, age: user.age, linkdin_url: user.linkdin_url,  id_tec: ''}
      });

      this.setEditing(true);
  };

  setEditing = isEditing => {

      this.setState({ editing: isEditing });
  };

  render () {
      const { users } = this.state;

      return (
          <div className="content">
                  
                <div className="Form">
  
                  {
                      this.state.editing ? (
                          <div className="Form_User_header">
                              <div className="User_header">
                                <h4> Editar Candidatos</h4>
                              </div>
                            <div className="User">
                                
                                <EditUserForm 
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}
                                    currentUser={this.state.currentUser}
                                    updateUser={this.updateUser} 
                                />
                            </div>
                            <div className="Form_User_footer">
                                <button onClick={this.handleLogout} className="Form_User_footer_content" >
                                        Sair
                                </button>
                            </div>
                          </div>

                      ) : (<div className="Form_User_header"> 
                              <div className="User_header">
                                <h4>Adicionar Candidatos</h4>
                              </div>
                                <div className="User">
                                    <AddUserForm addUser={this.addUser} />
                                </div>
                                <div className="Form_User_footer">
                                    <button onClick={this.handleLogout} className="Form_User_footer_content" >
                                            Sair
                                    </button>
                                </div>
                          </div>
                      )
                  }
                  
              </div>

              <div className="TableCandidates">
                    <div className="User_header">
                        <h4>Candidatos</h4>
                    </div>
                    <div className="search">
                        <Form inline>
                            <Form.Label className="form_label" htmlFor="search">
                                Pesquisa : 
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="search"
                                custom
                                onChange={ e => this.search(e.target.value)}
                            >
                                <option value="0">Todos...</option>
                                <option value="1">C#</option>
                                <option value="2">Javascript</option>
                                <option value="3">NodeJs</option>
                                <option value="4">Angular</option>
                                <option value="5">Reaact</option>
                                <option value="6">Ionic</option>
                                <option value="7">Mensageria</option>
                                <option value="8">PHP</option>
                                <option value="9">Laravel</option>
                            </Form.Control>
                        </Form>

                       
                    </div>
                    <div className="Table">
                      <UserTable users={users} editRow={this.editRow} deleteUser={this.deleteUser} />
                    </div>
                </div>
          
          </div>
      );
  };
};

export default Candidates;