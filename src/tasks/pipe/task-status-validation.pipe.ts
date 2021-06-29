import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value:any){
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value;
    }

    private isStatusValid(status){
        let idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}