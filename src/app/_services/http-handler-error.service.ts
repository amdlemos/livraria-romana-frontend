import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class HttpHandlerError {

    constructor(
      private toastr: ToastrService){ }

    handlerError(errorResponse: HttpErrorResponse) {
        switch(errorResponse.status){
          case 401:
            alert("Você precisa estar logado para realizar essa operação.");
            console.log("401");
            break;
          case 403:
            alert("Você não possui permissão para realizar essa operação.");
            console.log("403");
            break;
          case 404:
            alert("Página não encontrada.");
            console.log("404")
            break;
          default:
             // verifica se há erros do servidor que possam ser exibidos         
             if (errorResponse.error.hasNotifications) {                            
              errorResponse.error.notifications.forEach(element => {
                this.toastr.error(element.message)
              });              
            }else{
              this.toastr.error("Por favor, tente em alguns instantes.")
              console.log("Erro inesperado, provavelmente o servidor esteja fora do ar.");
            }           
        }
      }
}