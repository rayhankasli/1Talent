 /**
  * Vacancy proprties and properties type details and use to enum of error
  * @author : Gaurang Valia
  * @class : VacancyDetails
  * Created Date : 08-04-2019
  */
export class VacancyDetails {
    /** The unique identification of the vacancy details */
    public jobId: number;
    /**  The domainId of the vacancy details */
    public domainId: number;
    /**  The designationId of the vacancy details */
    public designationId: number;
    /**  The countryId of the vacancy details */
    public countryId: number;
    /** The jobName of the vacancy details */
    public jobName: string;
    /** Defines the number of vacancy details */
    public vacancies: number;
    /** Defines the number of experience needed the vacancy details */
    public experience: string;
    /** The domainName of the vacancy details */
    public domainName: string;
    /** The designationTitle of the vacancy details */
    public designationTitle: string;
    /** The countryName of the vacancy details */
    public countryName: string;
    /** The jobDescription of the vacancy details */
    public jobDescription: string;
    /** The responsibilities of the vacancy details */
    public responsibilities: string;
    /** The technologyId of the vacancy details */
    public technologyId: number;
    /** The technologyName of the vacancy details */
    public technologyName: string;
    /** The salary of the vacancy details */
    public salary: string;
    /** The jobStatusId of the vacancy detailsy */
    public jobStatusId: number;
    /** The jobStatus of the vacancy details */
    public jobStatus: string;
    /** Skill of vacancy details */
    public skill: string;
}
/**  check the validation of Vacancy get */
export enum VacancyDetailsErrorListMessage {
    /**  InvalidValue is use for display message when user pass blank form */
    InvalidValue = 'Not Found API',
    /**  ErrorMessage define heading of toster message when error is occur */
    ErrorMessage = 'Error',
    /**  The server encountered an internal error */
    InternalError = 'Internal Server Error',
    /** The server Not content Found */
    ContentError = 'No Content Found',
}