import { Injectable } from '@angular/core';
import { data } from 'cypress/types/jquery';

@Injectable({
    providedIn: 'root'
})
export class TypeHelperService {

    constructor() { }

    GetIconByDataType(dataType: string | undefined): string {
        if(dataType == "Строка"){
            return "match_case"
        }
        else if(dataType == "Число"){
            return "123"
        }
        else if(dataType == "Значение с плавающей точкой"){
            return "123"
        }
        else if(dataType == "Дата/время"){
            return "calendar_month"
        }
        else if(dataType == "Файл"){
            return "draft"
        }
        else if(dataType == "Логическое значение"){
            return "check"
        }
        else if(dataType == "UUID"){
            return "fingerprint"
        }
        return 'people'
    }

}
