using { studentDb } from '../db/schema';

service studentsrv {

    entity StudentInfo as projection on studentDb.StudentInfo;

}