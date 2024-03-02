// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import fs from 'fs';
import path from 'path';
import{promisify} from 'util';
import {keys as llaves} from '../config/keys';
import { HttpErrors, Response, RestBindings, get, oas, param } from '@loopback/rest';
import { inject } from '@loopback/core';

const readdir = promisify(fs.readdir);

export class DescargarArchivosController {
  constructor() {}

  /**
   * @param id
   * @param type
   */
  @get('/archivo/{type}',{
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items:{
                type:'string'
              }
            },
          },
        },
        description: 'list of tips'
      },
    },
  })
  async ListarArchivos(
    @param.path.number('type')type:number,
  ){
    const ruta_carpeta = this.ObtenerRutaCarpetaXtipo(type);
    const archivos = await readdir(ruta_carpeta);
    return archivos;
  }


  /**
   * Obtener carpeta donde esta el archivo a descargar segun tipo
   * @param type
   */
  private ObtenerRutaCarpetaXtipo(type:number){
    let ruta = "";

    switch(type){
      case 1:
        ruta = path.join(__dirname, llaves.carpetaImagenProducto);
      break
      case 2:
        ruta = path.join(__dirname, llaves.carpetaDocumentoPersonas);      
    }

    return ruta;
  }


  /**
   * obtener archivo especifico
   * @param type
   * @param recordId
   * @param response
   */
  @get('archivo/{type}/{filename}')
    @oas.response.file()
    async descargarArchivo(
      @param.path.number('type') type:number,
      @param.path.string('filename') filename :string,
      @inject(RestBindings.Http.RESPONSE)response:Response,
    ){
      const ruta_carpeta = this.ObtenerRutaCarpetaXtipo(type);
      const archivo = this.ValidarNombreArchivo(ruta_carpeta,filename);
      response.download(archivo,ruta_carpeta);
      return response;
    }
    
  


  /**
   * Validar
   * @param filename -Filename   * 
   */
  private ValidarNombreArchivo(folder:string,filename:string){
    const resolved = path.resolve(folder,filename);
    if(resolved.startsWith(folder)) return resolved;

    throw new HttpErrors[400](`la ruta del archivo es invalida : ${filename}`);

  }
}
