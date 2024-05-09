using { managed, cuid } from '@sap/cds/common';

namespace studentDb;

entity StudentInfo: managed, cuid {
    firstName : String;
    lastName : String;
    address: String;
    department : String;
}

