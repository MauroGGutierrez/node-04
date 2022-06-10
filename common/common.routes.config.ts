import express from 'express'
export class CommonRoutesConfig { //la clase es un molde para crear un objeto que tienen propiedades o metodos
  app: express.Application;
  name:string;

  constructor(app: express.Application, name: string) { 
    this.app = app;
    this.name = name;
  }
  getName() {
    return this.name
  }
}