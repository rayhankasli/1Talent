/**
 * Leave Class representing leave fields
 * @author: Mayur Patel
 * @created date: 06/04/2019
 */
export class Leave {
    /** employee id of the leave */
    public employeeId: string;
    /** first name of the leave */
    public firstName: string;
    /** last name of the leave */
    public lastName: string;
    /** leave id of the leave */
    public leaveId: number;
    /** from-date of the leave */
    public fromDate: string;
    /** to-date of the leave */
    public toDate: string;
    /** leave status id of the leave */
    public leaveStatusId: number;
    /** status of the leave */
    public status: string;
    /** leave type id of the leave */
    public leaveTypeId: number;
    /** type of leave */
    public type: string;
    /** created date of the leave */
    public createdDate: string;
    /** reason for the leave */
    public reason: string;
    /** count total number of days */
    public countDays: number;
}
/**
 * Leave status enum representing status
 * @author: Mayur Patel
 * @created date: 06/04/2019
 */
export class LeaveStatus {
    /** leave status id */
    public leaveStatusId: number;
    /** leave status */
    public status: string;
}