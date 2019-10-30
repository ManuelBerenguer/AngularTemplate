export class NotificationsConstants {

  /**
   * @description Info messages
   */
  public static readonly filesUploadSuccessTitle = 'Your files have been uploaded succesfully.';
  // tslint:disable-next-line: max-line-length
  public static readonly filesUploadSuccessBody = 'The server is now processing your files. <br /> You can view your progress and next actions from the navigation bar at the top.';

  /**
   * @description Error messages
   */
  public static readonly filesUploadErrorTitle = 'Something unexpected happened.';
  public static readonly filesUploadErrorBody = 'Please try again.';

  public static readonly NumberOfFilesUploadedErrorTitle = 'Your file contains more than 5 assets.';
  // tslint:disable-next-line: max-line-length
  public static readonly NumberOfFilesUploadedErrorBody = 'Please adjust your file to only 5. <br /> Alternatively, to upgrade to Pro and unlimited uploads <br /> please contact your Account manager.';

  public static readonly FileTypesUploadErrorTitle = 'The file extension you have chosen is not supported.';
  public static readonly FileTypesUploadErrorBody = 'Please make sure your files are one of the following: ';
}
