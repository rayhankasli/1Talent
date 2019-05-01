/**
 * Class representing country id and name
 * @author: Gaurang Valia
 * @class: Country
 * @created date: 03/04/2019
 */
export class Country {
    /** Country id of the country */
    public countryId: number;
    /** Country name of the country */
    public countryName: string;
}
/**
 * Designation class is model class its contain designationId, designationTitle
 * @author: Gaurang Valia
 * @class: Designation
 * @created date: 03/04/2019
 */
export class Designation {
    /** designationId define unique identification of designation */
    public designationId: number;
    /**  designationTitle define title of designation */
    public designationTitle: string;
}
/**
 * This domain model use for store attributes
 * @author: Gaurang Valia
 * @class: Domain
 * @created date: 03/04/2019
 */
export class Domain {
    /** domainId is unique for every record which is auto increment. */
    public domainId: number;
    /** domainNAme is for name of domain */
    public domainName: string;
    /**  description is for description of domain */
    public description: string;
}
/**
 * Class representing technology id and name
 * @author: Gaurang Valia
 * @class: Technology
 * @created date: 03/04/2019
 */
export class Technology {
    /** Technology id of the technology */
    public technologyId: number;
    /** Technology name of the technology */
    public technologyName: string;
}
/**
 * OpenPosition Get the Filter
 * @author : Gaurang Valia
 * @class : OpenPositions
 * @description : This service use for Managa OpenPosition Get the Filter Opration
 * Created Date : 09-04-2019
 */
export class OpenPositions {
    /** Country id of open positions */
    public countryId : number;
    /** Domain id of open positions */
    public domainId: number;
    /** Designation id of open positions */
    public designationId: number;
    /** Technology id of open positions */
    public technologyId: number;
}
/**
 *  Vacancy proprties and properties type details and use to enum of error
 * @author : Gaurang Valia
 * @class : Vacancy,VacancyModel
 * @Created Date : 25-03-2019
 */
export class Vacancy {
    /** The unique identification of the vacancy */
    public jobId: number;
    /**  The domainId of the vacancy */
    public domainId: number;
    /**  The designationId of the vacancy */
    public designationId: number;
    /**  The countryId of the vacancy */
    public countryId: number;
    /** The jobName of the vacancy */
    public jobName: string;
    /** Defines the number of vacancy */
    public vacancies: number;
    /** Defines the number of experience needed */
    public experience: string;
    /** The domainName of the vacancy */
    public domainName: string;
    /** The designationTitle of the vacancy */
    public designationTitle: string;
    /** The countryName of the vacancy */
    public countryName: string;
    /** The jobDescription of the vacancy */
    public jobDescription: string;
    /** The responsibilities of the vacancy */
    public responsibilities: string;
    /** The technologyId of the vacancy */
    public technologyId: number;
    /** The technologyName of the vacancy */
    public technologyName: string;
    /** The salary of the vacancy */
    public salary: string;
    /** The jobStatusId of the vacancy */
    public jobStatusId: number;
    /** The jobStatus of the vacancy */
    public jobStatus: string;
}
/** Check the validation of Vacancy get */
export enum VacancyErrorListMessage {
    /**  InvalidValue is use for display message when user pass blank form */
    InvalidValue = 'Not Found API',
    /**  ErrorMessage define heading of toster message when error is occur */
    ErrorMessage = 'Error',
    /**  he server encountered an internal error */
    InternalError = 'Internal Server Error',
}