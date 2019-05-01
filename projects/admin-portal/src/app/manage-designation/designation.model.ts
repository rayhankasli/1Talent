/**
 *  @author Rayhan Kasli
 *  @createdDate 22-03-2019
 *  @discription  Here Designation class ia model class which has some property and ManageDesignationModal class
 *                is handle all http error handle events
 */
/**
 *  Designation class is model class its contain designationId, designationTitle
 */
export class Designation {
    /** designationId define unique identification of designation */
    public designationId: number;
    /**  designationTitle define title of designation */
    public designationTitle: string;
}

/**
 * ManageDesignationModal enum is use to display error messages
 */
export enum ManageDesignationModal {
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
    /** NoContent indicates no content to send for this request, but the headers may be useful */
    NoContent = '204 No Content'
}

/**
 * ManageOverlayHeading handle heading of overlay modal for add and edit designation
 */
export enum ManageOverlayHeading {
    /** AddNewDesignation set heading when new designation is create   */
    AddNewDesignation = 'Add Designation',
    /** EditDesignation set heading when edit existing designation */
    EditDesignation = 'Edit Designation'
}
