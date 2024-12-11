import { Body, Controller, Get, Inject, Post, Put, Delete, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateLetterDto } from './dto/create-letter-dto';
import { Places } from './emums/place-enum';

@Controller('api/letters')
export class MailController {
    constructor(private readonly mailService: MailService){
        
    }

    @Get('inbox')
    async getInboxLetters(): Promise<string> {
        return await this.mailService.getInboxLetters();
    }

    @Get('draft')
    async getDraftLetters(): Promise<string> {
        return await this.mailService.getDraftLetters();
    }

    @Get('sended')
    async getSendedLetters(): Promise<string> {
        return await this.mailService.getSendedLetters();
    }

    @Post()
    async createLetter(@Body() createLetterDto: CreateLetterDto) : Promise<string>{
        return await this.mailService.createLetter(createLetterDto);
    }

    @Put('/:letterId')
    async updateLetter(@Param('letterId') letterId : number, @Body() createLetterDTO: CreateLetterDto) : Promise<string>{
        return await this.mailService.updateLetter(letterId,createLetterDTO);
    }

    @Delete('/:letterId')
    async deleteLetter(@Param('letterId') letterId : number) : Promise<string>{
        return await this.mailService.deleteLetter(letterId)
    }

    @Put('/moveToPlace/:letterId/:place')
    async moveToPlace(@Param('letterId') letterId : number, @Param('place') place: Places) : Promise<string>{
        return await this.mailService.moveLetterToPlace(letterId,place);
    }

    @Post('/addRandomMail')
    async addRandomMail(): Promise<string>{
        return await this.mailService.addRandomMail();
    }
}

