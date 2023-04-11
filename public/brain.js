var modelo = null;

      //Cargar modelo
      (async () => {
          console.log("Cargando modelo...");
          modelo = await tf.loadLayersModel("model.json");
          console.log("Modelo cargado...");
      })(); 