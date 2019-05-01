/**
 * @author - Naim Shaikh
 * @createdDate 22-03-2019
 * @description - This model file are represent of Domain Model.
 */
/**
 * This domain model use for store attributes
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
 * ManageDomainModal - This enum are represent of error message
 */
export enum ManageDomainModal {
    /** InvalidValue is use for display message when user pass blank form */
    InvalidValue = 'Please fill in mandatory fields!',
    /** ErrorMessage define heading of toster message when error is occur */
    ErrorMessage = 'Error',
    /** NotFound indicate server can not find requested resource */
    NotFound = '404 Page Not Found',
    /** InternalServerError indicates the server has encountered a situation it doesn't know how to handle.  */
    InternalServerError = '500 Internal Server Error',
    /** MethodNotAllowed indicates the request method has been disabled and cannot be used  */
    MethodNotAllowed = '405 Method Not Allowed',
    /** NoContent indicates no content to send for this request, but the headers may be useful */
    NoContent = '204 No Content'
}

/**
 * ManageOverlayHeading handle heading of overlay modal for add and edit domain
 */
export enum ManageOverlayHeading {
    /** AddNewDomain set heading when new domain is create   */
    AddNewDomain = 'Add Domain',
    /** EditDomain set heading when edit existing domain */
    EditDomain = 'Edit Domain'
}
