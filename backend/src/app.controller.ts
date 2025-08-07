import { Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/cars")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  crearCarro(): String {
    return "Aqui se registran los carros";
  }

  @Patch(":id")
  actualizarCarro(@Param("id")id:string): string{
    return `Se Actualizo el carro ${id}`;
  }

  @Delete(":id")
  eliminarCarro(@Param("id") id:string): string{
    return `Se elimino el carro:${id} `;
  }
}
