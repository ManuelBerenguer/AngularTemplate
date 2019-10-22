export class NotificationsConstants {

  /**
   * @description Info messages
   */
  public static readonly filesUploadSuccessTitle = 'Your files have been uploaded succesfully.';
  public static readonly filesUploadSuccessBody = 'The server is now processing your files. <br /> You can view your progress and next actions from the navigation bar at the top.';

  /**
   * @description Error messages
   */
  public static readonly filesUploadErrorTitle = 'There was an error trying to upload your files.';
  public static readonly filesUploadErrorBody = 'Please, retry in a few seconds.';

  public static readonly NumberOfFilesUploadedErrorTitle = 'Your file contains more than 5 assets.';
  public static readonly NumberOfFilesUploadedErrorBody = 'Please adjust your file to only 5. <br /> Alternatively, to upgrade to Pro and unlimited uploads <br /> please contact your Account manager.';

  public static readonly FileTypesUploadErrorTitle = 'Your file contains extensions not allowed.';
  public static readonly FileTypesUploadErrorBody = 'Please adjust your file to contain only: ';
}
