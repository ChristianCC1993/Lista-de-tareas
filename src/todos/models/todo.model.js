import { v4 as uuid } from "uuid";      // <= Se importa uuid

export class Todo {                     // <= Se crea la clase Todo

    /**
     * 
     * @param {String} descripcion 
     */
    constructor( description ) {
        this.id = uuid();               // <= Es necesario installar uuid con el comando: npm i uuid
        this.description = description
        this.done = false;
        this.createdAt = new Date();
    }

}