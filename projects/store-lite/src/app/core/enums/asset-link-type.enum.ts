enum AssetLinkTypeEnum {
  PartNumber = 1,
  Application = 2
}

/**
 * @description Enum with the different files link options. In the string associated with each option we have the key to translate and get the text
 */
enum AssetLinkTypeTextEnum {
  PartNumber = 'storeLite.fileUpload.linkFilesOption1',
  Application = 'storeLite.fileUpload.linkFilesOption2'
}

export { AssetLinkTypeEnum };
export { AssetLinkTypeTextEnum };
