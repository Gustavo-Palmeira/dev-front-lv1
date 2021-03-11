import React from "react";

export default class UserAws extends React.Component {
  state = {
    loading: true,
    user: [],
    error: false,
  };

  async componentDidMount() {
    const urlMembros = "https://api.github.com/orgs/aws/members";
    const response = await fetch(urlMembros);
    const data = await response.json();
    if (response.status !== 403) {
      this.buscaMembroUnico(data);
    } else {
      this.setState({
        loading: false,
        user: [],
        error: true,
      });
    }
  }

  async buscaMembroUnico(data) {
    const membroArray = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let urlMembroUnico = "https://api.github.com/users/" + element.login;
      let responseMembroUnico = await fetch(urlMembroUnico);
      let dataMembroUnico = await responseMembroUnico.json();
      if (responseMembroUnico) {
        membroArray.push(dataMembroUnico);
      }
    }

    this.setState({
      loading: false,
      user: membroArray,
      error: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>Carregando...</h2>;
    } else if (this.state.error) {
      return <h2>Limite de taxa de API excedido</h2>;
    } else {
      const renderArray = [];
      this.state.user.forEach((element, index) => {
        if (!element.email) {
          element.email = "E-mail privado";
        }
        if (!element.bio) {
          element.bio = "Sem descrição";
        }
        if (!element.name) {
          element.name = "Nome privado";
        }
        renderArray.push(
          <div key={index} className="info-box">
            <div className="foto">
              <a href={element.url} target="_blanck">
                <img src={element.avatar_url} alt="Foto-usuário" />
              </a>
            </div>
            <div className="info-row-box">
              <div className="info-row">
                <div className="usuario font-geral">
                  <p>
                    <span className="info-sub">Usuário: </span>
                    {element.login}
                  </p>
                </div>
                <div className="nome font-geral">
                  <p>
                    <span className="info-sub">Nome: </span>
                    {element.name}
                  </p>
                </div>
              </div>
              <div className="info-row">
                <div className="email font-geral">
                  <p>
                    <span className="info-sub">E-mail: </span>
                    {element.email}
                  </p>
                </div>
              </div>
              <div className="info-row">
                <div className="bio font-geral">
                  <p>
                    <span className="info-sub">Descrição: </span>
                    {element.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return <ul>{renderArray}</ul>;
    }
  }
}
