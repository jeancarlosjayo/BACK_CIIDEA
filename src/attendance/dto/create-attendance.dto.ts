import { Graduate } from "src/graduate/schema/graduate.schema";
import { User } from "src/users/schema/users.schema";

export class CreateAttendanceDto {
    listStudents: User
    graduate: Graduate
    fechaAsistencia: string
    statusAttendance: string
}
