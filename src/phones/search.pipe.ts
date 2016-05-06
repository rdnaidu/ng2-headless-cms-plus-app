import {Pipe,PipeTransform} from '@angular/core';
import {Phone} from './phone';

@Pipe ({ 
    name: 'search' 
})
export class SearchPipe implements PipeTransform {
    transform(value,args: string[]) {
        //console.log(args[1]);
         if(value){
        //     console.log(args);
             if (args != null) 
                return value.filter((item) =>
                        item.name.startsWith(args))
         }
        return value;
    }   
}