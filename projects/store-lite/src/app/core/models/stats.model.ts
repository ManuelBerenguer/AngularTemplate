export class Stats {

  public maxAssets: number;
  public currentAssets: number;
  public maxStorage: number;
  public currentStorage: number;
  public totalNotLive: number;

  public unlinkedAssets: number;
  public unresolvedConflicts: number;
  public tooSmallImages: number;

  constructor(stats?: any) {
    if (stats) {
      this.maxAssets = stats.maxAssets;
      this.currentAssets = stats.currentAssets;
      this.maxStorage = stats.maxStorage;
      this.currentStorage = stats.currentStorage;
      this.totalNotLive = stats.totalNotLive;

      this.unlinkedAssets = stats.unlinkedAssets;
      this.unresolvedConflicts = stats.unresolvedConflicts;
      this.tooSmallImages = stats.tooSmallImages;
    }
  }
}
