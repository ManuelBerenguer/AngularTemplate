export class User {

  // TODO: adapt/redo when Login is ready, add features, claims,...

  public userId: number;
  public email: string;
  public userName: string;

  public clientId: number;
  public clientName: string;

  public usesStoreLite: boolean;
  public maxAssetsPerUpload: number;
  public allowedAssetsFilesTypesList: string[];

  constructor(user?: any) {
    this.email = user ? user.email : '';
    this.userName = user ? user.userName : '';
    this.clientId = user ? user.clientId : 0;
    this.userId = user ? user.userId : 0;
    this.clientName = user ? user.clientName : '';

    this.usesStoreLite = user && typeof user.usesStoreLite === 'boolean' ? user.usesStoreLite : false;
    this.maxAssetsPerUpload = user && Number.isInteger(user.maxAssetsPerUpload) ? user.maxAssetsPerUpload : 0;
    this.allowedAssetsFilesTypesList = user ? user.allowedAssetsFilesTypesList : [];
  }
}
