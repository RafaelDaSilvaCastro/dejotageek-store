package com.dejota.model;

public class Usuario extends EntityId {

    private String login;
    private String senha;

    public Usuario() {
    }

    public Usuario(Long id, String login, String senha) {
        super(id);
        this.login = login;
        this.senha = senha;
    }

    public Usuario(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
