import { HttpErrors, Request, Response, RestBindings, post, requestBody, response } from "@loopback/rest";
import multer from 'multer';
import path from 'path';
import {keys as llaves} from '../config/keys';
import { inject } from "@loopback/core";



export class CargarArchivoController {
  constructor() { }

  /**
   * @param response
   * @param request
   */
  @post('/CargaImagenProducto', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'funcion de carga de la imagen de un producto'
      },
    },

  })
  async cargarImagenDelProducto(
    @inject(RestBindings.Http.RESPONSE) response:Response,
    @requestBody.file() request:Request,
  ):Promise<Object | false>{

    const rutaImagenProducto = path.join(__dirname,llaves.carpetaImagenProducto);
    let res = await this.StorefileToPath(rutaImagenProducto , llaves.nombreCampoImagenProducto , request , response , llaves.extencionesPermitidasIMG );
    if(res){
      const nombre_archivo = response.req?.file?.fieldname;
      if(nombre_archivo){
        return {filename: nombre_archivo}
      }
    }
    return res;    
  }
  

  /** 
   * @param path
   */

  private GetMulterStoregeConfig(path:string){
    var filename:string = '';
    const storage = multer.diskStorage({
      destination:function(req:any , file:any , cb:any){
        cb(null , path)
      },
      filename:function(req:any , file:any , cb:any){
        filename =  `${Date.now()}-${file.originalname}`
        cb(null , filename)
      }      
    });
    return storage;

  }


  /** function store file
   * @param storePath
   * @param request
   * @param response
   */

  private StorefileToPath(storePath:string, fieldname:string, request:Request , response:Response , acceptedExt:string[]):Promise<Object>{
    return new Promise<object>((resolve,reject)=>{
      const storege = this.GetMulterStoregeConfig(storePath);
      const upload = multer({
        storage:storege,
        fileFilter:  function (req:any , file:any , callback:any){
          var ext = path.extname(file.originalname).toUpperCase();
          if(acceptedExt.includes(ext)){
            return callback(null,true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido'))
        },
        limits:{
          fileSize: llaves.sizeMaxImagenProducto
        }
      }).single(fieldname);
      upload(request,response, (err:any)=>{
        if(err){
          reject(err);
        }
        resolve(response);
      })
    })
  }


}
