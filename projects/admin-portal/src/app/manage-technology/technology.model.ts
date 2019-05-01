/**
 * @author Rayhan Kasli
 * @createdDate 05-04-2019
 * @description Technology, Skill,ManageTechnologyModal and  ManageOverlayHeading
 *              classes are model class which contain some property of the technology module
 */
/** Technology class is used for contain technology data */
export class Technology {
    /** technologyId contain unique id of technology */
    public technologyId: number;
    /** domainId contain unique id of technology */
    public domainId: number;
    /** technologyName contain technology name */
    public technologyName: string;
    /** description contain description of technology */
    public description: string;
    /** skills contain the multiple data like skill id, technnology id and skill  */
    public skills: Skill[];
    /** domainName contain name of domain which is use for display data in dropdown list */
    public domainName?: string;
}

/** Skill class used for contain diffrent skills */
export class Skill {
    /** skillId contain unique id of skill */
    public skillId?: number;
    /** technologyId contain reference id of technology */
    public technologyId?: number;
    /** skill contain the diffrent type of skill */
    public skill: string;

}

/**
 * ManageTechnologyModal enum is use to display error messages
 */
export enum ManageTechnologyModal {
    /** InvalidValue is use for display message when user pass blank form */
    InvalidValue = 'Please fill in mandatory fields!',
    /** ErrorMessage define heading of toster message when error is occur */
    ErrorMessage = 'Error',
    /** NotFound indicate server can not find requested resource */
    NotFound = 'Page Not Found',
    /** InternalServerError indicates the server has encountered a situation it doesn't know how to handle.  */
    InternalServerError = '500 Internal Server Error',
    /** MethodNotAllowed indicates the request method has been disabled and cannot be used  */
    MethodNotAllowed = '405 Method Not Allowed',
    /** BadRequest indicate 400 Bad Request */
    BadRequest = '400 Bad Request',
    /** NoContent indicates no content to send for this request, but the headers may be useful */
    NoContent = '204 No Content',
    /** ChipsErrorMessages indecate chips length error message */
    ChipsErrorMessages = 'Allow only 20 charecter per skill'

}

/**
 * ManageOverlayHeading handle heading of overlay modal for add and edit technology
 */
export enum ManageOverlayHeading {
    /** AddNewTechnology set heading when new technology is create   */
    AddNewTechnology = 'Add Technology',
    /** EditTechnology set heading when edit existing technology */
    EditTechnology = 'Edit Technology'
}

/**
 * ManageDomainName contain name of domain for disable values
 */
export enum ManageDomainName {
    /** HR set Domain name as hr for disable technology textbox */ 
    HR = 'hr',
    /** HumanResource set Domain name as HumanResource for disable technology textbox */
    HumanResource = 'human resource'
}

