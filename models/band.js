const { v4: uuidV4} = require('uuid');

//uuid sirve para crear identificadores únicos que se asignaran a cada categoria

class Categoria{

    constructor (name = "no-name"){

        this.id = uuidV4();
        this.name = name;
        this.votos = 1;        

    }

}

module.exports = Categoria;