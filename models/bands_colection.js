const categoria = require("./band.js");

class Categorias{

    constructor(){

        this.categorias = [];

    }
    //agregar una categoria
    addCategoria(categoria = new Categoria()){

        this.categorias.push( categoria );

    }
    //Obtener datos de una categoría
    getCategorias(){

        return this.categorias;

    }
    //Borrar una categoria
    deleteCategoria(id = ""){

        this.categorias = this.categorias.filter(categoria => categoria.id !== id);
        return this.categorias;

    }
    //Incrementar cantidad de categoria
    voteCategoria (id){

        this.categorias = this.categorias.map(categoria=>{

            if (categoria.id === id){

                categoria.votos++;
                return categoria;
                
            }
            else{

                return categoria;

            }

        });

    }

}

module.exports = Categorias;