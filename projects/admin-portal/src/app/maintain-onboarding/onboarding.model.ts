/**
 * @author - Naim Shaikh
 * @createdDate 05-04-2019
 * @description - This model file are represent of onboarding Model.
 */
/**
 * This onboarding model use for store attributes
 */
export class Onboarding {

    /** onboardingActivityId is unique for every record which is auto increment. */
    public onboardingActivityId: number;
    /** activityName is for name of onboarding */
    public activityName: string;
    /**  description is for description of onboarding */
    public description: string;
    /** domainId is unique for every record which is auto increment. */
    public domainId: number;
    /** domainName is for name of domain */
    public domainName: string;
    /** ownerId is unique for every record which is auto increment. */
    public ownerId: string;
    /** ownerName is for name of owner */
    public ownerName: string;
}

/**
 * MaintainOnboardingModal - This enum are represent of error message
 */
export enum MaintainOnboardingModal {
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
 * ManageOverlayHeading handle heading of overlay modal for add and edit onboarding
 */
export enum ManageOverlayHeading {
    /** AddNewActivity set heading when new activity is create   */
    AddNewActivity = 'Add Activity',
    /** EditActivity set heading when edit existing activity */
    EditActivity = 'Edit Activity'
}
